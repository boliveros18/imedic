import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

import { db } from "../../../../database";
import { Qualification, IQualification } from "../../../../models";

type Data = { message: string } | IQualification;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "The id is invalid " + id });
  }

  switch (req.method) {
    case "PUT":
      return updateModel(req, res);

    case "GET":
      return getModel(req, res);

    case "DELETE":
      return deleteModel(req, res);

    default:
      return res.status(400).json({
        message:
          "This method in qualification/[id] does not exist " + req.method,
      });
  }
}

const getModel = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const modelInDB = await Qualification.findById(id);
  await db.disconnect();

  if (!modelInDB) {
    return res
      .status(400)
      .json({ message: "There is no qualification with that ID: " + id });
  }

  return res.status(200).json(modelInDB);
};

const updateModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const modelToUpdate = await Qualification.findById(id);

  if (!modelToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no qualification with that ID: " + id });
  }

  const { stars = modelToUpdate.stars } = req.body;

  try {
    const updatedModel = await Qualification.findByIdAndUpdate(
      id,
      {
        stars,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedModel!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const modelToDelete = await Qualification.findById(id);

  if (!modelToDelete) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no qualification with that ID: " + id });
  }

  try {
    const deleteModel = await Qualification.findByIdAndDelete(id);
    await db.disconnect();
    res.status(200).json(deleteModel!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
