import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/", userController.createUser);
router.get("/all", userController.getAllUsers);
router.get("/:id", userController.getUsersById);

export const UserRoutes = router;
