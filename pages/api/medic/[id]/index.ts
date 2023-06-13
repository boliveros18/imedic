import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../../database";
import { Medic, IMedic } from "../../../../models";

type Data = { message: string } | IMedic;

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
        message: "This method in medic/[id] does not exist " + req.method,
      });
  }
}

const getModel = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const modelInDB = await Medic.findById(id);
  await db.disconnect();

  if (!modelInDB) {
    return res
      .status(400)
      .json({ message: "There is no medic with that ID: " + id });
  }

  return res.status(200).json(modelInDB);
};

const updateModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const modelToUpdate = await Medic.findById(id);

  if (!modelToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no medic with that ID: " + id });
  }

  const {
    status = modelToUpdate.status,
    available_days = modelToUpdate.available_days,
    qualification = modelToUpdate.qualification,
    comments = modelToUpdate.comments,
    instagram = modelToUpdate.instagram,
    age = modelToUpdate.age,
    years_experience = modelToUpdate.years_experience,
    updatedAt = Date.now(),
  } = req.body;

  try {
    const updatedModel = await Medic.findByIdAndUpdate(
      id,
      {
        status,
        available_days,
        qualification,
        comments,
        instagram,
        age, 
        years_experience,
        updatedAt,
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
  const modelToDelete = await Medic.findById(id);

  if (!modelToDelete) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no medic with that ID: " + id });
  }

  try {
    const deleteModel = await Medic.findByIdAndDelete(id);
    await db.disconnect();
    res.status(200).json(deleteModel!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
