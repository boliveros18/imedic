import mongoose, { Model, Schema } from "mongoose";
import { Procedure } from "../interfaces";

export interface IProcedure extends Procedure {}

const entrySchema = new Schema({
  medic_id: { type: String, require: true },
  product_id: { type: String, require: true },
  product_procedure: { type: String, require: true },
  client_id: { type: String, require: true },
  client_name: { type: String, require: true },
  surgical_facility: { type: Boolean},
  facility_care: { type: Boolean},
  medical_care: { type: Boolean},
  anesthesia_fees: { type: Boolean},
  medical_tests: { type: Boolean},
  post_surgery_garments:{ type: Boolean},
  prescription_medication:{ type: Boolean},
  surgeon_fee: { type: Boolean},
  surgeon_insurance: { type: Boolean},
  additional_cost: { type: Boolean},
  status: { type: String, require: true },
  date: { type: Number, require: true },
  createdAt: { type: Number },
  updatedAt: { type: Number },
});

const ProcedureModel: Model<IProcedure> =
  mongoose.models.Procedure || mongoose.model("Procedure", entrySchema);

export default ProcedureModel;
