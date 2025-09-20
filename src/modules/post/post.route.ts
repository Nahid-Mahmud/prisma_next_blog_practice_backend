import { Router } from "express";
import { postController } from "./post.controller";

const router = Router();

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.get("/stats", postController.getPostStats);

export const postRoutes = router;
