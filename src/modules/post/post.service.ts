import { Post, Prisma, User } from "@prisma/client";
import prisma from "../../config/db";

const createPost = async (data: Prisma.PostCreateInput): Promise<Post> => {
  const response = await prisma.post.create({
    data: data,
    include: {
      author: {
        omit: {
          password: true,
          isVerified: true,
        },
      },
    },
  });
  return response;
};

const getAllPost = async () => {
  const res = await prisma.post.findMany();
  return res;
};

const getPostById = async (id: number) => {
  const res = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return res;
};

const updatePost = async (id: number, data: User) => {
  const res = await prisma.post.update({
    where: {
      id,
    },
    data: data,
  });
};

const deletePost = async (id: number) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });
};

export const postService = { createPost };
