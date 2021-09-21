import React, { useState } from "react";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherNight,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindyCloudy,
} from "react-icons/ti";

const api_key = {
  key: "5bce8b949d89692e1278df84fec4ab4a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showtime, setShowtime] = useState("");
  const [showSun, setShowSun] = useState("");
  const [showNight, setShowNight] = useState("");

  const icon = () => {
    switch (weather.weather[0].icon) {
      case "01d":
        return <TiWeatherSunny />;
      case "02d":
        return <TiWeatherPartlySunny />;
      case "01n":
        return <TiWeatherNight />;
      case "02n":
        return <TiWeatherNight />;
      case "03d":
        return <TiWeatherCloudy />;
      case "03n":
        return <TiWeatherCloudy />;
      case "04d":
        return <TiWeatherWindyCloudy />;
      case "04n":
        return <TiWeatherWindyCloudy />;
      case "09d":
        return <TiWeatherShower />;
      case "09n":
        return <TiWeatherShower />;
      case "10d":
        return <TiWeatherDownpour />;
      case "10n":
        return <TiWeatherDownpour />;
      case "11d":
        return <TiWeatherStormy />;
      case "11n":
        return <TiWeatherStormy />;
      case "13d":
        return <TiWeatherSnow />;
      case "13n":
        return <TiWeatherSnow />;
      default:
        return <TiWeatherSunny />;
    }
  };

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(
        `${api_key.base}weather?q=${query}&units=metric&APPID=${api_key.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          if (result.cod === "404") {
            setErrorMessage(
              "You enter wrong city or country, please try again"
            );
          } else {
            let currentTime = result.dt;
            let getTime = new Date(currentTime * 1000);
            let currentTiming = getTime.toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit",
            });
            setShowtime(currentTiming);
            let sunRise = result.sys.sunrise;
            let getSun = new Date(sunRise * 1000);
            let sunRising = getSun.toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit",
            });
            setShowSun(sunRising);
            let sunFall = result.sys.sunset;
            let getFall = new Date(sunFall * 1000);
            let sunFalling = getFall.toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit",
            });
            setShowNight(sunFalling);
            console.log(result);
          }
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${day}, ${date} ${month}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app-warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter city or country"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="wrapper-box">
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="time-title">
                <span>Updated: </span>
                {showtime}
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}&deg;c</div>
              <div className="weather-icon">{icon()}</div>
            </div>
            <div className="description-box">
              <div className="description-text">
                {weather.weather[0].description}
              </div>
              <div className="humidity">
                <span>humidity:</span> {weather.main.humidity}%
              </div>
              <div className="humidity">
                <span>sunrise: {showSun}</span>
              </div>
              <div className="humidity">
                <span>sunset: {showNight}</span>
              </div>
            </div>
          </div>
        ) : (
          <div>{errorMessage && <p className="error"> {errorMessage} </p>}</div>
        )}
      </main>
    </div>
  );
}

export default App;
