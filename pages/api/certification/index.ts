import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbCertifications } from "../../../database";
import { Certification, ICertification } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | ICertification | ICertification [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getCertifications(req, res);
    default:
      return res.status(400).json({ message: "The endpoint does not exist" });
  }
}

const createModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ message: "You must be authenticated to do this" });
  }

  const {
    clinic_id = "",
    name = "",
    description = "",
    logo_link = "",
  } = req.body;
  await db.connect();

  const newModel = new Certification({
    clinic_id,
    name,
    description,
    logo_link,
  });

  try {
    await newModel.save();
    await db.disconnect();
    return res.status(201).json(newModel);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
};

const getCertifications = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
  const certifications = await dbCertifications.getCertificationsByClinicId(
    req.query.clinic_id as string
  );
  return res.status(201).json(certifications);
} catch (error: any) {
  console.log(error);
  res.status(400).json({
    message: error.message || "Check server logs",
  });
}
return;
};
