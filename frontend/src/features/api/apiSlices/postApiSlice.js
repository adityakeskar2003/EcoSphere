import { apiSlice } from "../apiSlice";
import { POSTS_URL } from "../endpoints"; // Define the POSTS_URL in your endpoints file, e.g., "/api/v1/posts"

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/all`,
        method: "GET",
      }),
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `${POSTS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    getPost: builder.query({
      query: ({ id }) => ({
        url: `${POSTS_URL}/${id}`,
        method: "GET",
      }),
    }),
    likePost: builder.mutation({
      query: ({ postId, isLiked }) => ({
        url: `${POSTS_URL}/like`,
        method: "POST",
        body: { postId, isLiked }, // Include both postId and isLiked flag
      }),
    }),
    
  }),
});

export const {
  useGetAllPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useLikePostMutation, // Export the useLikePostMutation hook
} = postApiSlice;
