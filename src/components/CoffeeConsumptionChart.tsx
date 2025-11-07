import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { chartAPI } from "../api/chart";
import type { CoffeeConsumptionData } from "../types/chart";
import * as S from "../styles/Chart";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload: CoffeeConsumptionData;
  }>;
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
  fill?: string;
}

const CoffeeConsumptionChart = () => {
  const [data, setData] = useState<CoffeeConsumptionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await chartAPI.getCoffeeConsumption();
        setData(result);
      } catch (err) {
        console.error("커피 소비 데이터 로드 실패:", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const SquareDot = (props: CustomDotProps) => {
    const { cx, cy, fill } = props;
    if (cx === undefined || cy === undefined) return null;
    return (
      <rect
        x={cx - 4}
        y={cy - 4}
        width={8}
        height={8}
        fill={fill}
        stroke={fill}
        strokeWidth={2}
      />
    );
  };

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const coffee = payload[0].payload.coffee;
      return (
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "8px",
            padding: "12px",
            color: "#ffffff",
          }}
        >
          <p style={{ margin: "0 0 8px 0", fontWeight: "600" }}>
            커피: {coffee}잔
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              style={{
                margin: "4px 0",
                color: entry.color,
                fontSize: "14px",
              }}
            >
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <S.ChartCard>
        <S.ChartTitle>커피 소비량과 생산성</S.ChartTitle>
        <S.LoadingMessage>로딩 중...</S.LoadingMessage>
      </S.ChartCard>
    );
  }

  if (error) {
    return (
      <S.ChartCard>
        <S.ChartTitle>커피 소비량과 생산성</S.ChartTitle>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </S.ChartCard>
    );
  }

  return (
    <S.ChartCard>
      <S.ChartTitle>커피 소비량과 생산성</S.ChartTitle>
      <S.ChartDescription>
        커피 섭취량에 따른 팀별 버그 수 및 생산성 점수
      </S.ChartDescription>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 60, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis
            dataKey="coffee"
            stroke="#b0b0b0"
            label={{
              value: "커피 섭취량 (잔/일)",
              position: "insideBottom",
              offset: -10,
              style: { fill: "#b0b0b0" },
            }}
          />
          <YAxis
            yAxisId="left"
            stroke="#b0b0b0"
            label={{
              value: "버그 수",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#b0b0b0" },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#b0b0b0"
            label={{
              value: "생산성 점수",
              angle: 90,
              position: "insideRight",
              style: { fill: "#b0b0b0" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ color: "#b0b0b0", paddingTop: "20px" }}
            iconType="line"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Frontend_bugs"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: "#8b5cf6", r: 4 }}
            activeDot={{ r: 6 }}
            name="Frontend 버그"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Frontend_productivity"
            stroke="#8b5cf6"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={<SquareDot fill="#8b5cf6" />}
            activeDot={{ r: 6 }}
            name="Frontend 생산성"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Backend_bugs"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={{ fill: "#06b6d4", r: 4 }}
            activeDot={{ r: 6 }}
            name="Backend 버그"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Backend_productivity"
            stroke="#06b6d4"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={<SquareDot fill="#06b6d4" />}
            activeDot={{ r: 6 }}
            name="Backend 생산성"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="AI_bugs"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ fill: "#f59e0b", r: 4 }}
            activeDot={{ r: 6 }}
            name="AI 버그"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="AI_productivity"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={<SquareDot fill="#f59e0b" />}
            activeDot={{ r: 6 }}
            name="AI 생산성"
          />
        </LineChart>
      </ResponsiveContainer>
    </S.ChartCard>
  );
};

export default CoffeeConsumptionChart;
