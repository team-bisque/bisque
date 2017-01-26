'use strict';

import axios from 'axios';
import {weatherKey} from './apiKeys'

const openweather =
  `http://api.openweathermap.org/data/2.5/weather?APPID=${weatherKey}`;

import {
  RECEIVE_WEATHER
} from '../constants';

export const receiveWeather = (steps) =>
  ({steps, type: RECEIVE_WEATHER});

export const fetchWeather = (lat, lon) =>
  dispatch => {
    axios.get(`${openweather}/&lat=${lat}&lon=${lon}`)
      .then(res => console.log(res))
      .catch(err => console.error('Problem fetching weather', err));
  };
