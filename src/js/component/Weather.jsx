'use strict';

import React from 'react';

export default function Weather (props) {
  const { weather } = props;
  // Current weather is broadcast in weather.main
  // weather.name is the city name
  // weather.main.temp is in Kelvin, so must be converted to Celsius
  // Weather.weather is an array of forecasts
  // Our free API key only sends us today's forecast, on index 0
  // Forecast IDs pair with a corresponding glyphicon
  // See https://erikflowers.github.io/weather-icons/api-list.html

  const daynight = 'night';

  return weather ?
    (
      <div id="weather">
        <div id="icon">
          <i className={`wi wi-owm-${daynight}-${weather.weather[0].id}`}></i>
          <span>{`${Math.round((weather.main.temp - 273.15) * 1.8 + 32)}°`}</span>
        </div>
        <span id="city">{weather.name}</span>
      </div>
    ) : <div id="weather"></div>
}
