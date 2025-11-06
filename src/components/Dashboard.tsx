import { useAuth } from "../contexts/AuthContext";
import * as S from "../styles/Dashboard";
import { LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <S.AppContainer>
      <S.AppHeader>
        <S.Title>
          Directional
          <S.IconWrapper>
            <LayoutDashboard />
          </S.IconWrapper>
        </S.Title>
        <S.UserSection>
          <S.UserInfo>
            <S.UserInfoText>
              <strong>{user?.email}</strong>
            </S.UserInfoText>
            <S.UserInfoText>ID: {user?.id}</S.UserInfoText>
          </S.UserInfo>
          <S.LogoutButton onClick={logout}>로그아웃</S.LogoutButton>
        </S.UserSection>
      </S.AppHeader>
      <S.AppMain>
        <S.Card></S.Card>
      </S.AppMain>
    </S.AppContainer>
  );
};

export default Dashboard;
