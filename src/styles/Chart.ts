import styled from "styled-components";

export const ChartContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const ChartCard = styled.div`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

export const ChartTitle = styled.h2`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

export const ChartDescription = styled.p`
  color: #b0b0b0;
  font-size: 14px;
  margin: 0 0 20px 0;
`;

export const LoadingMessage = styled.div`
  color: #b0b0b0;
  font-size: 16px;
  text-align: center;
  padding: 60px 0;
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 16px;
  text-align: center;
  padding: 60px 0;
`;
