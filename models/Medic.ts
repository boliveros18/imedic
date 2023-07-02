import mongoose, { Model, Schema } from "mongoose";
import { Medic } from "../interfaces";

export interface IMedic extends Medic {}

const entrySchema = new Schema({
  type: { type: String, require: true },
  parent_id: { type: String, require: true },
  status: { type: String },
  availables_dates: { type: Array},
  qualification: { type: Number },
  comments: { type: Number },
  likes: { type: Number },
  instagram: { type: String },
  age: { type: Number},
  years_experience:{ type: Number},
  createdAt: { type: Number },
  updatedAt: { type: Number },
});

const MedicModel: Model<IMedic> =
  mongoose.models.Medic || mongoose.model("Medic", entrySchema);

export default MedicModel;
