import config from "../config/config";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const fetchCurrentWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.apiKey}&units=${units}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

const extractWeatherInfo = (data) => {
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};

const getCurrentWeatherData = async (city, units = "metric") => {
  try {
    const data = await fetchCurrentWeatherData(city, units);
    const weatherInfo = extractWeatherInfo(data);
    return weatherInfo;
  } catch (error) {
    console.error("Error getting current weather data:", error);
    throw error;
  }
};

export { getCurrentWeatherData };
