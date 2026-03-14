import axios from "axios";

export const getForecast = async (start, end, horizon) => {

  const res = await axios.get(
    "http://localhost:5000/api/forecast",
    {
      params: { start, end, horizon }
    }
  );

  return res.data;
};