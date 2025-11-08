import { useState } from "react";
import type { Post, PostCategory } from "../types/post";
import * as S from "../styles/WritePost";
import { X, Minus, Trash2, Check, Edit, ArrowLeft } from "lucide-react";
import Dropdown from "./Dropdown";
import { usePostForm } from "../hooks/usePostForm";

interface WritePostProps {
  onClose: (shouldRefresh?: boolean) => void;
  post?: Post;
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
  return date.toLocaleString("ko-KR");
};

const WritePost = ({ onClose, post }: WritePostProps) => {
  const {
    isEditMode,
    title,
    setTitle,
    body,
    setBody,
    category,
    setCategory,
    tags,
    setTags,
    loading,
    handleSubmit,
    handleDelete,
  } = usePostForm({ post, onClose });

  const [isMinimized, setIsMinimized] = useState(false);
  const [isViewMode, setIsViewMode] = useState(!!post);

  const handleSubmitClick = () => {
    const form = document.getElementById("post-form") as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <S.FloatingContainer $isMinimized={isMinimized}>
      <S.FloatingHeader>
        <S.FloatingTitle>
          {isViewMode
            ? "글 상세보기"
            : isEditMode
            ? "글 수정하기"
            : "새 글 작성"}
        </S.FloatingTitle>
        <S.FloatingActions>
          {isViewMode && isEditMode && (
            <>
              <S.HeaderEditButton
                type="button"
                onClick={() => setIsViewMode(false)}
              >
                <Edit size={16} />
              </S.HeaderEditButton>
              <S.HeaderDeleteButton
                type="button"
                onClick={handleDelete}
                disabled={loading}
              >
                <Trash2 size={16} />
              </S.HeaderDeleteButton>
            </>
          )}
          {!isViewMode && isEditMode && (
            <S.HeaderBackButton
              type="button"
              onClick={() => setIsViewMode(true)}
              title="조회 모드로 돌아가기"
            >
              <ArrowLeft size={16} />
            </S.HeaderBackButton>
          )}
          {!isViewMode && (
            <S.HeaderSubmitButton
              type="button"
              onClick={handleSubmitClick}
              disabled={loading}
              title={isEditMode ? "게시글 수정" : "게시글 작성"}
            >
              <Check size={16} />
            </S.HeaderSubmitButton>
          )}
          <S.IconButton onClick={() => setIsMinimized(!isMinimized)}>
            <Minus size={16} />
          </S.IconButton>
          <S.IconButton onClick={() => onClose()}>
            <X size={16} />
          </S.IconButton>
        </S.FloatingActions>
      </S.FloatingHeader>
      {!isMinimized && (
        <S.FloatingContent>
          {isViewMode ? (
            <S.ViewContent>
              <S.ViewHeader>
                <S.ViewTitle>{post?.title}</S.ViewTitle>
                <S.ViewCategoryBadge $category={post?.category || ""}>
                  {getCategoryLabel(post?.category || "")}
                </S.ViewCategoryBadge>
              </S.ViewHeader>
              <S.ViewInfo>
                <S.ViewAuthor>작성자: {post?.userId}</S.ViewAuthor>
                <S.ViewDate>{formatDate(post?.createdAt || "")}</S.ViewDate>
              </S.ViewInfo>
              {post?.tags && post.tags.length > 0 && (
                <S.ViewTagList>
                  {post.tags.map((tag, index) => (
                    <S.ViewTag key={index}>#{tag}</S.ViewTag>
                  ))}
                </S.ViewTagList>
              )}
              <S.ViewBody>{post?.body}</S.ViewBody>
            </S.ViewContent>
          ) : (
            <S.Form id="post-form" onSubmit={handleSubmit}>
              <S.FormGroup>
                <S.Label htmlFor="title">제목</S.Label>
                <S.Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                  required
                  disabled={loading}
                />
              </S.FormGroup>

              <S.FormGroup>
                <Dropdown
                  label="카테고리"
                  value={category}
                  onChange={(value) => setCategory(value as PostCategory)}
                  disabled={loading}
                  options={[
                    { value: "FREE", label: "자유" },
                    { value: "NOTICE", label: "공지" },
                    { value: "QNA", label: "질문" },
                  ]}
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="tags">태그</S.Label>
                <S.Input
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="태그를 쉼표로 구분하여 입력하세요 (예: react, typescript)"
                  disabled={loading}
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="body">내용</S.Label>
                <S.Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="내용을 입력하세요"
                  rows={10}
                  required
                  disabled={loading}
                />
              </S.FormGroup>
            </S.Form>
          )}
        </S.FloatingContent>
      )}
    </S.FloatingContainer>
  );
};

export default WritePost;
