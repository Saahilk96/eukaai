import * as quickGuideService from "./quickGuide.service.js";

export const createQuickGuide = async (req, res, next) => {
  try {
    const newQuickGuide = await quickGuideService.createQuickGuide({
      userId: req.user._id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Quick guide Created Successfully",
      data: newQuickGuide,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteQuickGuide = async (req, res, next) => {
  try {
    const quickGuide = await quickGuideService.deleteQuickGuide({
      userId: req.user._id,
      _id: req.params.quickGuideId
    });

    if(!quickGuide.deletedCount)
      return res.status(401).json({
      success: false,
      message: "full Guide not found",
    });

    res.status(200).json({
      success: true,
      message: "Quick guide deleted Successfully"
    });
  } catch (err) {
    next(err);
  }
};

export const getQuickGuides = async (req, res, next) => {
  try {
    const quickGuides = await quickGuideService.getQuickGuides({
      userId: req.user._id
    },req.query.offset,req.query.limit);

    res.status(201).json({
      success: true,
      message: "Quick Guides Fetched successfully",
      totalFullGuides:quickGuides.length,
      quickGuides
    });
  } catch (err) {
    next(err);
  }
};