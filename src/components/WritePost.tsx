import { useState } from "react";
import type { FormEvent } from "react";
import { postsAPI } from "../api/posts";
import type { PostCategory } from "../types/post";
import * as S from "../styles/WritePost";
import { X, Minus } from "lucide-react";

interface WritePostProps {
  onClose: () => void;
}

const WritePost = ({ onClose }: WritePostProps) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<PostCategory>("FREE");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      await postsAPI.createPost({
        title,
        body,
        category,
        tags: tagsArray,
      });

      setSuccess(true);
      setTitle("");
      setBody("");
      setCategory("FREE");
      setTags("");

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      const errorObj = err as {
        response?: {
          data?: { message?: string; error?: string };
          status?: number;
        };
        message?: string;
      };

      const status = errorObj.response?.status;

      if (status === 400) {
        setError("입력 내용을 확인해주세요.");
      } else if (status === 401) {
        setError("로그인이 필요합니다.");
      } else {
        setError("게시글 작성에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <S.FloatingContainer $isMinimized={isMinimized}>
      <S.FloatingHeader>
        <S.FloatingTitle>새 글 작성</S.FloatingTitle>
        <S.FloatingActions>
          <S.IconButton onClick={() => setIsMinimized(!isMinimized)}>
            <Minus size={16} />
          </S.IconButton>
          <S.IconButton onClick={onClose}>
            <X size={16} />
          </S.IconButton>
        </S.FloatingActions>
      </S.FloatingHeader>
      {!isMinimized && (
        <S.FloatingContent>
          <S.Form onSubmit={handleSubmit}>
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
          <S.Label htmlFor="category">카테고리</S.Label>
          <S.Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as PostCategory)}
            disabled={loading}
          >
            <option value="FREE">자유</option>
            <option value="NOTICE">공지</option>
            <option value="QNA">질문</option>
          </S.Select>
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

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        {success && (
          <S.SuccessMessage>게시글이 작성되었습니다!</S.SuccessMessage>
        )}

        <S.SubmitButton type="submit" disabled={loading}>
          {loading ? "작성 중..." : "게시글 작성"}
        </S.SubmitButton>
      </S.Form>
        </S.FloatingContent>
      )}
    </S.FloatingContainer>
  );
};

export default WritePost;
