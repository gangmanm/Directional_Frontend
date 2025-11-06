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
