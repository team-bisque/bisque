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

  let hr = (new Date()).getHours(),
      daynight = 'day';
  if(hr<6 && hr>18) daynight = 'night';

  return weather
    ? (
        <div id="weather" className="icon top-right bg-check">
          <div>
            <i className={`wi wi-owm-${daynight}-${weather.weather[0].id}`}></i>
            <span className="temperature">{` ${Math.round((weather.main.temp - 273.15) * 1.8 + 32)}°`}</span>
          </div>
          <div><span className="city">{weather.name}</span></div>
        </div>
      )
    : (<div id="weather"></div>);
}
