import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import * as S from "../styles/Header";
import { Menu } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (tab: string) => {
    onTabChange(tab);
    setIsMenuOpen(false);
  };

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.LeftSection>
          <S.MenuIconButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            $isOpen={isMenuOpen}
          >
            <Menu />
          </S.MenuIconButton>

          <S.Logo>
            Directional
            <S.LogoImage src="/logo.svg" alt="Directional Logo" />
          </S.Logo>
        </S.LeftSection>

        <S.UserSection>
          <S.UserInfo>
            <S.UserInfoText>
              <strong>{user?.email}</strong>
            </S.UserInfoText>
            <S.UserInfoText>ID: {user?.id}</S.UserInfoText>
          </S.UserInfo>
          <S.LogoutButton onClick={logout}>로그아웃</S.LogoutButton>
        </S.UserSection>
      </S.HeaderContent>

      {isMenuOpen && (
        <S.DropdownMenu>
          <S.DropdownMenuItem
            $active={activeTab === "board"}
            onClick={() => handleMenuClick("board")}
          >
            게시글 확인하기
          </S.DropdownMenuItem>
          <S.DropdownMenuItem
            $active={activeTab === "chart"}
            onClick={() => handleMenuClick("chart")}
          >
            차트보기
          </S.DropdownMenuItem>
        </S.DropdownMenu>
      )}
    </S.HeaderContainer>
  );
};

export default Header;
