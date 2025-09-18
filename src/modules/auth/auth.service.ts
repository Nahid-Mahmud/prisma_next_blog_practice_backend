import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await prisma.user.findUnique({
    where: { email },
    omit: {
      password: false,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.password) {
    throw new Error("User has no password set");
  }

  // Here you would normally check the password with a hashing function
  if (user.password !== password) {
    throw new Error("Invalid password");
  }

  return { id: user.id, email: user.email, name: user.name };
};

const googleLogin = async (payload: Prisma.UserCreateInput) => {
  let user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: payload,
    });
  }
};

export const authService = {
  loginUser,
  googleLogin,
};
