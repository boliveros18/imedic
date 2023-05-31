import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../../database";
import { Procedure, IProcedure } from "../../../../models";

type Data = { message: string } | IProcedure;

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
        message: "This method in procedure/[id] does not exist " + req.method,
      });
  }
}

const getModel = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const modelInDB = await Procedure.findById(id);
  await db.disconnect();

  if (!modelInDB) {
    return res
      .status(400)
      .json({ message: "There is no procedure with that ID: " + id });
  }

  return res.status(200).json(modelInDB);
};

const updateModel = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const modelToUpdate = await Procedure.findById(id);

  if (!modelToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no procedure with that ID: " + id });
  }

  const {
    medic_id = modelToUpdate.medic_id,
    product_id = modelToUpdate.product_id,
    product_procedure = modelToUpdate.product_procedure,
    client_id = modelToUpdate.client_id,
    client_name = modelToUpdate.client_name,
    surgical_facility = modelToUpdate.surgical_facility,
    facility_care = modelToUpdate.facility_care,
    medical_care = modelToUpdate.medical_care,
    anesthesia_fees = modelToUpdate.anesthesia_fees,
    medical_tests = modelToUpdate.medical_tests,
    post_surgery_garments = modelToUpdate.post_surgery_garments,
    prescription_medication = modelToUpdate.prescription_medication,
    surgeon_fee = modelToUpdate.surgeon_fee,
    surgeon_insurance = modelToUpdate.surgeon_insurance,
    additional_cost = modelToUpdate.additional_cost,
    status = modelToUpdate.status,
    date = modelToUpdate.date,
    updatedAt = Date.now(),
  } = req.body;

  try {
    const updatedModel = await Procedure.findByIdAndUpdate(
      id,
      {
        medic_id,
        product_id,
        product_procedure,
        client_id,
        client_name,
        surgical_facility,
        facility_care,
        medical_care,
        anesthesia_fees,
        medical_tests,
        post_surgery_garments,
        prescription_medication,
        surgeon_fee,
        surgeon_insurance,
        additional_cost,
        status,
        date,
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

  const modelToDelete = await Procedure.findById(id);

  if (!modelToDelete) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "There is no procedure with that ID: " + id });
  }

  try {
    const deleteModel = await Procedure.findByIdAndDelete(id);
    await db.disconnect();
    res.status(200).json(deleteModel!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
