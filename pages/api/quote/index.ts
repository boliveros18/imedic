import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbQuotes } from "../../../database";
import { Quote, IQuote } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | IQuote | IQuote[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getQuotes(req, res);
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
    product_id = "",
    price = 0,
    currency = "",
    quantity = 0,
    unit = "",
    updatedAt = 0,
    createdAt = Date.now(),
  } = req.body;
  await db.connect();

  const newModel = new Quote({
    product_id,
    price,
    currency,
    quantity,
    unit,
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

const getQuotes = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const quotes = await dbQuotes.getQuotesByProductId(
      req.query.product_id as string
    );
    return res.status(201).json(quotes);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};
