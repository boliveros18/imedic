import mongoose, { Model, Schema } from "mongoose";
import { Product } from "../interfaces";

export interface IProduct extends Product {}

const entrySchema = new Schema({
  type: { type: String, require: true },
  medic_id: { type: String, require: true },
  clinic_id: { type: String },
  category: { type: String, require: true },
  procedure: { type: String, require: true },
  recovery_days: { type: Number, require: true },
  procedure_hours: { type: Number, require: true },
  surgical_facility: { type: Number },
  facility_care: { type: Number },
  medical_care: { type: Number },
  anesthesia_fees: { type: Number },
  medical_tests: { type: Number },
  post_surgery_garments: { type: Number },
  prescription_medication: { type: Number },
  surgeon_fee: { type: Number },
  surgeon_insurance: { type: Number },
  additional_cost: { type: Number },
  additional_cost_description: { type: String },
  currency: { type: String },
  qualification: { type: Number },
  comments: { type: Number },
  likes: { type: Number },
  createdAt: { type: Number },
  updatedAt: { type: Number },
});

const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model("Product", entrySchema);

export default ProductModel;
