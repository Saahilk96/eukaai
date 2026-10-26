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
  knowTheCompany,
  productResearch,
  recruiterScreenPreperation,
  jobDescriptionAnalysis,
  resumeExperienceToStandOut,
  favouriteProductQuestion,
  productDesign,
  behavioralAndLeadership,
  analyticalEstimation,
  productStrategy,
  productSense,
  technical,
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

// Builds the flat DB arrays for a module response (modules without summaries/questions/sources)
function buildModuleDocuments(moduleResponse, { userId, fullGuideId, modules, moduleNotes, subModules, subModuleContents }) {
  const moduleId = new mongoose.Types.ObjectId();

  modules.push({
    _id: moduleId,
    userId,
    fullGuideId,
    title: moduleResponse.name,
    summaryText: moduleResponse.quickSummary,
  });

  moduleNotes.push({ userId, fullGuideId, moduleId });

  for (const sm of moduleResponse.subModules) {
    const subModuleId = new mongoose.Types.ObjectId();
    subModules.push({
      _id: subModuleId,
      userId,
      moduleId,
      fullGuideId,
      title: sm.title,
      summaryText: sm.summary,
    });
    subModuleContents.push({
      userId,
      subModuleId,
      fullGuideId,
      htmlText: sm.htmlContent,
    });
  }

  return moduleId;
}

// Builds DB arrays for source modules (knowTheCompany, productResearch, recruiterScreen)
function buildSourceModuleDocuments(moduleResponse, summaryHtml, { userId, fullGuideId, modules, moduleNotes, subModules, subModuleContents, moduleSummaries, moduleQuestions, moduleQuestionContents, sources }) {
  const moduleId = new mongoose.Types.ObjectId();

  modules.push({
    _id: moduleId,
    userId,
    fullGuideId,
    title: moduleResponse.name,
    summaryText: moduleResponse.quickSummary,
    isSources: moduleResponse.sources ? true : false,
  });

  moduleNotes.push({ userId, fullGuideId, moduleId });

  moduleSummaries.push({
    userId,
    moduleId,
    fullGuideId,
    summaryHtmlText: summaryHtml,
  });

  moduleQuestions.push({
    userId,
    fullGuideId,
    moduleId,
    title: "Practice Questions",
    summaryText:
      "These questions are commonly asked about company knowledge. Practice your responses and use the auto-generate feature to get sample answers and talking points.",
  });

  for (const sq of staticQuestions) {
    moduleQuestionContents.push({
      userId,
      fullGuideId,
      moduleId,
      question: sq.question,
      answer: sq.answer,
    });
  }

  for (const sm of moduleResponse.subModules) {
    const subModuleId = new mongoose.Types.ObjectId();
    subModules.push({
      _id: subModuleId,
      userId,
      moduleId,
      fullGuideId,
      title: sm.title,
      summaryText: sm.summary,
    });
    subModuleContents.push({
      userId,
      subModuleId,
      fullGuideId,
      htmlText: sm.htmlContent,
    });
  }

  if (moduleResponse.sources) {
    for (const source of moduleResponse.sources) {
      sources.push({
        userId,
        fullGuideId,
        moduleId,
        title: source.title,
        text: source.content,
        url: source.url,
      });
    }
  }
}

const EMPTY_GUIDE = { quickSummary: "", subModules: [], sources: [] };

