import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Certification, ICertification } from "../models";

export const getCertificationById = async (
  id: string
): Promise<ICertification | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }
  await db.connect();
  const certification = await Certification.findById(id).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(certification));
};

export const getAllCertifications = async (): Promise<ICertification[]> => {
  await db.connect();
  const certifications = await Certification.find().lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(certifications));
};

export const getCertificationsByClinicId = async (
  clinic_id: string
): Promise<ICertification[] | []> => {
  const params = clinic_id ? { clinic_id: clinic_id } : {};
  await db.connect();
  if (clinic_id){
    const certifications: ICertification[] = await Certification.find(params).lean();
    await db.disconnect();
    return JSON.parse(JSON.stringify(certifications));
  }
  return [];
};
