import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbDegrees } from "../../../database";
import { Degree, IDegree } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | IDegree | IDegree[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getDegrees(req, res);
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
    medic_id = "",
    name = "",
    university = "",
    file_id = "",
    certificated = false,
    to_approve = false,
    createdAt = Date.now(),
    updatedAt = 0,
  } = req.body;
  await db.connect();

  const newModel = new Degree({
    medic_id,
    name,
    university,
    file_id,
    certificated,
    to_approve,
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

const getDegrees = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const degrees = await dbDegrees.getDegreesByMedicId(
      req.query.medic_id as string
    );
    return res.status(201).json(degrees);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};
