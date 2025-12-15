import fullGuide from "./fullGuide.model.js";

export const createFullGuide = async (data,options) => {
  const createdFullGuide = new fullGuide(data);
  const savedFullGuide = await createdFullGuide.save(options);

  return savedFullGuide;
};

export const deleteFullGuide = async (condition,option) => {
  return await fullGuide.deleteOne(condition,option)
}

export const getFullGuide = async (condition) => {
  return await fullGuide.findOne(condition)
}

export const getFullGuides = async (condition,offset,limit) => {
  return await fullGuide.find(condition).skip(offset).limit(limit).lean();
}

// count total guides
export const countFullGuides = async (filter) => {
  return await fullGuide.countDocuments(filter);
}
