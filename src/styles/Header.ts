import styled, { keyframes } from "styled-components";
import { media } from "./breakpoints";

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HeaderContainer = styled.header`
  background: #1a1a1a;
  border-radius: 12px;
  border: 1px solid #2a2a2a;
  padding: 16px;
  max-width: 1200px;
  margin: 20px auto 20px;
  position: relative;

  ${media.tablet} {
    border-radius: 16px;
    padding: 20px 30px;
    margin: 30px auto 30px;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  ${media.tablet} {
    gap: 16px;
  }
`;

export const Logo = styled.h1`
  color: #ffffff;
  margin: 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 8px;

  ${media.tablet} {
    font-size: 24px;
    gap: 10px;
  }
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;

    ${media.tablet} {
      width: 24px;
      height: 24px;
    }
  }
`;

export const MenuIconButton = styled.button<{ $isOpen: boolean }>`
  background: transparent;
  border: 1px solid #2a2a2a;
  color: #ffffff;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  ${media.tablet} {
    padding: 10px;
  }

  svg {
    width: 20px;
    height: 20px;

    ${media.tablet} {
      width: 24px;
      height: 24px;
    }
  }

  &:hover {
    background: #2a2a2a;
    border-color: #ffffff;
  }

  ${(props) =>
    props.$isOpen &&
    `
    background: #2a2a2a;
    border-color: #ffffff;
  `}
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 200px;
  max-width: 280px;
  z-index: 1000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  animation: ${slideDown} 0.3s ease-out;

  ${media.tablet} {
    min-width: 220px;
    max-width: 300px;
    padding: 10px;
  }
`;

export const DropdownMenuItem = styled.button<{ $active: boolean }>`
  background: ${(props) => (props.$active ? "#ffffff" : "transparent")};
  color: ${(props) => (props.$active ? "#0a0a0a" : "#b0b0b0")};
  border: 1px solid ${(props) => (props.$active ? "#ffffff" : "transparent")};
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
  white-space: nowrap;

  ${media.tablet} {
    padding: 12px 16px;
    font-size: 14px;
  }

  &:hover {
    background: ${(props) => (props.$active ? "#ffffff" : "#2a2a2a")};
    border-color: ${(props) => (props.$active ? "#ffffff" : "#2a2a2a")};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  ${media.tablet} {
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
`;

export const UserInfo = styled.div`
  display: none;

  ${media.tablet} {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }
`;

export const UserInfoText = styled.p`
  margin: 0;
  color: #b0b0b0;
  font-size: 13px;
  text-align: right;

  strong {
    color: #ffffff;
  }
`;

export const LogoutButton = styled.button`
  background: #ffffff;
  color: #0a0a0a;
  border: none;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  ${media.tablet} {
    padding: 10px 24px;
    font-size: 14px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3);
    background: #f0f0f0;
  }

  &:active {
    transform: translateY(0);
  }
`;
