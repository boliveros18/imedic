import { ApiClient } from "../apis";
import { Degree } from "../interfaces";

export const getDegree = async (id: string) => {
  const res = await ApiClient.get(`/degree/${id}`);
  return res.data;
};

export const getDegreesByMedicId = async (medic_id: string) => {
  const res = await ApiClient.get(`/degree?medic_id=${medic_id}`);
  return res.data;
};

export const createOne = async (payload: Degree) => {
  const res = await ApiClient.post("/degree", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: Degree) => {
  const res = await ApiClient.put(`/degree/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/degree/${id}`);
  return res.data;
};
