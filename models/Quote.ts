import mongoose, { Model, Schema } from "mongoose";
import { Quote } from "../interfaces";

export interface IQuote extends Quote {}

const entrySchema = new Schema({
  medic_id: { type: String, require: true },
  product_id: { type: String, require: true },
  price: { type: Number, require: true },
  currency: { type: String, require: true },
  quantity: { type: Number, require: true },
  unit: { type: String, require: true },
  createdAt: { type: Number },
  updatedAt: { type: Number }
});

const QuoteModel: Model<IQuote> =
  mongoose.models.Quote || mongoose.model("Quote", entrySchema);

export default QuoteModel;
