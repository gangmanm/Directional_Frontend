import { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("board");
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>(undefined);
  const [boardKey, setBoardKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === "write") {
      setEditingPost(undefined);
      setIsWriteOpen(true);
    } else {
      window.scrollTo(0, 0);
      setActiveTab(tab);
      setIsWriteOpen(false);
      setEditingPost(undefined);
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

  const renderContent = () => {
    switch (activeTab) {
      case "board":
        return (
          <Board
            key={boardKey}
            onTabChange={handleTabChange}
            onEditPost={handleEditPost}
          />
        );
      case "chart":
        return <Chart />;
      default:
        return (
          <Board
            key={boardKey}
            onTabChange={handleTabChange}
            onEditPost={handleEditPost}
          />
        );
    }
  };

  return (
    <S.AppContainer>
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <S.AppMain>{renderContent()}</S.AppMain>
      {isWriteOpen && !loading && (
        <WritePost onClose={handleWriteClose} post={editingPost} />
      )}
    </S.AppContainer>
  );
};

export default Dashboard;
