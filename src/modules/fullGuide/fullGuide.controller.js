import * as fullGuideService from "./fullGuide.service.js";
import User from "../user/user.model.js";
import module from "../module/module.model.js";
import subModule from "../subModule/subModule.model.js";
import moduleNote from "../moduleNote/moduleNote.model.js";
import moduleQuestion from "../moduleQuestion/moduleQuestion.model.js";
import moduleQuestionContent from "../moduleQuestionContent/moduleQuestionContent.model.js";
import moduleSummary from "../moduleSummary/moduleSummary.model.js";
import moduleSources from "../moduleSources/moduleSources.model.js";
import subModuleContent from "../subModuleContent/subModuleContent.model.js";

import {
  behavioralAndLeadershipResponse,
  analyticalEstimationResponse,
  productStrategyResponse,
  technicalResponse,
  productSenseResponse,
} from "../../utils/fullGuide/responseAnswer.js";
import {
  knowTheCompany,
  productResearch,
  recruiterScreenPreperation,
  jobDescriptionAnalysis,
  resumeExperienceToStandOut,
  favouriteProductQuestion,
  productDesign,
} from "../../utils/fullGuide/prompts.js";
import { staticQuestions } from "../../utils/fullGuide/staticQuestions.js";

import mongoose from "mongoose";
import fs from "fs";
import { PDFParse } from "pdf-parse";
import {
  responseLLMGenerator,
  responseLLMGeneratorWithSources,
  responseSummaryLLMGenerator,
} from "../../utils/fullGuide/responseGenerator.js";
import {
  knowTheCompanySummaryPrompt,
  productResearchSummaryPrompt,
  recruiterScreenPreperationSummaryPrompt,
} from "../../utils/fullGuide/summaryPrompts.js";
import fullGuide from "./fullGuide.model.js";

const extractText = async (filePath) => {
  const parser = new PDFParse({ url: filePath });
  const data = await parser.getText();
  await parser.destroy();
  return data.text;
};

