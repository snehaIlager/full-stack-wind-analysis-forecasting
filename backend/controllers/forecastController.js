const {
  fetchActualData,
  fetchForecastData
} = require("../services/windService");

const { applyForecastHorizon } = require("../utils/forecastLogic");

exports.getForecast = async (req, res) => {

  const { horizon } = req.query;

  try {

    const actual = await fetchActualData();
    const forecast = await fetchForecastData();

    const result = applyForecastHorizon(
      actual,
      forecast,
      Number(horizon)
    );

    console.log("Result size:", result.length);

    res.json(result);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};