import bcrypt from "bcryptjs";
import modelUser from "../models/User";
import { db } from "./";
import { User } from "next-auth";
import { IUser } from "../interfaces";
import { Clinic, Degree, File, Medic, Procedure, Product, Quote } from "../models";

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await modelUser.findOne({ email });
  await db.disconnect();

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { role, name, id } = user;

  return {
    id,
    email: email.toLocaleLowerCase(),
    role,
    name,
  } as User;
};

export const oAUthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await modelUser.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { id, name, email, role } = user;
    return { id, name, email, role } as User;
  }

  const newUser = new modelUser({
    email: oAuthEmail,
    name: oAuthName,
    password: "@",
    role: "",
  });
  await newUser.save();
  await db.disconnect();

  const { id, name, email, role } = newUser;
  return { id, name, email, role };
};

export const getUsersbyEmail = async (email: string): Promise<IUser> => {
  await db.connect();
  const user: IUser = await modelUser
    .find({ email: email }, { name: 1, role: 1 })
    .lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(user));
};

export const getUsersbyId = async (
  _id: string | string[] | undefined
): Promise<IUser[] | []> => {
  await db.connect();

  const users = await modelUser
    .find({ _id: _id }, { name: 1, role: 1, email: 1 })
    .lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(users));
};

export const deleteChildren = async (id: string | string [] | undefined) => {
  await db.connect();
  const params = id ? { parent_id : id } :{}
  const medic = await Medic.find(params).lean();
  const medicToDelete = await Medic.findByIdAndDelete(medic[0]._id);
  if(medicToDelete){
    await Clinic.deleteMany({ medic_id: medic[0]._id });
    await Degree.deleteMany({ medic_id: medic[0]._id });
    await Quote.deleteMany({ medic_id: medic[0]._id });
    await Product.deleteMany({ medic_id: medic[0]._id });
    await Procedure.deleteMany({ medic_id: medic[0]._id });
    await File.deleteMany({ medic_id: medic[0]._id, parent_id: medic[0].parent_id });
  }
  await db.disconnect();
};
