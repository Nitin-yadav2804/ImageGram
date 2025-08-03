// Here all the post related routes are present
// We look at the remaining url after /posts

import express from "express";
import { s3Uploader } from "../../config/multerConfig.js";
import { createPost, deletePost, getAllPosts, updatePost } from "../../controllers/postController.js";
import { zodPostSchema } from "../../validators/zodPostSchema.js";
import { validate } from "../../validators/zodValidator.js";

const router = express.Router();

router.post("/", s3Uploader.single("image"), validate(zodPostSchema), createPost);

router.get("/", getAllPosts);

router.delete('/:id', deletePost);

router.put('/:id', s3Uploader.single("image"), updatePost );

export default router;
