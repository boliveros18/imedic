import { ApiClient } from "../apis";
import { Client } from "../interfaces";

export const getClient = async (id: string) => {
  const res = await ApiClient.get(`/client/${id}`);
  return res.data;
};

export const getClientByUserId = async (parent_id: string) => {
  const res = await ApiClient.get(`/client?parent_id=${parent_id}`);
  return res.data;
};

export const getClients = async () => {
  const res = await ApiClient.get(`/client`);
  return res.data;
};

export const createOne = async (payload: Client) => {
  const res = await ApiClient.post("/client", payload);
  return res.data;
};

export const updateOne = async (id: string, payload: Client) => {
  const res = await ApiClient.put(`/client/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/client/${id}`);
  return res.data;
};
