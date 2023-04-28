import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Qualification, IQualification } from "../models";

export const getQualificationById = async (
  id: string
): Promise<IQualification | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await db.connect();
  const qualification = await Qualification.findById(id).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(qualification));
};

export const getAllQualifications = async (): Promise<IQualification[]> => {
  await db.connect();
  const qualifications = await Qualification.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(qualifications));
};

export const getQualificationByParentId = async (
  id: string
): Promise<IQualification[] | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }
  await db.connect();
  const qualification = await Qualification.find({
    parent_id: { $eq: id },
  });
  await db.disconnect();
  return JSON.parse(JSON.stringify(qualification));
};
