import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Client, IClient } from "../models";

export const getClientById = async (
  id: string | string[]
): Promise<IClient | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }
  await db.connect();
  const medic = await Client.findById(id).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(medic));
};

export const getClientByUserId = async (parent_id: string): Promise<any> => {
  const params = parent_id ? { parent_id: parent_id } : {};
  await db.connect();
  const client = await Client.find(params).lean();
  if (client[0] === undefined) {
    return {} as IClient;
  }
  await db.disconnect();
  return JSON.parse(JSON.stringify(client[0]));
};

export const getClients = async (): Promise<IClient[]> => {
  await db.connect();
  const clients = await Client.find().sort({ qualification: -1 }).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(clients));
};

export const createClient = async (payload: IClient): Promise<IClient> => {
  await db.connect();
  const client: IClient = await Client.create(payload);
  await db.disconnect();
  return JSON.parse(JSON.stringify(client));
};
