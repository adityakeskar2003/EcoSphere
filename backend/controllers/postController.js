import Post from "../models/postModel.js";
import asyncHandler from '../middlewares/asyncHandler.js';
import User from "../models/userModel.js";
import queryHuggingFace from "../utils/postUtils.js";

// In utils/similarityUtils.js
export const calculateCosineSimilarity = (vector1, vector2) => {
  const dotProduct = vector1.reduce((acc, value, index) => acc + value * vector2[index], 0);
  const magnitude1 = Math.sqrt(vector1.reduce((acc, value) => acc + value * value, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((acc, value) => acc + value * value, 0));
  return dotProduct / (magnitude1 * magnitude2); // Cosine similarity formula
};


// Controller to get all posts
export const getAllPosts = async (req, res) => {
  try {
    const userEmail = req.userEmail;// Get the userId from the authenticated request (assuming user is authenticated)
    
    if (!userEmail) {
      return res.status(400).json({ error: "Missing Message or userEmail" });
    }
    // Fetch the user document to get their vector
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userVector = user.vector; // Get the user's vector from the user document
    // Fetch all posts and populate user data (username, email)
    const posts = await Post.find()
      .populate("user", "username email")
      .exec();

    // Calculate similarity scores and add them to each post
    const postsWithScores = posts.map((post) => {
      const postVector = post.vector; // Post vector
      const score = calculateCosineSimilarity(userVector, postVector); // Calculate cosine similarity between user vector and post vector
      return { post, score }; // Return post along with its score
    });

    // Sort the posts based on the similarity score in descending order
    postsWithScores.sort((a, b) => b.score - a.score);

    // Extract the posts from the sorted array
    const sortedPosts = postsWithScores.map((item) => item.post);
    // Return the sorted posts
    res.status(200).json(sortedPosts);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};



export const createPost = asyncHandler(async (req, res) => {
  try {
    const { message } = req.body;
    const userEmail = req.userEmail;

    // Ensure message and user are present
    if (!message || !userEmail) {
      return res.status(400).json({ error: "Missing message or userEmail" });
    }

    // Fetch the user from the database using the email or userId
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch vector from Hugging Face model
    const analysisResult = await queryHuggingFace(message);
    
    // Extract only the scores from the result
    const vector = analysisResult.map((item) => item.score);  // Extract the scores

    // Sentiment analysis (if needed)
    let sentiment = "neutral";  // Default value
    // Optionally, you could analyze sentiment using a function here
    // Example: sentiment = analyzeSentiment(message);

    // Create the new post
    const newPost = new Post({
      postId: new Date().toISOString(),
      user: user._id,
      content: message,
      vector, // The vector generated from message (only the scores)
      sentiment, // The sentiment of the message
      likesCount: 0,
      date: new Date(),
    });

    // Save the post to the database
    await newPost.save();

    // Respond with the created post
    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error in createPost:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Controller to handle liking a post and updating user vector
export const likePost = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.body;  // Get the postId from the request body
    const userEmail = req.userEmail; // Assuming user is authenticated
    const isLiked = req.body.isLiked; // Boolean indicating if the post is liked or disliked

    if (!postId || !userEmail) {
      return res.status(400).json({ error: "Missing postId or userEmail" });
    }

    // Fetch the post and user from the database
    const post = await Post.findById(postId);
    const user = await User.findOne({ email: userEmail });

    if (!post || !user) {
      return res.status(404).json({ error: "Post or User not found" });
    }

    // Fetch the current vector of the user
    let userVector = user.vector;
    
    // Extract the class of the post (for example, it's stored in post.vector)
    const postVector = post.vector;

    // Example update logic: Update the user’s vector based on like or dislike
    const updatedUserVector = userVector.map((value, index) => {
      return value + (isLiked ? 1 : -1) * postVector[index] * 2;  // Add or subtract based on like/dislike
    });

    // Update the user's vector in the database
    user.vector = updatedUserVector;
    await user.save();

    // Increment or decrement the post's like count based on the action
    if (isLiked) {
      post.likesCount += 1;
    } else {
      post.likesCount -= 1;
    }
    await post.save();

    res.status(200).json({
      message: isLiked ? "Post liked successfully and user vector updated" : "Post disliked and user vector updated"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to like or dislike post and update vector" });
  }
});
