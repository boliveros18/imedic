import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Qualification, IQualification } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | IQualification;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getQualifications(res);
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

  const { user_id = "", user_name = "", parent_id = "", stars = 0 } = req.body;
  await db.connect();

  const newModel = new Qualification({
    user_id,
    user_name,
    parent_id,
    stars,
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

const getQualifications = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const qualifications: any = await Qualification.find().sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return res.status(200).json(qualifications);
};
