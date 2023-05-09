import { ApiClient } from "../apis";
import { File } from "../interfaces";

export const getFilesByParentIdAndType = async (
  parent_id: string,
  type: string
) => {
  const res = await ApiClient.get(`/file?parent_id=${parent_id}&type=${type}`);
  return res.data;
};

export const createOne = async (payload: File) => {
  const res = await ApiClient.post("/file", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: File) => {
  const res = await ApiClient.put(`/file/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/file/${id}`);
  return res.data;
};
