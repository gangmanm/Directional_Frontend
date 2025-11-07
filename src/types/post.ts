export type PostCategory = "NOTICE" | "QNA" | "FREE";

export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: PostCategory;
  tags: string[];
  createdAt: string;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  category: PostCategory;
  tags: string[];
}

export interface UpdatePostRequest {
  title?: string;
  body?: string;
  category?: PostCategory;
  tags?: string[];
}

export interface PostsResponse {
  items: Post[];
  nextCursor: string;
  prevCursor: string;
}
