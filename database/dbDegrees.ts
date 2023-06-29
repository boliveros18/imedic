import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Degree, IDegree, File } from "../models";

export const getDegreeById = async (id: string): Promise<IDegree | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }
  await db.connect();
  const degree = await Degree.findById(id).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(degree));
};

export const getDegreesByMedicId = async (
  medic_id: string
): Promise<IDegree[] | []> => {
  const params = medic_id ? { medic_id: medic_id } : {};
  await db.connect();
  if (medic_id) {
    const degrees: IDegree[] = await Degree.find(params).lean();
    await db.disconnect();
    return JSON.parse(JSON.stringify(degrees));
  }
  return [];
};

