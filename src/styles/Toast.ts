import styled, { keyframes } from "styled-components";

export type ToastType = "success" | "error" | "confirm";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ToastContainer = styled.div<{ $type: ToastType }>`
  position: fixed;
  top: 80px;
  right: 20px;
  display: flex;
  align-items: ${(props) =>
    props.$type === "confirm" ? "flex-start" : "center"};
  flex-direction: ${(props) => (props.$type === "confirm" ? "column" : "row")};
  gap: ${(props) => (props.$type === "confirm" ? "16px" : "12px")};
  padding: ${(props) => (props.$type === "confirm" ? "20px" : "16px 20px")};
  background: #1a1a1a;
  border: 1px solid
    ${(props) =>
      props.$type === "success"
        ? "#51cf66"
        : props.$type === "error"
        ? "#ff6b6b"
        : "#ffffff"};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  z-index: 10000;
  min-width: 300px;
  max-width: 500px;
  animation: ${slideIn} 0.3s ease-out;
`;

export const ToastIcon = styled.div<{ $type?: ToastType }>`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.$type === "success"
      ? "#51cf66"
      : props.$type === "error"
      ? "#ff6b6b"
      : props.$type === "confirm"
      ? "#ff6b6b"
      : "inherit"};
`;

export const ToastMessage = styled.p`
  margin: 0;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  word-break: break-word;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #b0b0b0;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #2a2a2a;
    color: #ffffff;
  }
`;

export const ConfirmContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export const ConfirmButtons = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: flex-end;
`;

export const ConfirmButton = styled.button<{ $variant: "confirm" | "cancel" }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid
    ${(props) => (props.$variant === "confirm" ? "#ff6b6b" : "#2a2a2a")};
  background: ${(props) =>
    props.$variant === "confirm" ? "#ff6b6b" : "transparent"};
  color: ${(props) => (props.$variant === "confirm" ? "#ffffff" : "#b0b0b0")};

  &:hover {
    background: ${(props) =>
      props.$variant === "confirm" ? "#ff5252" : "#2a2a2a"};
    color: #ffffff;
    border-color: ${(props) =>
      props.$variant === "confirm" ? "#ff5252" : "#ffffff"};
  }

  &:active {
    transform: scale(0.98);
  }
`;
