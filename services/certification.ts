import { ApiClient } from "../apis";
import { Certification } from "../interfaces";

export const getCertification = async (id: string) => {
  const res = await ApiClient.get(`/certification/${id}`);
  return res.data;
};

export const getCertificationsByClinicId = async (clinic_id: string) => {
  const res = await ApiClient.get(`/certification?clinic_id=${clinic_id}`);
  return res.data;
};

export const createOne = async (payload: Certification) => {
  const res = await ApiClient.post("/certification", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: Certification) => {
  const res = await ApiClient.put(`/certification/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/certification/${id}`);
  return res.data;
};
