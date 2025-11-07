import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import * as S from "../styles/Dashboard";
import Header from "../components/Header";
import WritePost from "../components/WritePost";
import Board from "../components/Board";
import Chart from "../components/Chart";
import type { Post } from "../types/post";
import { postsAPI } from "../api/posts";
import { useToast } from "../contexts/ToastContext";

const Dashboard = () => {
  const { showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("board");
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>(undefined);
  const [boardKey, setBoardKey] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/chart") {
      setActiveTab("chart");
    } else if (path === "/writings" || path === "/") {
      setActiveTab("board");
    }
  }, [location.pathname]);

  const handleTabChange = (tab: string) => {
    if (tab === "write") {
      setEditingPost(undefined);
      setIsWriteOpen(true);
    } else {
      window.scrollTo(0, 0);
      setActiveTab(tab);
      setIsWriteOpen(false);
      setEditingPost(undefined);

      if (tab === "chart") {
        navigate("/chart");
      } else if (tab === "board") {
        navigate("/writings");
      }
    }
  };

  const handleEditPost = async (postId: string) => {
    setLoading(true);
    try {
      const post = await postsAPI.getPost(postId);
      setEditingPost(post);
      setIsWriteOpen(true);
    } catch (error) {
      console.error("게시글을 불러오는데 실패했습니다:", error);
      showError("게시글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleWriteClose = (shouldRefresh?: boolean) => {
    setIsWriteOpen(false);
    setEditingPost(undefined);
    if (shouldRefresh && activeTab === "board") {
      setBoardKey((prev) => prev + 1);
    }
  };

  return (
    <S.AppContainer>
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <S.AppMain>
        <Routes>
          <Route
            path="/"
            element={
              <Board
                key={boardKey}
                onTabChange={handleTabChange}
                onEditPost={handleEditPost}
              />
            }
          />
          <Route
            path="/writings"
            element={
              <Board
                key={boardKey}
                onTabChange={handleTabChange}
                onEditPost={handleEditPost}
              />
            }
          />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </S.AppMain>
      {isWriteOpen && !loading && (
        <WritePost onClose={handleWriteClose} post={editingPost} />
      )}
    </S.AppContainer>
  );
};

export default Dashboard;
