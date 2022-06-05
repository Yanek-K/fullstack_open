import React, { useEffect, useState } from "react";

// Packages
import axios from "axios";

const WeatherData = ({ country }) => {
  const [weather, setWeather] = useState("");
  const apiKey = process.env.REACT_APP_WEATHER_API;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&appid=${apiKey}`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
  }, [country]);

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>Temperature: {weather.main?.temp}°C</p>
      {weather ? (
        <img
          src={`http://openweathermap.org/img/w/${weather?.weather[0].icon}.png`}
          alt={weather.weather[0].description}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default WeatherData;
