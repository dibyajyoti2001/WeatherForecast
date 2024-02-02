import config from "../config/config";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const fetchWeatherForecastData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${config.apiKey}&units=${units}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather forecast data:", error);
    throw error;
  }
};

const extractForecastInfo = (forecastData) => {
  const dailyForecast = {};

  forecastData.list.forEach((item) => {
    const {
      main: { temp },
      weather,
      dt_txt,
    } = item;
    const { description, icon } = weather[0];

    // Extract only the date part
    const date = dt_txt.split(" ")[0];

    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        temperatures: [],
        data: {
          temp,
          description,
          icon: makeIconURL(icon),
          forecastDate: dt_txt,
        },
      };
    }

    dailyForecast[date].temperatures.push(temp);
  });

  // Calculate average temperature for each day and format to the nearest whole number
  Object.keys(dailyForecast).forEach((date) => {
    const temperatures = dailyForecast[date].temperatures;
    const averageTemperature =
      temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;

    dailyForecast[date].averageTemperature = averageTemperature.toFixed();
  });

  return dailyForecast;
};

const getWeatherForecastData = async (city, units = "metric") => {
  try {
    const forecastData = await fetchWeatherForecastData(city, units);
    const forecastInfo = extractForecastInfo(forecastData);
    return forecastInfo;
  } catch (error) {
    console.error("Error getting weather forecast data:", error);
    throw error;
  }
};

export { getWeatherForecastData };
