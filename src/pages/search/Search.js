import "./search.style.scss";
import Container from "../../components/container/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { openWeatherApiKey } from "../../app/constant";
import Error from "../../components/error/Error";

const Search = () => {
  const [countryName, setCountryName] = useState("");
  const [weatherResult, setWeatherResult] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const fetchByGeoLocation = (lat, lon) =>
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?appid=${openWeatherApiKey}&lat=${lat}&lon=${lon}`
      )
      .then((response) => {
        setWeatherResult(response.data);
      })
      .catch((error) => console.log(error));

  const fetchCountriesList = () =>
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?appid=${openWeatherApiKey}&q=${countryName}`
      )
      .then((response) => {
        setWeatherResult(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setErrorText(error.response.data.message);
        setShowError(true);
      });

  console.log(weatherResult);

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        const { latitude, longitude } = location.coords;
        fetchByGeoLocation(latitude, longitude);
      });
    }
  };

  const handleReset = () => {
    setWeatherResult({});
    setShowError(false);
  };

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  }, [showError]);

  return (
    <Container style={{ background: "#e85063" }}>
      <div className="search--box">
        <input
          id="global-input"
          className="global-input"
          placeholder="شهر را وارد کنید"
          onChange={(event) => setCountryName(event.target.value)}
        />
        <button
          className="button"
          onClick={fetchCountriesList}
          style={{ margin: "0 auto", marginTop: "2rem" }}
        >
          Search
        </button>
        <button
          className="button"
          onClick={getMyLocation}
          style={{ margin: "0 auto", marginTop: "2rem" }}
        >
          find my location
        </button>
        <button
          className="button"
          onClick={handleReset}
          style={{ margin: "0 auto", marginTop: "2rem" }}
        >
          Reset
        </button>
        country:
        <div>
          {weatherResult && weatherResult.sys && weatherResult.sys.country}
        </div>
        temp:
        <div>
          {weatherResult && weatherResult.main && weatherResult.main.temp}
        </div>
        sea level:
        <div>
          {weatherResult && weatherResult.main && weatherResult.main.sea_level}
        </div>
        pressure:
        <div>
          {weatherResult && weatherResult.main && weatherResult.main.pressure}
        </div>
        wind speed:
        <div>
          {weatherResult && weatherResult.wind && weatherResult.wind.speed}
        </div>
        humidity:
        <div>
          {weatherResult && weatherResult.main && weatherResult.main.humidity}
        </div>
      </div>
      {showError && <Error text={errorText} />}
    </Container>
  );
};

export default Search;
