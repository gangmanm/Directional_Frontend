import api from "../lib/api";
import type {
  WeeklyMoodData,
  CoffeeConsumptionResponse,
  CoffeeConsumptionData,
} from "../types/chart";

export const chartAPI = {
  getWeeklyMoodTrend: async (): Promise<WeeklyMoodData[]> => {
    const response = await api.get<WeeklyMoodData[]>("/mock/weekly-mood-trend");
    return response.data;
  },

  getCoffeeConsumption: async (): Promise<CoffeeConsumptionData[]> => {
    const response = await api.get<CoffeeConsumptionResponse>(
      "/mock/coffee-consumption"
    );

    const teams = response.data.teams;
    const maxLength = Math.max(...teams.map((team) => team.series.length));

    const transformedData: CoffeeConsumptionData[] = [];

    for (let i = 0; i < maxLength; i++) {
      const dataPoint: CoffeeConsumptionData = {
        coffee: teams[0]?.series[i]?.cups || i + 1,
      };

      teams.forEach((team) => {
        if (team.series[i]) {
          dataPoint[`${team.team}_bugs`] = team.series[i].bugs;
          dataPoint[`${team.team}_productivity`] = team.series[i].productivity;
        }
      });

      transformedData.push(dataPoint);
    }

    return transformedData;
  },
};
