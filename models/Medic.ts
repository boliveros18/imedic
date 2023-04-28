import mongoose, { Model, Schema } from "mongoose";
import { Medic } from "../interfaces";

export interface IMedic extends Medic {}

const entrySchema = new Schema({
  type: { type: String, require: true },
  parent_id: { type: String, require: true },
  certified: { type: Boolean },
  card_id: { type: String },
  to_approve: { type: Boolean },
  contract_signature: { type: String },
  available_days: { type: Array },
  curriculum: { type: String },
  qualification: { type: Number },
  comments: { type: Number },
  instagram: { type: String },
  country: { type: String },
  state: { type: String },
  province: { type: String },
  createdAt: { type: Number },
  updatedAt: { type: Number },
});

const MedicModel: Model<IMedic> =
  mongoose.models.Medic || mongoose.model("Medic", entrySchema);

export default MedicModel;
