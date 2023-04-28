import mongoose, { Schema, Model} from "mongoose";
import { IUser } from "../interfaces";

export interface AUser extends IUser {}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: ["admin", "client", "medic"],
        message: "{VALUE} is a wrong value",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
