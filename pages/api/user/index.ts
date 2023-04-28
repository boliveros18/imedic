import type { NextApiRequest, NextApiResponse } from "next";
import { dbUsers } from "../../../database";
import { AUser } from "../../../models";


type Data = { message: string } | AUser | AUser[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getUsersByEmail(req, res);
    default:
      return res.status(400).json({ message: "The endpoint does not exist" });
  }
}

const getUsersByEmail = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const users = await dbUsers.getUsersbyEmail(
      req.query.email as string
    );
    return res.status(201).json(users);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};
