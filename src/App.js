import { useState, useEffect, useCallback } from "react";
import {
  Input,
  Features,
  Description,
  DailyForecast,
} from "./components/index";
import { getCurrentWeatherData } from "./services/WeatherService";
import { getWeatherForecastData } from "./services/Forecast";
import hotbg from "./assets/hot.jpg";
import coldbg from "./assets/cold.jpg";
import "./App.css";

function App() {
  const [city, setCity] = useState("Bhubaneswar");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [foreCast, setForeCast] = useState(null);
  const [bg, setBg] = useState(hotbg);
  const [error, setError] = useState(false);

  const fetchWeatherData = useCallback(async () => {
    try {
      const data = await getCurrentWeatherData(city, units);
      setWeather(data);
      // dynamic bg
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldbg);
      else setBg(hotbg);
      setError(false);
    } catch (error) {
      console.log("Fetch Weather Data", error);
      setError(true);
    }
  }, [city, units, setWeather, setBg, setError]);

  const fetchWeatherForeCast = useCallback(async () => {
    const foreCastData = await getWeatherForecastData(city, units);
    setForeCast(foreCastData);
  }, [setForeCast, city, units]);

  useEffect(() => {
    fetchWeatherData();
    fetchWeatherForeCast();
  }, [fetchWeatherData, fetchWeatherForeCast, units, city]);

  return (
    <div
      className={`app ${error ? "error" : ""}`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="overlay">
        {weather && foreCast && (
          <div className="container">
            <Input
              city={city}
              setCity={setCity}
              units={units}
              setUnits={setUnits}
              fetchWeatherData={fetchWeatherData}
              setError={setError}
            />
            <Features weather={weather} units={units} />
            <Description weather={weather} units={units} />
            <DailyForecast foreCast={foreCast} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
