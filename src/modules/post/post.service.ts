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

const getAllPost = async ({
  page = 1,
  limit = 10,
  search,
  isFeatured,
  tags,
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
  tags: string[];
}) => {
  const skip = (page - 1) * limit;

  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      typeof isFeatured === "boolean" && {
        isFeatured: isFeatured,
      },
      tags && tags.length > 0 && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };

  const res = await prisma.post.findMany({
    skip: skip,
    take: limit,
    where,
  });

  const total = await prisma.post.count({
    where: where,
  });
  const totalPages = Math.ceil(total / limit);
  return {
    data: res,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

const getPostById = async (id: number) => {
  const res = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: {
        id,
      },
      data: {
        view: {
          increment: 1,
        },
      },
    });

    const res = await tx.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
    return res;
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

const getPostStats = async () => {
  return await prisma.$transaction(async (tx) => {
    return await tx.post.aggregate({
      _count: true,
      _sum: {
        view: true,
      },
      _avg: {
        view: true,
      },
      _min: {
        view: true,
      },
      _max: {
        view: true,
      },
    });
  });
};

export const postService = {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
  getPostStats,
};
