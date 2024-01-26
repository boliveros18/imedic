import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbClients } from "../../../database";
import { Client, IClient } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | IClient | IClient[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getClients(req, res);
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
    instagram = "",
    phone = "",
    title = "",
    birth = 0,
    gender = "",
    passport_number = "",
    passport_expiry_date = 0,
    updatedAt = 0,
    createdAt = Date.now(),
  } = req.body;
  await db.connect();

  const newModel = new Client({
    type,
    parent_id,
    instagram,
    phone,
    title,
    birth,
    gender,
    passport_number,
    passport_expiry_date,
    updatedAt,
    createdAt,
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

const getClients = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const clients = await dbClients.getClientByUserId(
      req.query.parent_id as string
    );
    return res.status(201).json(clients); 
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};