export const createFullGuide = async (req, res, next) => {
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
      const fullGuideId = new mongoose.Types.ObjectId();
      let newFullGuideData = {
        userId: req.user._id,
        _id: fullGuideId,
        companyName: req.body.companyName,
        jobRole: req.body.jobRole,
      };

      const modules = [];
      const moduleNotes = [];
      const sources = [];
      const moduleQuestions = [];
      const moduleSummaries = [];
      const moduleQuestionContents = [];
      const subModules = [];
      const subModuleContents = [];

      let fullGuideModuleResponses = [
        behavioralAndLeadershipResponse,
        analyticalEstimationResponse,
        productStrategyResponse,
        technicalResponse,
        productSenseResponse,
      ];

      fullGuideModuleResponses.forEach((moduleResponse) => {
        const moduleId = new mongoose.Types.ObjectId();
        modules.push({
          _id: moduleId,
          userId: req.user._id,
          fullGuideId,
          title: moduleResponse.name,
          summaryText: moduleResponse.quickSummary,
        });

        moduleNotes.push({
          userId: req.user._id,
          fullGuideId,
          moduleId,
        });

        moduleResponse.subModules.forEach((subModuleResponse) => {
          const subModuleId = new mongoose.Types.ObjectId();
          subModules.push({
            _id: subModuleId,
            userId: req.user._id,
            moduleId,
            fullGuideId,
            title: subModuleResponse.title,
            summaryText: subModuleResponse.summary,
          });

          subModuleContents.push({
            userId: req.user._id,
            subModuleId,
            fullGuideId,
            htmlText: subModuleResponse.htmlContent,
          });
        });
      });

      let promptInputData = {
        companyName,
        jobRole,
        jobDescription,
        userResume,
      };

      if (companyWebsite !== undefined) {
        promptInputData.companyWebsite = companyWebsite;
      }

      let [
        jobDescriptionAnalysisResponse,
        resumeExperienceToStandOutResponse,
        favouriteProductQuestionResponse,
        productDesignResponse,
        knowTheCompanyResponse,
        productResearchResponse,
        recruiterScreenPreperationResponse,
      ] = await Promise.all([
        responseLLMGenerator(jobDescriptionAnalysis(promptInputData).prompt),
        responseLLMGenerator(
          resumeExperienceToStandOut(promptInputData).prompt
        ),
        responseLLMGenerator(favouriteProductQuestion(promptInputData).prompt),
        responseLLMGenerator(productDesign(promptInputData).prompt),
        responseLLMGeneratorWithSources(knowTheCompany(promptInputData).prompt),
        responseLLMGeneratorWithSources(
          productResearch(promptInputData).prompt
        ),
        responseLLMGeneratorWithSources(
          recruiterScreenPreperation(promptInputData).prompt
        ),
      ]);

      knowTheCompanyResponse = {
        name: "Know the Company",
        ...knowTheCompanyResponse,
      };

      productResearchResponse = {
        name: "Product Research",
        ...productResearchResponse,
      };

      recruiterScreenPreperationResponse = {
        name: "Recruiter Screen Preperation",
        ...recruiterScreenPreperationResponse,
      };

      jobDescriptionAnalysisResponse = {
        name: "Job Description Analysis",
        ...jobDescriptionAnalysisResponse,
      };
      resumeExperienceToStandOutResponse = {
        name: "Resume Experience to Stand Out",
        ...resumeExperienceToStandOutResponse,
      };
      favouriteProductQuestionResponse = {
        name: "Fovourite Product Question",
        ...favouriteProductQuestionResponse,
      };
      productDesignResponse = {
        name: "Product Design",
        ...productDesignResponse,
      };

      fullGuideModuleResponses = [
        jobDescriptionAnalysisResponse,
        resumeExperienceToStandOutResponse,
        favouriteProductQuestionResponse,
        productDesignResponse,
      ];

      fullGuideModuleResponses.forEach((moduleResponse) => {
        const moduleId = new mongoose.Types.ObjectId();
        modules.push({
          _id: moduleId,
          userId: req.user._id,
          fullGuideId,
          title: moduleResponse.name,
          summaryText: moduleResponse.quickSummary
        });

        moduleNotes.push({
          userId: req.user._id,
          fullGuideId,
          moduleId,
        });

        moduleResponse.subModules.forEach((subModuleResponse) => {
          const subModuleId = new mongoose.Types.ObjectId();
          subModules.push({
            _id: subModuleId,
            userId: req.user._id,
            moduleId,
            fullGuideId,
            title: subModuleResponse.title,
            summaryText: subModuleResponse.summary,
          });

          subModuleContents.push({
            userId: req.user._id,
            subModuleId,
            fullGuideId,
            htmlText: subModuleResponse.htmlContent,
          });
        });
      });

      let [
        knowTheCompanySummaryResponse,
        productResearchSummaryResponse,
        recruiterScreenPreperationSummaryResponse,
      ] = await Promise.all([
        responseSummaryLLMGenerator(
          knowTheCompanySummaryPrompt(knowTheCompanyResponse)
        ),
        responseSummaryLLMGenerator(
          productResearchSummaryPrompt(productResearchResponse)
        ),
        responseSummaryLLMGenerator(
          recruiterScreenPreperationSummaryPrompt(
            recruiterScreenPreperationResponse
          )
        ),
      ]);

      let summaryResponses = [
        knowTheCompanySummaryResponse,
        productResearchSummaryResponse,
        recruiterScreenPreperationSummaryResponse,
      ];

      fullGuideModuleResponses = [
        knowTheCompanyResponse,
        productResearchResponse,
        recruiterScreenPreperationResponse,
      ];

      fullGuideModuleResponses.forEach((moduleResponse, index) => {
        const moduleId = new mongoose.Types.ObjectId();
        modules.push({
          _id: moduleId,
          userId: req.user._id,
          fullGuideId,
          title: moduleResponse.name,
          summaryText: moduleResponse.quickSummary,
          isSources:moduleResponse.sources?true:false
        });

        moduleNotes.push({
          userId: req.user._id,
          fullGuideId,
          moduleId,
        });

        moduleSummaries.push({
          userId: req.user._id,
          moduleId,
          fullGuideId,
          summaryHtmlText: summaryResponses[index],
        });

        moduleQuestions.push({
          userId: req.user._id,
          fullGuideId,
          moduleId,
          title: "Practice Questions",
          summaryText:
            "These questions are commonly asked about company knowledge. Practice your responses and use the auto-generate feature to get sample answers and talking points.",
        });

        staticQuestions.forEach((staticQuestion) => {
          moduleQuestionContents.push({
            userId: req.user._id,
            fullGuideId,
            moduleId,
            question: staticQuestion.question,
            answer: staticQuestion.answer,
          });
        });

        moduleResponse.subModules.forEach((subModuleResponse) => {
          const subModuleId = new mongoose.Types.ObjectId();
          subModules.push({
            _id: subModuleId,
            userId: req.user._id,
            moduleId,
            fullGuideId,
            title: subModuleResponse.title,
            summaryText: subModuleResponse.summary,
          });

          subModuleContents.push({
            userId: req.user._id,
            subModuleId,
            fullGuideId,
            htmlText: subModuleResponse.htmlContent,
          });
        });

        if (moduleResponse.sources) {
          moduleResponse.sources.forEach((source) => {
            sources.push({
              userId: req.user._id,
              fullGuideId,
              moduleId,
              title: source.title,
              text: source.content,
              url: source.url,
            });
          });
        }
      });

      await session.withTransaction(async () => {
        const createdDocs = await fullGuide.create([newFullGuideData], { session });
        newFullGuideData = createdDocs[0];
        // 1. Update user resume if uploaded
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

        // 2. Bulk insert for "modules"
        if (modules.length > 0) {
          await module.bulkWrite(
            modules.map((m) => ({
              insertOne: { document: m },
            })),
            { session }
          );
        }

        // 3. Bulk insert for "moduleNotes"
        if (moduleNotes.length > 0) {
          await moduleNote.bulkWrite(
            moduleNotes.map((n) => ({
              insertOne: { document: n },
            })),
            { session }
          );
        }

        // 4. Bulk insert for "sources"
        if (sources.length > 0) {
          await moduleSources.bulkWrite(
            sources.map((s) => ({
              insertOne: { document: s },
            })),
            { session }
          );
        }

        // 5. Bulk insert for "moduleQuestions"
        if (moduleQuestions.length > 0) {
          await moduleQuestion.bulkWrite(
            moduleQuestions.map((q) => ({
              insertOne: { document: q },
            })),
            { session }
          );
        }

        // 6. Bulk insert for "moduleSummaries"
        if (moduleSummaries.length > 0) {
          await moduleSummary.bulkWrite(
            moduleSummaries.map((s) => ({
              insertOne: { document: s },
            })),
            { session }
          );
        }

        // 7. Bulk insert for "moduleQuestionContents"
        if (moduleQuestionContents.length > 0) {
          await moduleQuestionContent.bulkWrite(
            moduleQuestionContents.map((c) => ({
              insertOne: { document: c },
            })),
            { session }
          );
        }

        // 8. Bulk insert for "subModules"
        if (subModules.length > 0) {
          await subModule.bulkWrite(
            subModules.map((sm) => ({
              insertOne: { document: sm },
            })),
            { session }
          );
        }

        // 9. Bulk insert for "subModuleContents"
        if (subModuleContents.length > 0) {
          await subModuleContent.bulkWrite(
            subModuleContents.map((sc) => ({
              insertOne: { document: sc },
            })),
            { session }
          );
        }
      });

      session.endSession();


      res.status(201).json({
        success: true,
        message: "full Guide Created Successfully",
        newFullGuideData,
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

export const deleteFullGuide = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const fullGuideId = req.params.fullGuideId;

      // 1️⃣ Delete main fullGuide first
      const fullGuideDelete = await fullGuideService.deleteFullGuide(
        { userId: req.user._id, _id: fullGuideId },
        { session }
      );

      if (!fullGuideDelete.deletedCount) {
        throw new Error("NOT_FOUND");
      }

      // 2️⃣ Prepare delete tasks (parallel)
      const deleteTasks = [
        module.deleteMany({ fullGuideId }, { session }),
        subModule.deleteMany({ fullGuideId }, { session }),
        moduleNote.deleteMany({ fullGuideId }, { session }),
        moduleQuestion.deleteMany({ fullGuideId }, { session }),
        moduleQuestionContent.deleteMany({ fullGuideId }, { session }),
        moduleSummary.deleteMany({ fullGuideId }, { session }),
        moduleSources.deleteMany({ fullGuideId }, { session }),
        subModuleContent.deleteMany({ fullGuideId }, { session }),
      ];

      // 3️⃣ Run all deletions at same time (max speed)
      await Promise.all(deleteTasks);
    });

    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Full Guide deleted successfully",
    });
  } catch (err) {
    session.endSession();

    if (err.message === "NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Full Guide not found",
      });
    }

    next(err);
  }
};

export const getFullGuides = async (req, res, next) => {
  try {

    // Fetch paginated guides
    const fullGuides = await fullGuideService.getFullGuides(
      { userId: req.user._id },
      req.query.offset,
      req.query.limit
    );

    // Fetch total count of guides (without pagination)
    const totalFullGuides = await fullGuideService.countFullGuides({
      userId: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "Guides fetched successfully",
      totalFullGuides, // total available in DB
      fullGuides, // current paginated results
    });
  } catch (err) {
    next(err);
  }
};

export const getFullGuide = async (req, res, next) => {
  try {

    // Fetch paginated guides
    const fullGuide = await fullGuideService.getFullGuide(
      { userId: req.user._id,_id:req.params.fullGuideId }
    );

     if (!fullGuide)
      return res.status(401).json({
        success: false,
        message: "full guide not found",
      });

    res.status(200).json({
      success: true,
      message: "Guide fetched successfully",
     fullGuide
    });
  } catch (err) {
    next(err);
  }
};

