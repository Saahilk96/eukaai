import quickGuide from "./quickGuide.model.js";

export const createQuickGuide = async (data) => {
  const createdQuickGuide = new quickGuide(data);
  const savedFullGuide = await createdQuickGuide.save();

  return savedFullGuide;
};

export const deleteQuickGuide = async (condition) => {
  return await quickGuide.deleteOne(condition)
}

export const getQuickGuide = async (condition,offset,limit) => {
  return await quickGuide.find(condition).skip(offset).limit(limit);
}