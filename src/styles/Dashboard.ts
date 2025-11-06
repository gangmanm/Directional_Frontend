import styled, { keyframes } from "styled-components";
import { media } from "./breakpoints";

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  padding: 16px;
  animation: ${fadeIn} 0.5s ease-out;

  ${media.tablet} {
    padding: 20px;
  }
`;

export const AppHeader = styled.header`
  background: #1a1a1a;
  border-radius: 12px;
  border: 1px solid #2a2a2a;
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto 20px;
  animation: ${fadeIn} 0.6s ease-out;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  ${media.tablet} {
    border-radius: 16px;
    padding: 20px 30px;
    margin: 0 auto 30px;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Title = styled.h1`
  color: #ffffff;
  margin: 0;
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 8px;

  ${media.tablet} {
    font-size: 32px;
    gap: 10px;
  }
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;

    ${media.tablet} {
      width: 32px;
      height: 32px;
    }
  }
`;

export const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;

  ${media.tablet} {
    flex-direction: row;
    width: auto;
    gap: 20px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  ${media.tablet} {
    align-items: flex-end;
  }
`;

export const UserInfoText = styled.p`
  margin: 0;
  color: #b0b0b0;
  font-size: 13px;
  text-align: center;

  ${media.tablet} {
    font-size: 14px;
    text-align: right;
  }

  strong {
    color: #ffffff;
  }
`;

export const LogoutButton = styled.button`
  background: #ffffff;
  color: #0a0a0a;
  border: none;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  ${media.tablet} {
    width: auto;
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

export const AppMain = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.7s ease-out;
`;

export const Card = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  border: 1px solid #2a2a2a;
  padding: 20px;

  ${media.tablet} {
    border-radius: 16px;
    padding: 30px;
  }
`;
