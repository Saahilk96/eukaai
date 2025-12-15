import * as moduleSummaryService from "./moduleSummary.service.js";

export const getModuleSummary = async (req, res, next) => {
  try {
    const moduleSummary = await moduleSummaryService.getModuleSummary({
      userId: req.user._id,
      fullGuideId:req.params.fullGuideId,
      moduleId:req.params.moduleId
  });

  if(!moduleSummary)
    return res.status(401).json({
      success: false,
      message: "moduleSummary not found",
    });

    res.status(201).json({
      success: true,
      message: "module Summary Fetched successfully",
      moduleSummary
    });
  } catch (err) {
    next(err);
  }
};
