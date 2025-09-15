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

export const userController = {
  createUser,
};
