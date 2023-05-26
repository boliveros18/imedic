import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbProducts } from "../../../database";
import { Product, IProduct } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | IProduct | IProduct[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getProducts(req, res);
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
    clinic_id = "",
    category = "",
    procedure = "",
    recovery_days = 0,
    procedure_hours = 0,
    surgical_facility = 0,
    facility_care = 0,
    medical_care = 0,
    anesthesia_fees = 0,
    medical_tests = 0,
    post_surgery_garments = 0,
    prescription_medication = 0,
    surgeon_fee = 0,
    surgeon_insurance = 0,
    additional_cost = 0,
    additional_cost_description = "",
    currency = "",
    updatedAt = 0,
    createdAt = Date.now(),
  } = req.body;
  await db.connect();

  const newModel = new Product({
    medic_id,
    clinic_id,
    category,
    procedure,
    recovery_days,
    procedure_hours,
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
    additional_cost_description,
    currency,
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

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const products = await dbProducts.getProductsByMedicId(
      req.query.medic_id as string
    );
    return res.status(201).json(products);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};
