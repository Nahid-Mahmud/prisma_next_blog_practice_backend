import { Prisma, User } from "@prisma/client";
import prisma from "../../config/db";

const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  console.log("create User");

  const res = await prisma.user.create({
    data: data,
  });
  return res;
};
const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    omit: {
      password: true,
    },
    orderBy: {
      id: "desc",
    },
    include: {
      Post: true,
    },
  });
  return users;
};

const getUsersById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
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
