import mongoose, { Model, Schema } from "mongoose";
import { Calendar } from "../interfaces";

export interface ICalendar extends Calendar {}

const entrySchema = new Schema({
  medic_id: { type: String, require: true },
  procedures_ids: { type: [String] },
  availables_dates: { type: [], require: true },
  createdAt: { type: Number },
  updatedAt: { type: Number },
});

const CalendarModel: Model<ICalendar> =
  mongoose.models.Calendar || mongoose.model("Calendar", entrySchema);

export default CalendarModel;
