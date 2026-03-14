import { Line } from "react-chartjs-2";

export default function ForecastChart({ data }) {

  const chartData = {
    labels: data.map(d => d.time),

    datasets: [
      {
        label: "Actual Wind",
        data: data.map(d => d.actual),
        borderColor: "blue"
      },
      {
        label: "Forecast Wind",
        data: data.map(d => d.forecast),
        borderColor: "green"
      }
    ]
  };

  return <Line data={chartData} />;
}