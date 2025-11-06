import styled from "styled-components";

const Container = styled.div`
  color: #ffffff;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #b0b0b0;
  font-size: 16px;
`;

const Board = () => {
  return (
    <Container>
      <Title>게시판</Title>
      <Description>게시판 목록 추가 예정</Description>
    </Container>
  );
};

export default Board;
