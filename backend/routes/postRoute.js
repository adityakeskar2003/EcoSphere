import { Router } from "express";
import {
    getAllPosts,
    createPost,
    likePost
} from "../controllers/postController.js";
import authenticateUser from "../middlewares/authenticateUser.js";
const router = Router();

// Route to get all posts for the authenticated user
//router.get("/", getPosts);

// Route to create a new post
router.route("/add").post(authenticateUser,createPost);

// Route to get all posts (global view)

router.route("/all").get(authenticateUser,getAllPosts);
// Route to update a specific post by ID
//router.put("/:id", updatePost);
// Define the route to like a post
router.route("/like").post(authenticateUser, likePost);

// Route to delete a specific post by ID
//router.delete("/:id", deletePost);

export default router;
