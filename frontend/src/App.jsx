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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

function App() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState([]);
  const [start, setStart] = useState("2024-01-01");
  const [end, setEnd] = useState("2024-01-10");
  const [horizon, setHorizon] = useState(4);

  useEffect(() => {

    fetch(`${API_URL}/api/forecast?start=${start}&end=${end}&horizon=${horizon}`)
      .then(res => res.json())
      .then(res => setData(res));

  }, [start, end, horizon, API_URL]);

  const chartData = {
    labels: data.map(d =>
      new Date(d.time).toLocaleString()
    ),
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

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>

      <h2>Wind Forecast Monitoring Dashboard</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>

        <div>
          <label>Start Time</label>
          <input
            type="date"
            value={start}
            onChange={e => setStart(e.target.value)}
          />
        </div>

        <div>
          <label>End Time</label>
          <input
            type="date"
            value={end}
            onChange={e => setEnd(e.target.value)}
          />
        </div>

        <div>
          <label>Forecast Horizon: {horizon}h</label>
          <input
            type="range"
            min="0"
            max="48"
            value={horizon}
            onChange={e => setHorizon(e.target.value)}
          />
        </div>

      </div>

      {data.length === 0
        ? <p>Loading...</p>
        : <Line data={chartData} />
      }

    </div>
  );
}

export default App;