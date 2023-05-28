import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

import { db } from "../../../../database";
import { Degree, IDegree } from "../../../../models";

type Data = { message: string } | IDegree;

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
      return updateDegree(req, res);

    case "GET":
      return getDegree(req, res);

    case "DELETE":
      return deleteDegree(req, res);

    default:
      return res.status(400).json({
        message: "This method in clinic/[id] does not exist " + req.method,
      });
  }
}

const getDegree = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const degreeInDB = await Degree.findById(id);
  await db.disconnect();

  if (!degreeInDB) {
    return res
      .status(400)
      .json({ message: "There is no degree with that ID: " + id });
  }

  return res.status(200).json(degreeInDB);
};

const updateDegree = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const degreeToUpdate = await Degree.findById(id);

  if (!degreeToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no degree with that ID: " + id });
  }

  const {
    name = degreeToUpdate.name,
    university = degreeToUpdate.university,
    file_id = degreeToUpdate.file_id,
    certificated = degreeToUpdate.certificated,
    to_approve = degreeToUpdate.to_approve,
    updatedAt = Date.now(),
  } = req.body;

  try {
    const updatedDegree = await Degree.findByIdAndUpdate(
      id,
      {
        name,
        university,
        file_id,
        certificated,
        to_approve,
        updatedAt,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedDegree!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteDegree = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const degreeToDelete = await Degree.findById(id);

  if (!degreeToDelete) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no degree with that ID: " + id });
  }
  try {
    const deleteDegree = await Degree.findByIdAndDelete(id);
    await db.disconnect();
    res.status(200).json(deleteDegree!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
