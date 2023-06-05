import mongoose, { Model, Schema } from "mongoose";
import { Degree } from "../interfaces";

export interface IDegree extends Degree {}

const entrySchema = new Schema({
  medic_id: { type: String, require: true },
  name: { type: String, require: true },
  university: { type: String, require: true },
  file_id: { type: String, require: true },
  level: { type: String, require: true },
  certificated: { type: Boolean },
  to_approve: { type: Boolean },
  createdAt: { type: Number },
  updatedAt: { type: Number },
});

const DegreeModel: Model<IDegree> =
  mongoose.models.Degree || mongoose.model("Degree", entrySchema);

export default DegreeModel;
