import * as subModuleContentModal from "./subModuleContent.service.js";

export const getSubModuleContent = async (req, res, next) => {
  try {
    const subModuleContent = await subModuleContentModal.getSubModuleContent({
      userId: req.user._id,
      fullGuideId:req.params.fullGuideId,
      subModuleId:req.params.subModuleId
  });

  if(!subModuleContent)
    return res.status(401).json({
      success: false,
      message: "subModuleContent not found"
    });

    res.status(201).json({
      success: true,
      message: "subModuleContent Fetched successfully",
      subModuleContent
    });
  } catch (err) {
    next(err);
  }
};
