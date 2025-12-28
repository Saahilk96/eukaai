import mongoose from "mongoose";
import * as quickGuideService from "./quickGuide.service.js";
import fs from "fs";
import { PDFParse } from "pdf-parse";
import { responseLLMGenerator } from "../../utils/quickGuide/responseGenerator.js";
import * as prompt from "../../utils/quickGuide/prompts.js";
import quickGuide from "./quickGuide.model.js";
import User from "../user/user.model.js";
import quickGuideKeyFact from "../quickGuideKeyFact/quickGuideKeyFact.model.js";
import quickGuideProductFocus from "../quickGuideProductFocus/quickGuideProductFocus.model.js";
import quickGuideInterviewQuestionsByRound from "../quickGuideInterviewQuestionsByRound/quickGuideInterviewQuestionsByRound.model.js";

const extractText = async (filePath) => {
  const parser = new PDFParse({ url: filePath });
  const data = await parser.getText();
  await parser.destroy();
  return data.text;
};

export const createQuickGuide = async (req, res, next) => {
  const uploadedFilePath = req.file?.path;
  try {
    const { jobDescription, jobRole, companyName, companyWebsite } = req.body;
    let userResume = req.user.resume;
    if (req.file) {
      if (!["application/pdf"].includes(req.file.mimetype)) {
        return res
          .status(400)
          .json({ status: false, message: "Only PDF resumes are allowed" });
      }

      if (req.file.size > 5 * 1024 * 1024) {
        // 2MB max
        return res
          .status(400)
          .json({ status: false, message: "Resume size must be under 5MB" });
      }

      userResume = await extractText(req.file.path);
    }

    if (req.user.totalGeneratedFullGuides >= 1 && !req.user.paymentDone) {
      return res.status(403).json({
        status: false,
        message:
          "Free trial limit reached. Please make a payment to continue creating full guides.",
      });
    }

    if (!userResume)
      return res
        .status(400)
        .json({ status: false, message: "Resume required" });

    const session = await mongoose.startSession();

    try {
      const quickGuideId = new mongoose.Types.ObjectId();
      let newQuickGuide = {
        userId: req.user._id,
        _id: quickGuideId,
        companyName: req.body.companyName,
        jobRole: req.body.jobRole,
      };

      let promptInputData = {
        companyName,
        jobRole,
        jobDescription,
        userResume,
      };

      if (companyWebsite !== undefined) {
        promptInputData.companyWebsite = companyWebsite;
      }

      const responseData = await responseLLMGenerator(
        prompt.quickGuide(promptInputData)
      );

      await session.withTransaction(async () => {
        const createdDocs = await quickGuide.create([newQuickGuide], {
          session,
        });
        newQuickGuide = createdDocs[0];

        if (req.file) {
          await User.updateOne(
            { _id: req.user._id },
            {
              $set: { resume: userResume },
              $inc: { totalGeneratedFullGuides: 1 },
            },
            { session }
          );
        } else {
          // Increment totalFullGuides count
          await User.updateOne(
            { _id: req.user._id },
            {
              $inc: { totalGeneratedFullGuides: 1 },
            },
            { session }
          );
        }

        await quickGuideKeyFact.insertOne(
          {
            userId: req.user._id,
            quickGuideId,
            keyFactsHtml: responseData.keyFactsHtml,
          },
          { session }
        );

        await quickGuideProductFocus.insertOne(
          {
            userId: req.user._id,
            quickGuideId,
            productFocusHtml: responseData.productFocusHtml,
          },
          { session }
        );

        await quickGuideInterviewQuestionsByRound.insertOne(
          {
            userId: req.user._id,
            quickGuideId,
            interviewQuestionsByRoundHtml:
              responseData.interviewQuestionsByRoundHtml,
          },
          { session }
        );
      });

      session.endSession();

      res.status(201).json({
        success: true,
        message: "quick Guide Created Successfully",
        newQuickGuide,
      });
    } catch (err) {
      session.endSession();
      next(err);
    }
  } catch (err) {
    next(err);
  } finally {
    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      fs.unlinkSync(uploadedFilePath);
    }
  }
};

export const deleteQuickGuide = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const {quickGuideId} = req.params;

      // 1️⃣ Delete main fullGuide first
      const quickGuideDelete = await quickGuideService.deleteQuickGuide(
        { userId: req.user._id, _id: quickGuideId },
        { session }
      );

      if (!quickGuideDelete.deletedCount) {
        throw new Error("NOT_FOUND");
      }

      // 2️⃣ Prepare delete tasks (parallel)
      const deleteTasks = [
        quickGuideKeyFact.deleteMany({ quickGuideId }, { session }),
        quickGuideProductFocus.deleteMany({ quickGuideId }, { session }),
        quickGuideInterviewQuestionsByRound.deleteMany({ quickGuideId }, { session }),
      ];

      // 3️⃣ Run all deletions at same time (max speed)
      await Promise.all(deleteTasks);
    });

    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Quick Guide deleted successfully",
    });
  } catch (err) {
    session.endSession();

    if (err.message === "NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Quick Guide not found",
      });
    }

    next(err);
  }
};

export const getQuickGuide = async (req, res, next) => {
  try {

    // Fetch paginated guides
    const quickGuide = await quickGuideService.getQuickGuide(
      { userId: req.user._id,_id:req.params.quickGuideId }
    );

     if (!quickGuide)
      return res.status(401).json({
        success: false,
        message: "quick guide not found",
      });

    res.status(200).json({
      success: true,
      message: "Guide fetched successfully",
     quickGuide
    });
  } catch (err) {
    next(err);
  }
};

export const getQuickGuides = async (req, res, next) => {
  try {
    const quickGuides = await quickGuideService.getQuickGuides(
      {
        userId: req.user._id,
      },
      req.query.offset,
      req.query.limit
    );

    // Fetch total count of guides (without pagination)
    const totalQuickGuides = await quickGuideService.countQuickGuides({
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Quick Guides Fetched successfully",
      totalQuickGuides,
      quickGuides,
    });
  } catch (err) {
    next(err);
  }
};
