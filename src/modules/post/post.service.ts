import { Post, Prisma, User } from "@prisma/client";
import prisma from "../../config/prisma";

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
  const res = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
          isVerified: true,
        },
      },
    },
  });
  return res;
};

const getPostById = async (id: number) => {
  const res = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        omit: {
          password: true,
          isVerified: true,
        },
      },
    },
  });
  return res;
};

const updatePost = async (id: number, data: Prisma.PostUpdateInput) => {
  const res = await prisma.post.update({
    where: {
      id,
    },
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
  return res;
};

const deletePost = async (id: number) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });
};

export const postService = {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
};
