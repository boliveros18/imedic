import type { NextApiRequest, NextApiResponse } from "next";
import { db, dbCalendars } from "../../../database";
import { Calendar, ICalendar } from "../../../models";
import { getSession } from "next-auth/react";

type Data = { message: string } | ICalendar | ICalendar[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createModel(req, res);
    case "GET":
      return getCalendar(req, res);
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
    procedures_ids = "",
    availables_dates = [],
    updatedAt = Date.now(),
    createdAt = Date.now(),
  } = req.body;
  await db.connect();

  const newModel = new Calendar({
    medic_id,
    procedures_ids,
    availables_dates,
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

const getCalendar = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const calendar = await dbCalendars.getCalendarByMedicId(
      req.query.medic_id as string
    );
    return res.status(201).json(calendar);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Check server logs",
    });
  }
  return;
};
