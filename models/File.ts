import mongoose, { Model, Schema } from "mongoose";
import { File } from "../interfaces";

export interface IFile extends File {}

const entrySchema = new Schema({
  type: { type: String, require: true },
  parent_id: { type: String, require: true },
  status: { type: String },
  url: { type: String, require: true },
});

const FileModel: Model<IFile> =
  mongoose.models.File || mongoose.model("File", entrySchema);

export default FileModel;
