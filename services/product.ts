import { ApiClient } from "../apis";
import { Product } from "../interfaces";

export const getProduct = async (id: string) => {
  const res = await ApiClient.get(`/product/${id}`);
  return res.data;
};

export const getProductsByMedicId = async (medic_id: string) => {
  const res = await ApiClient.get(`/product?medic_id=${medic_id}`);
  return res.data;
};

export const getProducts = async () => {
  const res = await ApiClient.get(`/product`);
  return res.data;
};

export const createOne = async (payload: Product) => {
  const res = await ApiClient.post("/product", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: Product) => {
  const res = await ApiClient.put(`/product/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/product/${id}`);
  return res.data;
};
