const axios = require("axios");

const BASE = "https://data.elexon.co.uk/bmrs/api/v1/datasets";

async function fetchActualData() {

  const res = await axios.get(`${BASE}/FUELHH`, {
    params: {
      fuelType: "WIND",
      fromDateTime: "2024-01-01T00:00:00Z",
      toDateTime: "2024-01-05T23:30:00Z"
    }
  });

  const records = res.data?.data || [];

  console.log("Actual records:", records.length);

  return records;
}

async function fetchForecastData() {

  const res = await axios.get(`${BASE}/WINDFOR`, {
    params: {
      fromDateTime: "2024-01-01T00:00:00Z",
      toDateTime: "2024-01-05T23:30:00Z"
    }
  });

  const records = res.data?.data || [];

  console.log("Forecast records:", records.length);

  return records;
}

module.exports = {
  fetchActualData,
  fetchForecastData
};