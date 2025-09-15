import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const response = await postService.createPost(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Post Created successfully",
    data: response,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const posts = await postService.getAllPost();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Posts fetched successfully",
    data: posts,
  });
});

const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const post = await postService.getPostById(Number(id));
  if (!post) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "Post not found",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Post fetched successfully",
    data: post,
  });
});

const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const response = await postService.updatePost(Number(id), req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Post updated successfully",
    data: response,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await postService.deletePost(Number(id));
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Post deleted successfully",
    data: null,
  });
});

export const postController = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
