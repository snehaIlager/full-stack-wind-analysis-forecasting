import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./App.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

function App() {

  const [data, setData] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

useEffect(() => {
  fetch(`${API_URL}/api/forecast?horizon=4`)
    .then(res => res.json())
    .then(res => setData(res));
}, []);

  const chartData = {
    labels: data.map(d => d.time),
    datasets: [
      {
        label: "Actual Wind Generation",
        data: data.map(d => d.actual),
        borderColor: "blue",
        fill: false
      },
      {
        label: "Forecast Wind Generation",
        data: data.map(d => d.forecast),
        borderColor: "green",
        fill: false
      }
    ]
  };

  return (
    <div className="container">
      <h1>Wind Forecast Dashboard</h1>

      {data.length === 0 ? (
        <p>Loading wind data...</p>
      ) : (
        <Line data={chartData} />
      )}
    </div>
  );
}

export default App;