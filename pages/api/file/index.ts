import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbFiles } from "../../../database";
import { File, IFile } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | IFile | IFile[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getFiles(req, res);
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

  const { type = "", parent_id = "", url = "" } = req.body;
  await db.connect();

  const newModel = new File({
    type,
    parent_id,
    url,
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

const getFiles = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const files = await dbFiles.getFilesByParentIdAndType(
      req.query.parent_id as string,
      req.query.type as string
    );
    return res.status(201).json(files);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};
