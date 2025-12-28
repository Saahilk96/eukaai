import * as quickGuideInterviewQuestionsByRoundService from "./quickGuideInterviewQuestionsByRound.service.js";

export const getQuickGuideInterviewQuestionsByRound = async (req, res, next) => {
  try {
    const quickGuideInterviewQuestionsByRound = await quickGuideInterviewQuestionsByRoundService.getQuickGuideInterviewQuestionsByRound({
      userId: req.user._id,
      quickGuideId:req.params.quickGuideId
  });

  if(!quickGuideInterviewQuestionsByRound)
    return res.status(401).json({
      success: false,
      message: "Quick Guide Interview Questions By Round not found",
    });

    res.status(201).json({
      success: true,
      message: "Quick Guide Interview Questions By Round Fetched successfully",
      quickGuideInterviewQuestionsByRound
    });
  } catch (err) {
    next(err);
  }
};