import styled from "styled-components";
import { media } from "./breakpoints";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0a0a0a;
  padding: 16px;

  ${media.tablet} {
    padding: 20px;
  }
`;

export const LoginCard = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  border: 1px solid #2a2a2a;
  padding: 24px;
  width: 100%;
  max-width: 400px;

  ${media.tablet} {
    border-radius: 16px;
    padding: 40px;
  }
`;

export const LoginTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 24px;
  text-align: center;

  ${media.tablet} {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #b0b0b0;
`;

export const Input = styled.input<{ $isInvalid?: boolean }>`
  padding: 10px 14px;
  border: 2px solid ${(props) => (props.$isInvalid ? "#ff4444" : "#2a2a2a")};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  outline: none;
  background-color: #0a0a0a;
  color: #ffffff;

  ${media.tablet} {
    padding: 12px 16px;
  }

  &::placeholder {
    color: #666666;
  }

  &:focus {
    border-color: ${(props) => (props.$isInvalid ? "#ff4444" : "#ffffff")};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$isInvalid
          ? "rgba(255, 68, 68, 0.1)"
          : "rgba(255, 255, 255, 0.1)"};
  }

  &:disabled {
    background-color: #1a1a1a;
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ValidationError = styled.span`
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 4px;
`;

export const ErrorMessage = styled.div`
  background-color: #2a1a1a;
  color: #ff6b6b;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #ff4444;
`;

export const LoginButton = styled.button`
  background: #ffffff;
  color: #0a0a0a;
  border: none;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3);
    background: #f0f0f0;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
