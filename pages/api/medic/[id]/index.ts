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
        message: "This method in comment/[id] does not exist " + req.method,
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
      .json({ message: "There is no comment with that ID: " + id });
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
      .json({ message: "There is no comment with that ID: " + id });
  }

  const {
    certified = modelToUpdate.certified,
    card_id = modelToUpdate.card_id,
    to_approve = modelToUpdate.to_approve,
    contract_signature = modelToUpdate.contract_signature,
    available_days = modelToUpdate.available_days,
    curriculum = modelToUpdate.curriculum,
    qualification = modelToUpdate.qualification,
    comments = modelToUpdate.comments,
    instagram = modelToUpdate.instagram,
    country = modelToUpdate.country,
    state = modelToUpdate.state,
    province = modelToUpdate.province,
    updatedAt = Date.now(),
  } = req.body;

  try {
    const updatedModel = await Medic.findByIdAndUpdate(
      id,
      {
        certified,
        card_id,
        to_approve,
        contract_signature,
        available_days,
        curriculum,
        qualification,
        comments,
        instagram,
        country,
        state,
        province,
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
      .json({ message: "There is no comment with that ID: " + id });
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
