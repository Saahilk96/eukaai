import * as moduleQuestionModal from "./moduleQuestion.service.js";

export const getModuleQuestion = async (req, res, next) => {
  try {
    const moduleQuestion = await moduleQuestionModal.getModuleQuestion({
      userId: req.user._id,
      fullGuideId:req.params.fullGuideId,
      moduleId:req.params.moduleId
  });

  if(!moduleQuestion)
    return res.status(401).json({
      success: false,
      message: "module Question not found",
    });

    res.status(201).json({
      success: true,
      message: "module question Fetched successfully",
      moduleQuestion
    });
  } catch (err) {
    next(err);
  }
};
