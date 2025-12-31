import waitList from "./waitList.model.js";

export const addWaitList = async (data) => {
  return await waitList.insertOne(data);
}
