import apiClient from "../lib/api";
import type {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  PostsResponse,
} from "../types/post";

export const postsAPI = {
  /**
   * 게시글 목록 조회
   */
  getPosts: async (params?: {
    limit?: number;
    nextCursor?: string;
    prevCursor?: string;
    sort?: "createdAt" | "title";
    order?: "asc" | "desc";
    category?: "NOTICE" | "QNA" | "FREE";
    search?: string;
  }): Promise<PostsResponse> => {
    const response = await apiClient.get<PostsResponse>("/posts", { params });
    return response.data;
  },

  /**
   * 게시글 상세 조회
   */
  getPost: async (id: string): Promise<Post> => {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  },

  /**
   * 게시글 작성
   */
  createPost: async (data: CreatePostRequest): Promise<Post> => {
    const response = await apiClient.post<Post>("/posts", data);
    return response.data;
  },

  /**
   * 게시글 수정
   */
  updatePost: async (id: string, data: UpdatePostRequest): Promise<Post> => {
    const response = await apiClient.put<Post>(`/posts/${id}`, data);
    return response.data;
  },

  /**
   * 게시글 삭제
   */
  deletePost: async (id: string): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};
