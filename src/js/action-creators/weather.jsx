'use strict';

import axios from 'axios';
import {weatherKey} from '../apiKeys';

import ChromePromise from 'chrome-promise';

const chromep = new ChromePromise();

import {
  RECEIVE_WEATHER
} from '../constants';

const openweather =
  `http://api.openweathermap.org/data/2.5/weather?APPID=${weatherKey}`;

export const receiveWeather = (weather) =>
  ({weather, type: RECEIVE_WEATHER});

export const fetchWeather = (zip) =>
  dispatch => {
    axios.get(`${openweather}&zip=${zip},us`)
    .then(res => res.data)
    .then(data => dispatch(receiveWeather(data)))
    .catch(err => console.error('Problem fetching weather', err));
  };
