import * as quickGuideKeyFactService from "./quickGuideKeyFact.service.js";

export const getQuickGuideKeyFact = async (req, res, next) => {
  try {
    const quickGuideKeyFact = await quickGuideKeyFactService.getQuickGuideKeyFact({
      userId: req.user._id,
      quickGuideId:req.params.quickGuideId
  });

  if(!quickGuideKeyFact)
    return res.status(401).json({
      success: false,
      message: "Quick Guide Key Fact not found",
    });

    res.status(201).json({
      success: true,
      message: "Quick Guide Key Fact Fetched successfully",
      quickGuideKeyFact
    });
  } catch (err) {
    next(err);
  }
};