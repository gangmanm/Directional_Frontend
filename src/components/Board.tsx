import styled from "styled-components";

const Container = styled.div`
  color: #ffffff;
  padding: 20px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const Description = styled.p`
  color: #b0b0b0;
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;
`;

const WriteButton = styled.button`
  padding: 10px 20px;
  background: #ffffff;
  color: #0a0a0a;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface BoardProps {
  onTabChange: (tab: string) => void;
}

const Board = ({ onTabChange }: BoardProps) => {
  return (
    <Container>
      <TitleRow>
        <Title>글 목록</Title>
        <WriteButton onClick={() => onTabChange("write")}>
          글 작성하기
        </WriteButton>
      </TitleRow>
      <Description>게시판 목록 추가 예정</Description>
    </Container>
  );
};

export default Board;
