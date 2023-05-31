import { ApiClient } from "../apis";
import { Procedure } from "../interfaces";

export const getProceduresByMedicId = async (medic_id: string) => {
  const res = await ApiClient.get(`/procedure?medic_id=${medic_id}`);
  return res.data;
};

export const createOne = async (payload: Procedure) => {
  const res = await ApiClient.post("/procedure", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: Procedure) => {
  const res = await ApiClient.put(`/procedure/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/procedure/${id}`);
  return res.data;
};
