import { ApiClient } from "../apis";
import { IUser } from "../interfaces";

export const login = async (email: string, password: string) => {
  const data = await ApiClient.post("/user/login", { email, password });
  return data;
};

export const getUser = async (id: string) => {
  const res = await ApiClient.get(`/user/${id}`);
  return res.data;
};

export const getUserByEmail = async (id: string) => {
  const res = await ApiClient.get(`/user?email=${id}`);
  return res.data;
};

export const updateOne = async (id: string, payload: IUser) => {
  const res = await ApiClient.put(`/user/${id}`, payload);
  return res.data;
};

export const deleteOne = async (id: string) => {
  const res = await ApiClient.delete(`/user/${id}`);
  return res.data;
};
