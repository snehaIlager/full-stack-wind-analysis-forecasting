function applyForecastHorizon(actual, forecast, horizon) {

  const result = [];

  actual.forEach(a => {

    const targetTime = new Date(a.startTime);
    const cutoff = new Date(targetTime.getTime() - horizon * 3600000);

    const sameTimeForecasts = forecast.filter(f => {
      const fStart = new Date(f.startTime);
      const timeDiff = Math.abs(fStart - targetTime);
      return timeDiff <= 30 * 60 * 1000;
    });

    if (sameTimeForecasts.length === 0) return;

    // try horizon rule
    let candidates = sameTimeForecasts.filter(f => {
      return new Date(f.publishTime) <= cutoff;
    });

    // fallback if none satisfy horizon
    if (candidates.length === 0) {
      candidates = sameTimeForecasts;
    }

    const best = candidates.reduce((latest, current) => {
      return new Date(current.publishTime) > new Date(latest.publishTime)
        ? current
        : latest;
    });

    result.push({
      time: a.startTime,
      actual: a.generation,
      forecast: best.generation
    });

  });

  console.log("Matched pairs:", result.length);

  return result;
}

module.exports = { applyForecastHorizon };