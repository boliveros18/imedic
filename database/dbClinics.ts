import { isValidObjectId } from "mongoose";
import { db } from ".";
import { Clinic, IClinic } from "../models";

export const getClinicById = async (id: string): Promise<IClinic | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }
  await db.connect();
  const clinic = await Clinic.findById(id).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(clinic));
};

export const getAllClinics = async (): Promise<IClinic[]> => {
  await db.connect();
  const clinics = await Clinic.find().lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(clinics));
};

export const getClinicsByMedicId = async (
  medic_id: string
): Promise<IClinic[] | []> => {
  const params = medic_id ? { medic_id: medic_id } : {};
  await db.connect();
  if (medic_id) {
    const clinics: IClinic[] = await Clinic.find(params).lean();
    await db.disconnect();
    return JSON.parse(JSON.stringify(clinics));
  }
  return [];
};

export const getPrincipalsClinicsId = async (): Promise<IClinic[]> => {
  await db.connect();
  const clinics = await Clinic.find({}, { _id: 1 })
    .sort({ qualification: -1 })
    .limit(5);
  await db.disconnect();
  return JSON.parse(JSON.stringify(clinics));
};

export const getPrincipalClinic = async (): Promise<any> => {
  await db.connect();
  const clinic = await Clinic.find({}).sort({ qualification: -1 }).limit(1);
  if (clinic[0] === undefined) {
    return {} as IClinic;
  }
  await db.disconnect();
  return JSON.parse(JSON.stringify(clinic[0]));
};
