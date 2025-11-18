"use client";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export interface ChartProps {
  data?: number[];
  labels?: string[];
  type: "bar" | "line";
  HeaderText: string;
  legendText: string;
  barProps?: any;
  lineProps?: any;
}

export const Chart = ({
  data,
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  type,
  HeaderText,
  legendText,
  barProps = {
    backgroundColor: "rgba(54, 162, 235, 0.6)",
  },
  lineProps = {
    fill: false,
    borderColor: "#3b82f6",
    tension: 0.3,
  },
}: ChartProps) => {
  const payload = {
    labels: labels,
    datasets: [
      {
        label: legendText,
        data: data,
        ...(type === "bar" ? barProps : lineProps),
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: true },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-md p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">{HeaderText}</h2>
      {type === "bar" ? (
        <Bar data={payload} options={options} />
      ) : (
        <Line data={payload} options={options} />
      )}
    </div>
  );
};
