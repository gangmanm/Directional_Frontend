export interface WeeklyMoodData {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
}

export interface TeamSeries {
  cups: number;
  bugs: number;
  productivity: number;
}

export interface TeamData {
  team: string;
  series: TeamSeries[];
}

export interface CoffeeConsumptionResponse {
  teams: TeamData[];
}

export interface CoffeeConsumptionData {
  coffee: number;
  [key: string]: number;
}
