import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useAddPostMutation } from "../features/api/apiSlices/postApiSlice"; // Import the mutation hook
import { useDispatch } from "react-redux";
import { updateLoader } from "../features/loader/loaderSlice";

export function MessageDialog() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [addPost, { isLoading }] = useAddPostMutation(); // RTK Query mutation
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(!open);

  const validateMessage = (msg) => {
    if (!msg.trim()) {
      return "Message cannot be empty!";
    }
    if (msg.length > 250) {
      return "Message must be less than 250 characters.";
    }
    return null;
  };

  const handlePost = async () => {
    const error = validateMessage(message);
    if (error) {
      setErrors({ message: error });
      return;
    }
    setErrors({}); // Clear previous errors

    try {
      dispatch(updateLoader(40));
      console.log("Message being sent:", message);
      const response = await addPost({ message }).unwrap(); // Call the mutation
      dispatch(updateLoader(70));

      toast.success("Post added successfully!");
      console.log("Post created:", response);

      // Reset dialog and input
      setMessage("");
      setOpen(false);
    } catch (error) {
      console.error("Error posting message:", error);
      toast.error(error?.data?.error || "Failed to add the post. Please try again.");
    } finally {
      dispatch(updateLoader(100));
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} color="red" className="mt-0">
        Add Post
      </Button>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add a New Post</DialogHeader>
        <DialogBody>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            error={!!errors.message}
            className="w-full"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            color="green"
            onClick={handlePost}
            disabled={isLoading}
          >
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
