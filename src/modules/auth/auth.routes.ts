import { Router } from "express";
import { authController } from "./auth.controller";

const authRoutes = Router();

authRoutes.post("/login", authController.loginUser);
authRoutes.post("/google-login", authController.googleLogin);

export { authRoutes };
