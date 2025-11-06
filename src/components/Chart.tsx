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

const Chart = () => {
  return (
    <Container>
      <Title>차트</Title>
      <Description>통계 차트 추가 예정</Description>
    </Container>
  );
};

export default Chart;
