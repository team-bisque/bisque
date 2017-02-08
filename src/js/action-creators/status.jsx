'use strict';

import {
  SET_TIME_REMAINING,
  ADD_FIVE_MINUTES,
  START_BREAK,
  START_WORK,
  TOGGLE_WORK,
  TOGGLE_PAUSE,
  TOGGLE_LUNCH
} from '../constants';

export const startWork = () => ({type: START_WORK});

export const startBreak = () => ({type: START_BREAK});

export const setTimeRemaining = timeRemaining => ({
  type: SET_TIME_REMAINING, timeRemaining
});

export const addFiveMinutes = () => ({
	type: ADD_FIVE_MINUTES
});

export const toggleWork = () => ({type: TOGGLE_WORK});

export const togglePause = () => ({type: TOGGLE_PAUSE});

export const toggleLunch = () => ({type: TOGGLE_LUNCH});
