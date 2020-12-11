import { useEffect, useState } from "react";
import axios from "axios";

const WeatherInfo = ({ capital }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
      )
      .then((response) => setWeather(response.data));
  }, [capital]);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      {weather && (
        <>
          <p>
            temperature: <strong>{weather.main.temp} Celsius</strong>
          </p>
          <p>
            wind:{" "}
            <strong>
              {weather.wind.speed} mph in {weather.wind.deg} deg
            </strong>
          </p>
        </>
      )}
    </div>
  );
};

export default WeatherInfo;
