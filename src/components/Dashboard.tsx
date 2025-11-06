import { useState } from "react";
import * as S from "../styles/Dashboard";
import Header from "./Header";
import WritePost from "./WritePost";
import Board from "./Board";
import Chart from "./Chart";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("board");

  const renderContent = () => {
    switch (activeTab) {
      case "write":
        return <WritePost />;
      case "board":
        return <Board />;
      case "chart":
        return <Chart />;
      default:
        return <Board />;
    }
  };

  return (
    <S.AppContainer>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <S.AppMain>
        <S.Card>{renderContent()}</S.Card>
      </S.AppMain>
    </S.AppContainer>
  );
};

export default Dashboard;
