import * as moduleServices from "./module.service.js";

export const getModules = async (req, res, next) => {
  try {
    const modules = await moduleServices.getModules({
      userId: req.user._id,
      fullGuideId:req.params.fullGuideId
  });

    res.status(201).json({
      success: true,
      message: "Modules Fetched successfully",
      totalModules:modules.length,
      modules
    });
  } catch (err) {
    next(err);
  }
};