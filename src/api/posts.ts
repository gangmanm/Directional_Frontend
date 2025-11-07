import apiClient from "../lib/api";
import type {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  PostsResponse,
} from "../types/post";

export const postsAPI = {
  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const response = await apiClient.post<Post>("/posts", data);
    return response.data;
  },

  getPosts: async (params?: {
    limit?: number;
    prevCursor?: string;
    nextCursor?: string;
    sort?: string;
    order?: string;
    category?: string;
    from?: string;
    to?: string;
    search?: string;
  }): Promise<PostsResponse> => {
    const response = await apiClient.get<PostsResponse>("/posts", { params });
    return response.data;
  },

  getPost: async (id: string): Promise<Post> => {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  },

  updatePost: async (id: string, data: UpdatePostRequest): Promise<Post> => {
    const response = await apiClient.patch<Post>(`/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: string): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};
