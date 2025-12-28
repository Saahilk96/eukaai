import quickGuide from "./quickGuide.model.js";

export const createQuickGuide = async (data, options) => {
  const createdQuickGuide = new quickGuide(data);
  const savedQuickGuide = await createdQuickGuide.save(options);

  return savedQuickGuide;
};

export const deleteQuickGuide = async (condition, option) => {
  return await quickGuide.deleteOne(condition, option);
};

export const getQuickGuide = async (condition) => {
  return await quickGuide.findOne(condition);
};

export const getQuickGuides = async (condition, offset, limit) => {
  return await quickGuide
    .find(condition)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .lean();
};

// count total guides
export const countQuickGuides = async (filter) => {
  return await quickGuide.countDocuments(filter);
};
