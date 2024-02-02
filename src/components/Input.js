import { useState } from "react";
import "./Input.css";

export default function Input({
  setCity,
  setUnits,
  fetchWeatherData,
  setError,
}) {
  const [inputError, setInputError] = useState("");

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      const enteredCity = e.currentTarget.value.trim();
      if (enteredCity) {
        setCity(enteredCity);
        fetchWeatherData();
        setInputError("");
      } else {
        setInputError("City name is required");
        setError(true);
      }
      e.currentTarget.blur();
    }
  };

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  return (
    <div className="section section__inputs">
      <input
        onKeyDown={enterKeyPressed}
        type="text"
        name="city"
        placeholder="Enter City..."
      />
      <button onClick={(e) => handleUnitsClick(e)}>°F</button>
      {inputError && <p className="error-message">{inputError}</p>}
    </div>
  );
}
