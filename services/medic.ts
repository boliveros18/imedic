import { ApiClient } from "../apis";
import { Medic } from "../interfaces";

export const getMedic = async (id: string) => {
  const res = await ApiClient.get(`/medic/${id}`);
  return res.data;
};

export const getMedicByUserId = async (parent_id: string) => {
  const res = await ApiClient.get(`/medic?parent_id=${parent_id}`);
  return res.data;
};

export const getMedics = async () => {
  const res = await ApiClient.get(`/medic`);
  return res.data;
};

export const createOne = async (payload: Medic) => {
  const res = await ApiClient.post("/medic", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: Medic) => {
  const res = await ApiClient.put(`/medic/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/medic/${id}`);
  return res.data;
};
