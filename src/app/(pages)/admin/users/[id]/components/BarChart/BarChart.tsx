import { Bar } from "react-chartjs-2";
import Container from "@/app/ui/Container";
import { Chart, ChartData, registerables } from "chart.js";
import { FC } from "react";
import { BarChartProps } from "./BarChart.type";
Chart.register(...registerables);

const BarChart: FC<BarChartProps> = (props) => {
  const {
    data: values,
    labels,
    title,
    subtitle = "",
    yLabel = "",
    xLabel = "",
  } = props;
  const data: ChartData<"bar"> = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <Container size={{ width: "w-full" }}>
      <Bar
        data={data}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: yLabel,
              },
            },
            x: {
              title: {
                display: true,
                text: xLabel,
              },
            },
          },
          responsive: true,
          plugins: {
            title: {
              align: "start",
              display: true,
              font: { size: 15, family: "Quicksand, sans-serif" },
              text: title,
              padding: { bottom: 40 },
            },
            subtitle: {
              display: true,
              text: subtitle,
              align: "end",
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

export default BarChart;
