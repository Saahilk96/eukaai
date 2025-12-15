import * as moduleSourcesService from "./moduleSources.service.js";

export const getModuleSources = async (req, res, next) => {
  try {
    const moduleSources = await moduleSourcesService.getModuleSources({
      userId: req.user._id,
      fullGuideId:req.params.fullGuideId,
      moduleId:req.params.moduleId
  });

    res.status(201).json({
      success: true,
      message: "module sources fetched successfully",
      moduleSources
    });
  } catch (err) {
    next(err);
  }
};
