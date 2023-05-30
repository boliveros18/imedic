import { ApiClient } from "../apis";
import { Calendar } from "../interfaces";

export const getCalendarByMedicId = async (medic_id: string) => {
  const res = await ApiClient.get(`/calendar?medic_id=${medic_id}`);
  return res.data;
};

export const createOne = async (payload: Calendar) => {
  const res = await ApiClient.post("/calendar", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: Calendar) => {
  const res = await ApiClient.put(`/calendar/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/calendar/${id}`);
  return res.data;
};
