import { Prisma, User } from "@prisma/client";
import prisma from "../../config/db";

const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  console.log("create User");

  const res = await prisma.user.create({
    data: data,
  });
  return res;
};

export const userService = {
  createUser,
};
