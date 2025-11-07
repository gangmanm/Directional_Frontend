import styled, { keyframes } from "styled-components";

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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

export const Label = styled.label`
  font-size: 12px;
  color: #b0b0b0;
  font-weight: 600;
  letter-spacing: -0.2px;
`;

export const DropdownButton = styled.button<{ $isOpen: boolean }>`
  background: #1a1a1a;
  border: 1px solid ${(props) => (props.$isOpen ? "#ffffff" : "#2a2a2a")};
  border-radius: 8px;
  padding: 12px 14px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  text-align: left;

  &:hover:not(:disabled) {
    border-color: #ffffff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const DropdownText = styled.span<{ $hasValue: boolean }>`
  color: ${(props) => (props.$hasValue ? "#ffffff" : "#666666")};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const IconWrapper = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0)")};
  color: #b0b0b0;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 1000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  animation: ${slideDown} 0.2s ease-out;
  max-height: 250px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #444444;
  }
`;

export const DropdownMenuItem = styled.button<{ $active: boolean }>`
  background: ${(props) => (props.$active ? "#ffffff" : "transparent")};
  color: ${(props) => (props.$active ? "#0a0a0a" : "#b0b0b0")};
  border: 1px solid ${(props) => (props.$active ? "#ffffff" : "transparent")};
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: ${(props) => (props.$active ? "#ffffff" : "#2a2a2a")};
    border-color: ${(props) => (props.$active ? "#ffffff" : "#2a2a2a")};
  }

  &:active {
    transform: scale(0.98);
  }
`;
