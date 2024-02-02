import "./DailyForecast.css";

export default function DayForecast({ foreCast, units }) {
  const tempUnit = units === "metric" ? "°C" : "°F";

  return (
    <div className="forecastContainer">
      {Object.keys(foreCast).map((date) => {
        const {
          averageTemperature,
          data: { description, icon },
        } = foreCast[date];

        return (
          <div key={date} className="forecast-card">
            <div className="card-body">
              <p className="forecast-date">
                <strong>{date}</strong>
              </p>
              <p className="forecast-averageTemperature">
                <strong>
                  Temp: {averageTemperature} {tempUnit}
                </strong>
              </p>
              <p className="forecast-description">
                <strong>{description}</strong>
              </p>
              <img className="forecast-icon" src={icon} alt="Weather Icon" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
