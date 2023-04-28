import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Medic, IMedic } from "../models";

export const getMedicById = async (
  id: string | string[]
): Promise<IMedic | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }
  await db.connect();
  const medic = await Medic.findById(id).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(medic));
};

export const getMedicByUserId = async (parent_id: string): Promise<any> => {
  const params = parent_id ? { parent_id: parent_id } : {};
  await db.connect();
  const medic = await Medic.find(params).lean();
  if (medic[0] === undefined) {
    return {} as IMedic;
  }
  await db.disconnect();
  return JSON.parse(JSON.stringify(medic[0]));
};

export const getMedics = async (): Promise<IMedic[]> => {
  await db.connect();
  const medics = await Medic.find().sort({ qualification: -1 }).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(medics));
};

export const createMedic = async (payload: IMedic): Promise<IMedic> => {
  await db.connect();
  const medic: IMedic = await Medic.create(payload);
  await db.disconnect();
  return JSON.parse(JSON.stringify(medic));
};
