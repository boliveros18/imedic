import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbComments } from "../../../database";
import { Comment, IComment } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | IComment | IComment[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getComments(req, res);
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
    user_id = "",
    description = "",
    user_tag_id = "",
    user_tag_name = "",
    comments = 0,
    likes = 0,
    createdAt = Date.now(),
    updatedAt = 0,
  } = req.body;
  await db.connect();

  const newModel = new Comment({
    type,
    parent_id,
    user_id,
    description,
    user_tag_id,
    user_tag_name,
    comments,
    likes,
    createdAt,
    updatedAt,
  });

  try {
    await newModel.save();
    const comments = await dbComments.getCommentsLengthByParentId(parent_id);
    await dbComments.updateCommentLength(comments, type, parent_id);
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

const getComments = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const comments = await dbComments.getCommentsByParentId(
      req.query.parent_id as string
    );
    return res.status(201).json(comments);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};
