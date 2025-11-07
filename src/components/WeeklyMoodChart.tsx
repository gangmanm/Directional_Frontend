import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { chartAPI } from "../api/chart";
import type { WeeklyMoodData } from "../types/chart";
import * as S from "../styles/Chart";

const WeeklyMoodChart = () => {
  const [data, setData] = useState<WeeklyMoodData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await chartAPI.getWeeklyMoodTrend();
        setData(result);
      } catch (err) {
        console.error("주간 기분 추세 데이터 로드 실패:", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <S.ChartCard>
        <S.ChartTitle>주간 기분 추세</S.ChartTitle>
        <S.LoadingMessage>로딩 중...</S.LoadingMessage>
      </S.ChartCard>
    );
  }

  if (error) {
    return (
      <S.ChartCard>
        <S.ChartTitle>주간 기분 추세</S.ChartTitle>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.ChartCard>
    );
  }

  return (
    <S.ChartCard>
      <S.ChartTitle>주간 기분 추세</S.ChartTitle>
      <S.ChartDescription>주간별 기분 상태 비율 (%)</S.ChartDescription>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorHappy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#51cf66" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#51cf66" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="colorTired" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffd43b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffd43b" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="colorStressed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="week" stroke="#b0b0b0" />
          <YAxis stroke="#b0b0b0" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              color: "#ffffff",
            }}
          />
          <Legend wrapperStyle={{ color: "#b0b0b0" }} iconType="circle" />
          <Area
            type="monotone"
            dataKey="happy"
            stackId="1"
            stroke="#51cf66"
            fill="url(#colorHappy)"
            name="행복"
          />
          <Area
            type="monotone"
            dataKey="tired"
            stackId="1"
            stroke="#ffd43b"
            fill="url(#colorTired)"
            name="피곤"
          />
          <Area
            type="monotone"
            dataKey="stressed"
            stackId="1"
            stroke="#ff6b6b"
            fill="url(#colorStressed)"
            name="스트레스"
          />
        </AreaChart>
      </ResponsiveContainer>
    </S.ChartCard>
  );
};

export default WeeklyMoodChart;
