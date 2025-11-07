import { useState, useEffect, useCallback } from "react";
import type { FormEvent } from "react";
import { postsAPI } from "../api/posts";
import type { PostCategory, Post } from "../types/post";
import { useToast } from "../contexts/ToastContext";
import { useForbiddenWords } from "./useForbiddenWords";

interface UsePostFormProps {
  post?: Post;
  onClose: (shouldRefresh?: boolean) => void;
}

export const usePostForm = ({ post, onClose }: UsePostFormProps) => {
  const isEditMode = !!post;
  const { showSuccess, showError, showConfirm } = useToast();
  const { checkForbiddenWords } = useForbiddenWords();

  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");
  const [category, setCategory] = useState<PostCategory>(
    post?.category || "FREE"
  );
  const [tags, setTags] = useState(post?.tags.join(", ") || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setCategory(post.category);
      setTags(post.tags.join(", "));
    }
  }, [post]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const forbiddenWord = checkForbiddenWords(title + " " + body);
      if (forbiddenWord) {
        showError(`금칙어 "${forbiddenWord}"가 포함되어 있습니다.`);
        return;
      }

      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      if (isEditMode && post) {
        const originalTags = post.tags.join(", ");
        const hasChanges =
          title !== post.title ||
          body !== post.body ||
          category !== post.category ||
          tags !== originalTags;

        if (!hasChanges) {
          showError("수정사항이 없습니다.");
          return;
        }
      }

      setLoading(true);

      try {
        if (isEditMode && post) {
          await postsAPI.updatePost(post.id, {
            title,
            body,
            category,
            tags: tagsArray,
          });
          showSuccess("게시글이 수정되었습니다!");
          setTimeout(() => {
            onClose(true);
          }, 500);
        } else {
          await postsAPI.createPost({
            title,
            body,
            category,
            tags: tagsArray,
          });
          showSuccess("게시글이 작성되었습니다!");
          setTitle("");
          setBody("");
          setCategory("FREE");
          setTags("");
          setTimeout(() => {
            onClose(true);
          }, 500);
        }
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
          showError("입력 내용을 확인해주세요.");
        } else if (status === 401) {
          showError("로그인이 필요합니다.");
        } else {
          showError(
            isEditMode
              ? "게시글 수정에 실패했습니다."
              : "게시글 작성에 실패했습니다."
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [
      title,
      body,
      category,
      tags,
      isEditMode,
      post,
      checkForbiddenWords,
      showError,
      showSuccess,
      onClose,
    ]
  );

  const handleDelete = useCallback(() => {
    if (!post) return;

    showConfirm("정말 삭제하시겠습니까?", async () => {
      setLoading(true);

      try {
        await postsAPI.deletePost(post.id);
        showSuccess("게시글이 삭제되었습니다!");
        setTimeout(() => {
          onClose(true);
        }, 500);
      } catch {
        showError("게시글 삭제에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    });
  }, [post, showConfirm, showSuccess, showError, onClose]);

  return {
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
  };
};
