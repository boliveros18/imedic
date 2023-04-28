import { ApiClient } from "../apis";
import { Qualification } from "../interfaces";

export const getQualification = async (id: string) => {
  const res = await ApiClient.get(`/qualification/${id}`);
  return res.data;
};

export const getQualifications = async () => {
  const res = await ApiClient.get(`/qualification`);
  return res.data;
};

export const createOne = async (payload: Qualification) => {
  const res = await ApiClient.post("/qualification", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: Qualification) => {
  const res = await ApiClient.put(`/qualification/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/qualification/${id}`);
  return res.data;
};
