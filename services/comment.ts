import { ApiClient } from "../apis";
import { Comment } from "../interfaces";

export const getComment = async (id: string) => {
  const res = await ApiClient.get(`/comment/${id}`);
  return res.data;
};

export const getComments = async () => {
  const res = await ApiClient.get(`/comment`);
  return res.data;
};

export const getCommentsByParentId = async (parent_id: string) => {
  const res = await ApiClient.get(`/comment?parent_id=${parent_id}`);
  return res.data;
};

export const createOne = async (payload: Comment, type?: string) => {
  const res = await ApiClient.post("/comment", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: Comment) => {
  const res = await ApiClient.put(`/comment/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/comment/${id}`);
  return res.data;
};
