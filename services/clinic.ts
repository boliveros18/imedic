import { ApiClient } from "../apis";
import { Clinic } from "../interfaces";

export const getClinic = async (id: string) => {
  const res = await ApiClient.get(`/clinic/${id}`);
  return res.data;
};

export const getClinicsByMedicId = async (medic_id: string) => {
  const res = await ApiClient.get(`/clinic?medic_id=${medic_id}`);
  return res.data;
};

export const createOne = async (payload: Clinic) => {
  const res = await ApiClient.post("/clinic", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: Clinic) => {
  const res = await ApiClient.put(`/clinic/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/clinic/${id}`);
  return res.data;
};
