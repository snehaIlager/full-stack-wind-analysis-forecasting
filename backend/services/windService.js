const axios = require("axios");

const BASE = "https://data.elexon.co.uk/bmrs/api/v1/datasets";

async function fetchActualData() {

  const res = await axios.get(
    `${BASE}/FUELHH?from=2024-01-01&to=2024-01-03&format=json`
  );

  return res.data.data.filter(d => d.fuelType === "WIND");
}

async function fetchForecastData() {

  const res = await axios.get(
    `${BASE}/WINDFOR?from=2024-01-01&to=2024-01-03&format=json`
  );

  return res.data.data;
}

module.exports = { fetchActualData, fetchForecastData };