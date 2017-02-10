'use strict';

import axios from 'axios';
import {weatherKey} from '../apiKeys';
import {getPreciseLocation} from '../utils';

import {
  RECEIVE_WEATHER
} from '../constants';

const openweather =
  `http://api.openweathermap.org/data/2.5/weather?APPID=${weatherKey}`;

export const receiveWeather = (weather) =>
  ({weather, type: RECEIVE_WEATHER});

export const fetchWeather = () =>
  dispatch => {
    getPreciseLocation()
    .then(coords => {
      if (coords) return axios.get(`${openweather}&lat=${coords.latitude}&lon=${coords.longitude}`);
      return axios.get('https://freegeoip.net/json/')
              .then(res => axios.get(`${openweather}&zip=${res.data.zip_code},us`));
    })
    .then(res => res.data)
    .then(data => dispatch(receiveWeather(data)))
    .catch(err => console.error('Problem fetching weather', err));
  };
