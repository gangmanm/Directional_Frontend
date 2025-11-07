import { useState } from "react";
import * as S from "../styles/Dashboard";
import Header from "./Header";
import WritePost from "./WritePost";
import Board from "./Board";
import Chart from "./Chart";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("board");
  const [isWriteOpen, setIsWriteOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === "write") {
      setIsWriteOpen(true);
    } else {
      setActiveTab(tab);
      setIsWriteOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "board":
        return <Board onTabChange={handleTabChange} />;
      case "chart":
        return <Chart />;
      default:
        return <Board onTabChange={handleTabChange} />;
    }
  };

  return (
    <S.AppContainer>
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <S.AppMain>{renderContent()}</S.AppMain>
      {isWriteOpen && (
        <WritePost onClose={() => setIsWriteOpen(false)} />
      )}
    </S.AppContainer>
  );
};

export default Dashboard;
