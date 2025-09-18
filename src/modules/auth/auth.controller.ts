import { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

const googleLogin = async (req: Request, res: Response) => {
  try {
    const result = await authService.googleLogin(req.body);
    res.status(200).json({
      success: true,
      message: "Google login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Google login failed",
    });
  }
};

export const authController = { loginUser, googleLogin };
