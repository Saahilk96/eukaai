import mongoose from "mongoose";
import subModule from "./subModule.model.js";
import module from "../module/module.model.js";
import * as subModuleServices from "./subModule.service.js";
import fullGuide from "../fullGuide/fullGuide.model.js";

export const getSubModules = async (req, res, next) => {
  try {
    const subModules = await subModuleServices.getSubModules({
      userId: req.user._id,
      fullGuideId: req.params.fullGuideId,
      moduleId: req.params.moduleId,
    });

    res.status(201).json({
      success: true,
      message: "subModules Fetched successfully",
      totalSubModules: subModules.length,
      subModules,
    });
  } catch (err) {
    next(err);
  }
};

export const markSubModule = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { subModuleId, moduleId, fullGuideId } = req.params;

    const sId = new mongoose.Types.ObjectId(subModuleId);
    const mId = new mongoose.Types.ObjectId(moduleId);
    const fId = new mongoose.Types.ObjectId(fullGuideId);

    // 1. Fetch submodule
    const sub = await subModule
      .findOne({ _id: sId, moduleId: mId, fullGuideId: fId })
      .session(session);

    if (!sub) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Submodule not found" });
    }

    // 2. Toggle 0 ↔ 1
    const newValue = sub.completed === 1 ? 0 : 1;

    // 3. Update submodule
    await subModule.updateOne(
      { _id: sId },
      { $set: { completed: newValue } },
      { session }
    );

    // 4. Recalculate module progress
    const subs = await subModule.find({ moduleId: mId }).session(session);

    const completedCount = subs.filter((s) => s.completed === 1).length;

    const moduleProgress = Math.round(
      (completedCount / subs.length) * 100
    );

    await module.updateOne(
      { _id: mId, fullGuideId: fId },
      { $set: { progress: moduleProgress } },
      { session }
    );

    // 5. Recalculate fullGuide progress
    const modules = await module
      .find({ fullGuideId: fId })
      .session(session);

    const guideProgress = Math.round(
      modules.reduce((sum, m) => sum + m.progress, 0) / modules.length
    );

    await fullGuide.updateOne(
      { _id: fId },
      { $set: { progress: guideProgress } },
      { session }
    );

    // 6. Commit transaction
    await session.commitTransaction();
    session.endSession();

    return res.json({
      message: "Submodule toggled successfully",
      completed: newValue,
      moduleProgress,
      guideProgress,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ error: err.message });
  }
};

