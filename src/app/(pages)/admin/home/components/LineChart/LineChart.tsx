"use client";
import Container from "@/app/ui/Container";
import { Line } from "react-chartjs-2";
import { Chart, ChartData, registerables } from "chart.js";
import { FC } from "react";
import { LineChartProps } from "./LineChart.type";

Chart.register(...registerables);

const LineChart: FC<LineChartProps> = (props) => {
  const { data: values, labels, title } = props;
  const data: ChartData<"line"> = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: values,
        borderColor: "#F6876A",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <Container size={{ width: "w-full" }}>
      <Line
        data={data}
        options={{
          ...options,
          responsive: true,
          plugins: {
            title: {
              align: "start",
              display: true,
              font: { size: 15, family: "Quicksand, sans-serif" },
              text: title,
              padding: { bottom: 40 },
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </Container>
  );
};

export default LineChart;
