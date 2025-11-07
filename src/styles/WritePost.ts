import styled from "styled-components";
import { media } from "./breakpoints";

export const FloatingContainer = styled.div<{ $isMinimized: boolean }>`
  position: fixed;
  bottom: 0;
  right: 20px;
  width: 90%;
  max-width: 600px;
  background: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  max-height: ${(props) => (props.$isMinimized ? "48px" : "80vh")};
  transition: max-height 0.3s ease;

  ${media.tablet} {
    width: 600px;
  }
`;

export const FloatingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #2a2a2a;
  border-bottom: 1px solid #333333;
  border-radius: 12px 12px 0 0;
  cursor: move;
`;

export const FloatingTitle = styled.h3`
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
`;

export const FloatingActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconButton = styled.button`
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
    background: #333333;
    color: #ffffff;
  }
`;

export const FloatingContent = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a1a;
  }

  &::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #444444;
  }
`;

export const Container = styled.div`
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  ${media.tablet} {
    padding: 30px;
  }
`;

export const Title = styled.h2`
  color: #ffffff;
  font-size: 18px;
  margin: 0 0 30px 0;
  font-weight: 600;
  letter-spacing: -0.5px;

  ${media.tablet} {
    font-size: 20px;
    margin-bottom: 40px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const Label = styled.label`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.3px;

  ${media.tablet} {
    font-size: 15px;
  }
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #333333;
  border-radius: 0;
  padding: 12px 0;
  color: #ffffff;
  font-size: 15px;
  transition: border-color 0.2s ease;
  outline: none;
  width: 100%;
  box-sizing: border-box;

  ${media.tablet} {
    font-size: 16px;
  }

  &::placeholder {
    color: #666666;
  }

  &:focus {
    border-bottom-color: #ffffff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  background: transparent;
  border: none;
  border-bottom: 1px solid #333333;
  border-radius: 0;
  padding: 12px 0;
  color: #ffffff;
  font-size: 15px;
  transition: border-color 0.2s ease;
  outline: none;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  ${media.tablet} {
    font-size: 16px;
  }

  &:focus {
    border-bottom-color: #ffffff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  option {
    background: #0a0a0a;
    color: #ffffff;
  }
`;

export const Textarea = styled.textarea`
  background: transparent;
  border: 1px solid #333333;
  border-radius: 4px;
  padding: 12px;
  color: #ffffff;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.6;
  transition: border-color 0.2s ease;
  outline: none;
  resize: vertical;
  min-height: 120px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #666666;
  }

  &:focus {
    border-color: #ffffff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  padding: 14px 0;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  word-break: keep-all;

  ${media.tablet} {
    font-size: 15px;
  }
`;

export const SuccessMessage = styled.div`
  color: #6bff6b;
  padding: 14px 0;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  word-break: keep-all;

  ${media.tablet} {
    font-size: 15px;
  }
`;

export const SubmitButton = styled.button`
  background: #ffffff;
  color: #0a0a0a;
  border: none;
  padding: 16px 24px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.3px;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin-top: 12px;
  width: 100%;
  box-sizing: border-box;

  ${media.tablet} {
    padding: 18px 32px;
    font-size: 16px;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:active:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
