const express = require("express");
const cors = require("cors");

const forecastRoutes = require("./routes/forecastRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/forecast", forecastRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Wind Forecast API running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});