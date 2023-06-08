import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbMedics } from "../../../database";
import { Medic, IMedic } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | IMedic | IMedic[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getMedics(req, res);
    default:
      return res.status(400).json({ message: "The endpoint does not exist" });
  }
}

const createModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ message: "You must be authenticated to do this" });
  }

  const {
    type = "",
    parent_id = "",
    status = "",
    card_id = "",
    contract_signature = "",
    available_days = "",
    curriculum = "",
    qualification = 0,
    comments = 0,
    instagram = "",
    country = "",
    state = "",
    province = "",
    createdAt = Date.now(),
    updatedAt = 0,
  } = req.body;
  await db.connect();

  const newModel = new Medic({
    type,
    parent_id,
    status, 
    card_id,
    contract_signature,
    available_days,
    curriculum,
    qualification,
    comments,
    instagram,
    country,
    state,
    province,
    createdAt,
    updatedAt,
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

const getMedics = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const medics = await dbMedics.getMedicByUserId(
      req.query.parent_id as string
    );
    return res.status(201).json(medics); 
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};
