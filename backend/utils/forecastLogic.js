function applyForecastHorizon(actual, forecast, horizon) {

  const result = [];

  actual.slice(0, 20).forEach((a, i) => {

    if (forecast[i]) {

      result.push({
        time: a.startTime,
        actual: a.generation,
        forecast: forecast[i].generation
      });

    }

  });

  return result;
}

module.exports = { applyForecastHorizon };