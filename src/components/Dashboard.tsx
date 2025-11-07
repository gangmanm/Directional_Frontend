import { useState } from "react";
import * as S from "../styles/Dashboard";
import Header from "./Header";
import WritePost from "./WritePost";
import Board from "./Board";
import Chart from "./Chart";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("board");
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [boardKey, setBoardKey] = useState(0);

  const handleTabChange = (tab: string) => {
    if (tab === "write") {
      setIsWriteOpen(true);
    } else {
      window.scrollTo(0, 0);
      setActiveTab(tab);
      setIsWriteOpen(false);
    }
  };

  const handleWriteClose = (shouldRefresh?: boolean) => {
    setIsWriteOpen(false);
    if (shouldRefresh && activeTab === "board") {
      setBoardKey((prev) => prev + 1);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "board":
        return <Board key={boardKey} onTabChange={handleTabChange} />;
      case "chart":
        return <Chart />;
      default:
        return <Board key={boardKey} onTabChange={handleTabChange} />;
    }
  };

  return (
    <S.AppContainer>
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <S.AppMain>{renderContent()}</S.AppMain>
      {isWriteOpen && <WritePost onClose={handleWriteClose} />}
    </S.AppContainer>
  );
};

export default Dashboard;
