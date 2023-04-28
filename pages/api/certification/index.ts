import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Certification, ICertification } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | ICertification;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getCertifications(res);
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
    parent_id = "",
    name = "",
    approved = false,
    certificate = "",
    description = "",
    to_approve = false,
    logo = "",
  } = req.body;
  await db.connect();

  const newModel = new Certification({
    parent_id,
    name,
    approved,
    certificate,
    description,
    to_approve,
    logo,
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

const getCertifications = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const certifications: any = await Certification.find().sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return res.status(200).json(certifications);
};
