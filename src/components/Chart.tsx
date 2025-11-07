import WeeklyMoodChart from "./WeeklyMoodChart";
import CoffeeConsumptionChart from "./CoffeeConsumptionChart";
import * as S from "../styles/Chart";

const Chart = () => {
  return (
    <S.ChartContainer>
      <WeeklyMoodChart />
      <CoffeeConsumptionChart />
    </S.ChartContainer>
  );
};

export default Chart;
