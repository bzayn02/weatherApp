import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [timeData, setTimeData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=06d65b84cb442527cf9d3a216d15bae3`;

  const timeURL = `https://world-time2.p.rapidapi.com/timezone/${country}/${city}`;

  const searchLocation = (event) => {
    try {
      if (event.key === 'Enter' && city.length && country.length) {
        axios.get(weatherURL).then((response) => {
          setWeatherData(response.data);
          console.log(response.data);
        });

        axios
          .get(timeURL, {
            headers: {
              'X-RapidAPI-Key':
                '94c7d2911dmsh7f07c61aa20674bp11af57jsn60ed4a72be1c',
              'X-RapidAPI-Host': 'world-time2.p.rapidapi.com',
            },
          })
          .then((response) => {
            setTimeData(response.data);
            console.log(response.data);
          });
        setCountry('');
        setCity('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Country"
          type="text"
          required
        />
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter City"
          type="text"
          required
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{weatherData.name}</p>
          </div>
          <div className="temp">
            {weatherData.main ? (
              <h1>{weatherData.main.temp.toFixed()}°F</h1>
            ) : null}
          </div>
          <div className="description">
            {weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}
          </div>
        </div>

        {!timeData.datetime !== undefined && (
          <div className="currentTime">
            {timeData.datetime ? (
              <p>Current time: {timeData?.datetime?.substring(11, 19)}</p>
            ) : null}
          </div>
        )}

        {weatherData.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {weatherData.main ? (
                <p className="bold">
                  {weatherData.main.feels_like.toFixed()}°F
                </p>
              ) : null}

              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {weatherData.main ? (
                <p className="bold">{weatherData.main.humidity}%</p>
              ) : null}

              <p>Humidity</p>
            </div>
            <div className="wind">
              {weatherData.wind ? (
                <p className="bold">{weatherData.wind.speed.toFixed()}MPH</p>
              ) : null}

              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
