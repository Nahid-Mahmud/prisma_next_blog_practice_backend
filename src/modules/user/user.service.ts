import { Prisma, User } from "@prisma/client";
import prisma from "../../config/prisma";

const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  console.log("create User");

  const res = await prisma.user.create({
    data: data,
    omit: {
      password: false,
      isVerified: false,
    },
  });
  return res;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getUsersById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    omit: {
      isVerified: false,
    },
  });

  if (!user) {
    throw new Error("user Not Find");
  }

  return user;
};

export const userService = {
  createUser,
  getAllUsers,
  getUsersById,
};
