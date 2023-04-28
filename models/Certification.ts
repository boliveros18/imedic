import mongoose, { Model, Schema } from "mongoose";
import { Certification } from "../interfaces";

export interface ICertification extends Certification {}

const entrySchema = new Schema({
  parent_id: { type: String, require: true },
  name: { type: String, require: true },
  approved: { type: Boolean },
  certificate: { type: String, require: true },
  description: { type: String, require: true },
  to_approve: { type: String },
  logo: { type: String },
});

const CertificationModel: Model<ICertification> =
  mongoose.models.Certification || mongoose.model("Certification", entrySchema);

export default CertificationModel;