export const createFullGuide = async (req, res, next) => {
  const uploadedFilePath = req.file?.path;
  try {
    const { jobDescription, jobRole, companyName, companyWebsite } = req.body;
    let userResume = req.user.resume;

    if (req.file) {
      if (!["application/pdf"].includes(req.file.mimetype)) {
        return res.status(400).json({ status: false, message: "Only PDF resumes are allowed" });
      }
      if (req.file.size > 5 * 1024 * 1024) {
        return res.status(400).json({ status: false, message: "Resume size must be under 5MB" });
      }
      userResume = await extractText(req.file.path);
    }

    if (req.user.totalGeneratedFullGuides >= 1 && !req.user.paymentDone) {
      return res.status(403).json({
        status: false,
        message: "Free trial limit reached. Please make a payment to continue creating full guides.",
      });
    }

    if (!userResume) {
      return res.status(400).json({ status: false, message: "Resume required" });
    }

    const promptInputData = { companyName, jobRole, jobDescription, userResume };
    if (companyWebsite !== undefined) promptInputData.companyWebsite = companyWebsite;

    // --- Phase 1: Fire all 12 LLM calls simultaneously ---
    // The 3 source modules (knowTheCompany, productResearch, recruiterScreen) need
    // summaries generated from their output. We chain their summaries directly so
    // they start as soon as each one resolves, without waiting for the other 9.

    const knowTheCompanyPromise = responseLLMGeneratorWithSources(knowTheCompany(promptInputData).prompt)
      .catch(() => EMPTY_GUIDE)
      .then(async (res) => {
        const r = { name: "Know the Company", ...res };
        const summary = await responseSummaryLLMGenerator(knowTheCompanySummaryPrompt(promptInputData, r)).catch(() => "");
        return { response: r, summary };
      });

    const productResearchPromise = responseLLMGeneratorWithSources(productResearch(promptInputData).prompt)
      .catch(() => EMPTY_GUIDE)
      .then(async (res) => {
        const r = { name: "Product Research", ...res };
        const summary = await responseSummaryLLMGenerator(productResearchSummaryPrompt(promptInputData, r)).catch(() => "");
        return { response: r, summary };
      });

    const recruiterScreenPromise = responseLLMGeneratorWithSources(recruiterScreenPreperation(promptInputData).prompt)
      .catch(() => EMPTY_GUIDE)
      .then(async (res) => {
        const r = { name: "Recruiter Screen Preperation", ...res };
        const summary = await responseSummaryLLMGenerator(recruiterScreenPreperationSummaryPrompt(promptInputData, r)).catch(() => "");
        return { response: r, summary };
      });

    const [
      jobDescriptionAnalysisResult,
      resumeExperienceToStandOutResult,
      favouriteProductQuestionResult,
      productDesignResult,
      behavioralAndLeadershipResult,
      analyticalEstimationResult,
      productStrategyResult,
      productSenseResult,
      technicalResult,
      knowTheCompanyResult,
      productResearchResult,
      recruiterScreenResult,
    ] = await Promise.allSettled([
      responseLLMGenerator(jobDescriptionAnalysis(promptInputData).prompt),
      responseLLMGenerator(resumeExperienceToStandOut(promptInputData).prompt),
      responseLLMGenerator(favouriteProductQuestion(promptInputData).prompt),
      responseLLMGenerator(productDesign(promptInputData).prompt),
      responseLLMGeneratorWithSources(behavioralAndLeadership(promptInputData).prompt),
      responseLLMGeneratorWithSources(analyticalEstimation(promptInputData).prompt),
      responseLLMGeneratorWithSources(productStrategy(promptInputData).prompt),
      responseLLMGeneratorWithSources(productSense(promptInputData).prompt),
      responseLLMGeneratorWithSources(technical(promptInputData).prompt),
      knowTheCompanyPromise,
      productResearchPromise,
      recruiterScreenPromise,
    ]);

    const getValue = (result, fallback) =>
      result.status === "fulfilled" ? result.value : fallback;

    const standardModules = [
      { name: "Job Description Analysis",        ...getValue(jobDescriptionAnalysisResult, EMPTY_GUIDE) },
      { name: "Resume Experience to Stand Out",  ...getValue(resumeExperienceToStandOutResult, EMPTY_GUIDE) },
      { name: "Favourite Product Question",      ...getValue(favouriteProductQuestionResult, EMPTY_GUIDE) },
      { name: "Product Design",                  ...getValue(productDesignResult, EMPTY_GUIDE) },
      { name: "Behavioral and Leadership",       ...getValue(behavioralAndLeadershipResult, EMPTY_GUIDE) },
      { name: "Analytical Estimation",           ...getValue(analyticalEstimationResult, EMPTY_GUIDE) },
      { name: "Product Strategy",                ...getValue(productStrategyResult, EMPTY_GUIDE) },
      { name: "Product Sense",                   ...getValue(productSenseResult, EMPTY_GUIDE) },
      { name: "Technical",                       ...getValue(technicalResult, EMPTY_GUIDE) },
    ];

    const { response: knowTheCompanyResponse, summary: knowTheCompanySummary } =
      getValue(knowTheCompanyResult, { response: { name: "Know the Company", ...EMPTY_GUIDE }, summary: "" });
    const { response: productResearchResponse, summary: productResearchSummary } =
      getValue(productResearchResult, { response: { name: "Product Research", ...EMPTY_GUIDE }, summary: "" });
    const { response: recruiterScreenResponse, summary: recruiterScreenSummary } =
      getValue(recruiterScreenResult, { response: { name: "Recruiter Screen Preperation", ...EMPTY_GUIDE }, summary: "" });

    // --- Phase 2: Build all DB documents ---
    const fullGuideId = new mongoose.Types.ObjectId();
    const userId = req.user._id;

    const modules = [];
    const moduleNotes = [];
    const subModules = [];
    const subModuleContents = [];
    const moduleSummaries = [];
    const moduleQuestions = [];
    const moduleQuestionContents = [];
    const sources = [];

    for (const mod of standardModules) {
      buildModuleDocuments(mod, { userId, fullGuideId, modules, moduleNotes, subModules, subModuleContents });
    }

    buildSourceModuleDocuments(knowTheCompanyResponse, knowTheCompanySummary, { userId, fullGuideId, modules, moduleNotes, subModules, subModuleContents, moduleSummaries, moduleQuestions, moduleQuestionContents, sources });
    buildSourceModuleDocuments(productResearchResponse, productResearchSummary, { userId, fullGuideId, modules, moduleNotes, subModules, subModuleContents, moduleSummaries, moduleQuestions, moduleQuestionContents, sources });
    buildSourceModuleDocuments(recruiterScreenResponse, recruiterScreenSummary, { userId, fullGuideId, modules, moduleNotes, subModules, subModuleContents, moduleSummaries, moduleQuestions, moduleQuestionContents, sources });

    // --- Phase 3: Write to DB in a transaction (session opened only now) ---
    const session = await mongoose.startSession();

    try {
      let newFullGuideData = {
        userId,
        _id: fullGuideId,
        companyName: req.body.companyName,
        jobRole: req.body.jobRole,
      };

      await session.withTransaction(async () => {
        const createdDocs = await fullGuide.create([newFullGuideData], { session });
        newFullGuideData = createdDocs[0];

        const userUpdate = req.file
          ? { $set: { resume: userResume }, $inc: { totalGeneratedFullGuides: 1 } }
          : { $inc: { totalGeneratedFullGuides: 1 } };
        await User.updateOne({ _id: userId }, userUpdate, { session });

        const bulkOps = [
          modules.length > 0 && module.bulkWrite(modules.map((m) => ({ insertOne: { document: m } })), { session }),
          moduleNotes.length > 0 && moduleNote.bulkWrite(moduleNotes.map((n) => ({ insertOne: { document: n } })), { session }),
          sources.length > 0 && moduleSources.bulkWrite(sources.map((s) => ({ insertOne: { document: s } })), { session }),
          moduleQuestions.length > 0 && moduleQuestion.bulkWrite(moduleQuestions.map((q) => ({ insertOne: { document: q } })), { session }),
          moduleSummaries.length > 0 && moduleSummary.bulkWrite(moduleSummaries.map((s) => ({ insertOne: { document: s } })), { session }),
          moduleQuestionContents.length > 0 && moduleQuestionContent.bulkWrite(moduleQuestionContents.map((c) => ({ insertOne: { document: c } })), { session }),
          subModules.length > 0 && subModule.bulkWrite(subModules.map((sm) => ({ insertOne: { document: sm } })), { session }),
          subModuleContents.length > 0 && subModuleContent.bulkWrite(subModuleContents.map((sc) => ({ insertOne: { document: sc } })), { session }),
        ].filter(Boolean);

        await Promise.all(bulkOps);
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

      const fullGuideDelete = await fullGuideService.deleteFullGuide(
        { userId: req.user._id, _id: fullGuideId },
        { session }
      );

      if (!fullGuideDelete.deletedCount) {
        throw new Error("NOT_FOUND");
      }

      await Promise.all([
        module.deleteMany({ fullGuideId }, { session }),
        subModule.deleteMany({ fullGuideId }, { session }),
        moduleNote.deleteMany({ fullGuideId }, { session }),
        moduleQuestion.deleteMany({ fullGuideId }, { session }),
        moduleQuestionContent.deleteMany({ fullGuideId }, { session }),
        moduleSummary.deleteMany({ fullGuideId }, { session }),
        moduleSources.deleteMany({ fullGuideId }, { session }),
        subModuleContent.deleteMany({ fullGuideId }, { session }),
      ]);
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
    const [fullGuides, totalFullGuides] = await Promise.all([
      fullGuideService.getFullGuides({ userId: req.user._id }, req.query.offset, req.query.limit),
      fullGuideService.countFullGuides({ userId: req.user._id }),
    ]);

    res.status(200).json({
      success: true,
      message: "Guides fetched successfully",
      totalFullGuides,
      fullGuides,
    });
  } catch (err) {
    next(err);
  }
};

export const getFullGuide = async (req, res, next) => {
  try {
    const fullGuide = await fullGuideService.getFullGuide({
      userId: req.user._id,
      _id: req.params.fullGuideId,
    });

    if (!fullGuide) {
      return res.status(401).json({ success: false, message: "full guide not found" });
    }

    res.status(200).json({
      success: true,
      message: "Guide fetched successfully",
      fullGuide,
    });
  } catch (err) {
    next(err);
  }
};
