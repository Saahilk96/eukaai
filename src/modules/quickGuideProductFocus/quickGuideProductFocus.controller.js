import * as quickGuideProductFocusService from "./quickGuideProductFocus.service.js";

export const getQuickGuideProductFocus = async (req, res, next) => {
  try {
    const quickGuideProductFocus = await quickGuideProductFocusService.getQuickGuideProductFocus({
      userId: req.user._id,
      quickGuideId:req.params.quickGuideId
  });

  if(!quickGuideProductFocus)
    return res.status(401).json({
      success: false,
      message: "Quick Guide Product Focus not found",
    });

    res.status(201).json({
      success: true,
      message: "Quick Guide Product Focus Fetched successfully",
      quickGuideProductFocus
    });
  } catch (err) {
    next(err);
  }
};