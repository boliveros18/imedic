import { ApiClient } from "../apis";
import { Quote } from "../interfaces";

export const getQuotesByProductId = async (product_id: string) => {
  const res = await ApiClient.get(`/quote?product_id=${product_id}`);
  return res.data;
};

export const createOne = async (payload: Quote) => {
  const res = await ApiClient.post("/quote", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: Quote) => {
  const res = await ApiClient.put(`/quote/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/quote/${id}`);
  return res.data;
};
