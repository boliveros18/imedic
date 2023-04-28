import bcrypt from "bcryptjs";

interface SeedData {
  users: SeedUser[];
}

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
}


export const seedData: SeedData = {
  users: [
    {
      name: "Bresneth Oliveros",
      email: "boliveros@google.com",
      password: bcrypt.hashSync("123456"),
      role: "admin",
    },
    {
      name: "Eduardo Rios",
      email: "eduardo@google.com",
      password: bcrypt.hashSync("123456"),
      role: "client",
    },
  ]
};
