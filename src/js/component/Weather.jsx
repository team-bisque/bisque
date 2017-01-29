'use strict';

import React from 'react';

export default function Steps (props) {
  const {weather} = props;
  // Current weather is broadcast in weather.main
  // weather.name is the city name
  // weather.main.temp is in Kelvin, so must be converted to Celsius
  // Weather.weather is an array of forecasts
  // Our free API key only sends us today's forecast, on index 0
  // Forecast IDs pair with a corresponding glyphicon
  // See https://erikflowers.github.io/weather-icons/api-list.html

  return (
    <div id="weather">
      <div id="icon">
        <i className={`wi wi-owm-${weather.weather[0].id}`}></i>
        <span>{weather && Math.round(weather.main.temp - 273.15) + '° c'}</span>
      </div>
      <span id="city">{weather && weather.name}</span>
    </div>
  );
}
