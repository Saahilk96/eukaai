import fullGuide from "../fullGuide/fullGuide.model.js";
import moduleNote from "./moduleNote.model.js";
import * as moduleNoteService from "./moduleNote.service.js";
import mongoose from "mongoose";

export const getModuleNotes = async (req, res, next) => {
  try {
    const moduleNotes = await moduleNoteService.getModuleNotes({
      userId: req.user._id,
      fullGuideId: req.params.fullGuideId,
    });

    res.status(201).json({
      success: true,
      message: "module notes fetched successfully",
      moduleNotes,
    });
  } catch (err) {
    next(err);
  }
};

export const getModuleNote = async (req, res, next) => {
  try {
    const moduleNote = await moduleNoteService.getModuleNote({
      userId: req.user._id,
      fullGuideId: req.params.fullGuideId,
      moduleId: req.params.moduleId,
    });

    res.status(201).json({
      success: true,
      message: "module note fetched successfully",
      moduleNote,
    });
  } catch (err) {
    next(err);
  }
};

export const updateModuleNote = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await moduleNote.updateOne(
      {
        userId: req.user._id,
        fullGuideId: req.params.fullGuideId,
        moduleId: req.params.moduleId,
      },
      {
        $set: {
          note: req.body.note,
        },
      },
      { session }
    );

    await fullGuide.updateOne(
      {
        userId: req.user._id,
        _id: req.params.fullGuideId,
      },
      {
        $set: {
          isNotes: true,
        },
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "note updated successfully",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};
