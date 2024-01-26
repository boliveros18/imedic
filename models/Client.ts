import mongoose, { Model, Schema } from "mongoose";
import { Client } from "../interfaces";

export interface IClient extends Client {}

const entrySchema = new Schema({
  type: { type: String, require: true },
  parent_id: { type: String, require: true },
  instagram: { type: String },
  phone: { type: String},
  title: { type: String },
  birth: { type: Number },
  gender: { type: String },
  passport_number: { type: String },
  passport_expiry_date:{ type: Number},
  createdAt: { type: Number },
  updatedAt: { type: Number },
});

const ClientModel: Model<IClient> =
  mongoose.models.Client || mongoose.model("Client", entrySchema);

export default ClientModel;
