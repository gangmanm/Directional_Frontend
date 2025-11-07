import { useState, useEffect, useRef, useCallback } from "react";
import { postsAPI } from "../api/posts";
import type { Post } from "../types/post";
import * as S from "../styles/Board";

interface BoardProps {
  onTabChange: (tab: string) => void;
}

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "NOTICE":
      return "공지";
    case "QNA":
      return "질문";
    case "FREE":
      return "자유";
    default:
      return category;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  return date.toLocaleDateString("ko-KR");
};

const Board = ({ onTabChange }: BoardProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState<Set<string>>(new Set());
  const observerRef = useRef<HTMLDivElement>(null);
  const postRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const fetchPosts = async (cursor?: string, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError("");

    try {
      const params: {
        limit: number;
        sort: string;
        order: string;
        nextCursor?: string;
      } = {
        limit: 10,
        sort: "createdAt",
        order: "desc",
      };

      if (cursor) {
        params.nextCursor = cursor;
      }

      const response = await postsAPI.getPosts(params);

      if (append) {
        setPosts((prev) => [...prev, ...response.items]);
      } else {
        setPosts(response.items);
      }

      setNextCursor(response.nextCursor || null);
      setHasMore(!!response.nextCursor);
    } catch (err) {
      setError("게시글을 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = useCallback(() => {
    if (nextCursor && !loadingMore && hasMore) {
      fetchPosts(nextCursor, true);
    }
  }, [nextCursor, loadingMore, hasMore]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [loadMore, hasMore, loadingMore]);

  useEffect(() => {
    const postObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const postId = entry.target.getAttribute("data-post-id");
          if (postId) {
            if (entry.isIntersecting) {
              setVisiblePosts((prev) => new Set(prev).add(postId));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    postRefs.current.forEach((element) => {
      if (element) {
        postObserver.observe(element);
      }
    });

    return () => {
      postObserver.disconnect();
    };
  }, [posts]);

  if (loading) {
    return (
      <S.Container>
        <S.TitleRow>
          <S.Title>글 목록</S.Title>
          <S.WriteButton onClick={() => onTabChange("write")}>
            글 작성하기
          </S.WriteButton>
        </S.TitleRow>
        <S.LoadingMessage>게시글을 불러오는 중...</S.LoadingMessage>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <S.TitleRow>
          <S.Title>글 목록</S.Title>
          <S.WriteButton onClick={() => onTabChange("write")}>
            글 작성하기
          </S.WriteButton>
        </S.TitleRow>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.TitleRow>
        <S.Title>글 목록</S.Title>
        <S.WriteButton onClick={() => onTabChange("write")}>
          글 작성하기
        </S.WriteButton>
      </S.TitleRow>

      {posts.length === 0 ? (
        <S.EmptyMessage>아직 게시글이 없습니다.</S.EmptyMessage>
      ) : (
        <>
          <S.PostList>
            {posts.map((post) => (
              <S.PostItem
                key={post.id}
                data-post-id={post.id}
                ref={(el) => {
                  if (el) {
                    postRefs.current.set(post.id, el);
                  }
                }}
                $isVisible={visiblePosts.has(post.id)}
              >
                <S.PostHeader>
                  <S.PostTitle>{post.title}</S.PostTitle>
                  <S.CategoryBadge $category={post.category}>
                    {getCategoryLabel(post.category)}
                  </S.CategoryBadge>
                </S.PostHeader>
                <S.PostBody>{post.body}</S.PostBody>
                <S.PostFooter>
                  <S.TagList>
                    {post.tags.map((tag, index) => (
                      <S.Tag key={index}>#{tag}</S.Tag>
                    ))}
                  </S.TagList>
                  <S.PostDate>{formatDate(post.createdAt)}</S.PostDate>
                </S.PostFooter>
              </S.PostItem>
            ))}
          </S.PostList>

          {loadingMore && (
            <S.LoadingMoreMessage>
              추가 게시글을 불러오는 중...
            </S.LoadingMoreMessage>
          )}

          {hasMore && <S.ScrollObserver ref={observerRef} />}

          {!hasMore && posts.length > 0 && (
            <S.LoadingMoreMessage>
              모든 게시글을 불러왔습니다.
            </S.LoadingMoreMessage>
          )}
        </>
      )}
    </S.Container>
  );
};

export default Board;
