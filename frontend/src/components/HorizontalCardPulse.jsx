import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography, IconButton } from "@material-tailwind/react";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { useLikePostMutation } from "../features/api/apiSlices/postApiSlice"; // Import the useLikePostMutation hook

export function HorizontalCard({ post }) {
  const [isClicked, setIsClicked] = useState(false);
  const [likePost] = useLikePostMutation(); // Hook to trigger the like post mutation
  const [dateTime, setDateTime] = useState(new Date());
  
  const [likeCount,setLikeCount]=useState(post.likesCount);
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleButtonClick = async () => {
    try {
      if (!isClicked) {
        // Liking the post
        await likePost({ postId: post._id, isLiked: true }).unwrap();
        setLikeCount(likeCount + 1); // Increase like count
      } else {
        // Disliking the post
        await likePost({ postId: post._id, isLiked: false }).unwrap();
        setLikeCount(likeCount - 1); // Decrease like count
      }
  
      setIsClicked(!isClicked); // Toggle like state after successful API call
    } catch (error) {
      console.error("Error liking/disliking post:", error);
    }
  };
  

  return (
    <div className="relative w-screen max-w-screen-xl">
      <Card className="relative w-full">
        <CardBody className="px-6 py-8 md:px-12 md:py-8">
          {/* Profile Image and Post Title */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 shrink-0 mr-3">
              {/* Placeholder for profile image */}
              <img
                className="rounded-full"
                src={post.user?.profileImage || ""} // Dynamically set the user image here
                width="40"
                height="40"
                alt="author"
              />
            </div>
            <Typography variant="h6" color="gray" className="uppercase">
              {post.user?.username || "Anonymous"}
            </Typography>
          </div>

          {/* Post Content */}
          <Typography color="gray" className="mb-8 font-normal">
            {post.content || "No content available."}
          </Typography>

          {/* Likes count */}
          <div className="flex items-center">
            <Typography color="gray" className="mr-2">
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </Typography>
          </div>
        </CardBody>
      </Card>

      {/* Transparent Button with Red Toggle */}
      <IconButton
        size="sm"
        variant="outlined"
        color={isClicked ? "red" : "gray"}
        onClick={handleButtonClick}
        className={`!absolute top-4 right-4 rounded-full transition-colors ${
          isClicked ? "border-red-500" : "border-gray-500"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      </IconButton>

      {/* Date/Time Display */}
      <div className="absolute bottom-4 right-4 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded opacity-75">
        {post.date
          ? `${formatDistanceToNowStrict(new Date(post.date))} ago`
          : "Just now"}
      </div>
    </div>
  );
}
