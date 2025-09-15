import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  // console.log("crate user controller");
  const response = await userService.createUser(data);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    data: response,
    message: "User created Successfully",
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const users = await userService.getAllUsers();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    data: users,
    message: "Users fetched successfully",
  });
});

const getUsersById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = await userService.getUsersById(Number(id));
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    data: user,
    message: "User fetched successfully",
  });
});

export const userController = {
  createUser,
  getAllUsers,
  getUsersById,
};
