import mongoose, { Model, Schema } from "mongoose";
import { Certification } from "../interfaces";

export interface ICertification extends Certification {}

const entrySchema = new Schema({
  clinic_id: { type: String, require: true },
  name: { type: String, require: true },
  description: { type: String, require: true },
  logo_link: { type: String },
});

const CertificationModel: Model<ICertification> =
  mongoose.models.Certification || mongoose.model("Certification", entrySchema);

export default CertificationModel;
