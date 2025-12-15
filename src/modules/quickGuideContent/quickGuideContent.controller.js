import * as quickGuideContentService from "./quickGuideContent.service.js";

export const getQuickGuideContent = async (req, res, next) => {
  try {
    const quickGuideContent = await quickGuideContentService.getQuickGuideContent({
      userId: req.user._id,
      quickGuideId:req.params.quickGuideId
  });

  if(!quickGuideContent)
    return  res.status(401).json({
      success: false,
      message: "Quick guide content not found",
    });

    res.status(201).json({
      success: true,
      message: "Quick Guide Content Fetched successfully",
      quickGuideContent
    });
  } catch (err) {
    next(err);
  }
};