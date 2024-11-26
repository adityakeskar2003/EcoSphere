import { Router } from "express";
import {
    getAllPosts,
    createPost
} from "../controllers/postController.js";
import authenticateUser from "../middlewares/authenticateUser.js";
const router = Router();

// Route to get all posts for the authenticated user
//router.get("/", getPosts);

// Route to create a new post
router.route("/add").post(authenticateUser,createPost);

// Route to get all posts (global view)
router.get("/all", getAllPosts);

// Route to update a specific post by ID
//router.put("/:id", updatePost);

// Route to delete a specific post by ID
//router.delete("/:id", deletePost);

export default router;
