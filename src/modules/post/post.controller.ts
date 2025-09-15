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

export const postController = {
  createPost,
};
