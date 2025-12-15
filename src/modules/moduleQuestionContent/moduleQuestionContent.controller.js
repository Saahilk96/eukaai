import { questionAnswerGenerator } from "../../utils/fullGuide/questionAnswerGenerator.js";
import * as moduleQuestionContentService from "./moduleQuestionContent.service.js";

export const getModuleQuestionContents = async (req, res, next) => {
  try {
    const moduleQuestionContents =
      await moduleQuestionContentService.getModuleQuestionContents({
        userId: req.user._id,
        fullGuideId: req.params.fullGuideId,
        moduleId: req.params.moduleId,
      });

    res.status(201).json({
      success: true,
      message: "module question content Fetched successfully",
      moduleQuestionContents,
    });
  } catch (err) {
    next(err);
  }
};

export const generateModuleQuestionContentAnswer = async (req, res, next) => {
  try {
    const moduleQuestionContent =
      await moduleQuestionContentService.getModuleQuestionContent({
        userId: req.user._id,
        fullGuideId: req.params.fullGuideId,
        moduleId: req.params.moduleId,
        _id: req.params.moduleQuestionContentId,
      });

    if (!moduleQuestionContent)
      return res.status(401).json({
        success: false,
        message: "moduleQuestionContent not found",
      });

    const generatdAnswer = await questionAnswerGenerator(
      moduleQuestionContent.question
    );

    await moduleQuestionContentService.updateModuleQuestionContent({
      _id: req.params.moduleQuestionContentId,
    },{answer:generatdAnswer});

    res.status(201).json({
      success: true,
      message: "module question content Fetched successfully",
      answer:generatdAnswer
    });
  } catch (err) {
    next(err);
  }
};
