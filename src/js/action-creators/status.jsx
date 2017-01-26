'use strict';

import {
  TOGGLE_WORK,
  RECEIVE_LUNCH_TIME,
  RECEIVE_CURRENT_TIME
} from '../constants';

export const toggleWork = () =>
  ({type: TOGGLE_WORK});

export const receiveLunchTime = (lunchTime) =>
  ({lunchTime, type: RECEIVE_LUNCH_TIME});

export const receiveCurrentTime = (currentTime) =>
  ({currentTime, type: RECEIVE_CURRENT_TIME});
