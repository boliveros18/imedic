import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbProcedures } from "../../../database";
import { Procedure, IProcedure } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | IProcedure | IProcedure[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getProcedures(req, res);
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
    medic_id = "",
    product_id = "",
    product_procedure = "",
    client_id = "",
    client_name = "",
    surgical_facility = false,
    facility_care = false,
    medical_care = false,
    anesthesia_fees = false,
    medical_tests = false,
    post_surgery_garments = false,
    prescription_medication = false,
    surgeon_fee = false,
    surgeon_insurance = false,
    additional_cost = false,
    status = "Pending",
    date = 0,
    updatedAt = 0,
    createdAt = Date.now(),
  } = req.body;
  await db.connect();

  const newModel = new Procedure({
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

const getProcedures = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const procedures = await dbProcedures.getProceduresByMedicId(
      req.query.medic_id as string
    );
    return res.status(201).json(procedures);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};
