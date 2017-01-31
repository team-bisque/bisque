'use strict';

import {
  SET_WORK_DURATION,
  SET_LUNCH_DURATION,
  SET_BREAK_DURATION,
  SET_TIME_REMAINING,
  ADD_FIVE_MINUTES,
} from '../constants';

export const setWorkDuration = workDuration => ({
  type: SET_WORK_DURATION, workDuration
});

export const setBreakDuration = breakDuration => ({
  type: SET_BREAK_DURATION, breakDuration
});

export const setLunchDuration = lunchDuration => ({
  type: SET_LUNCH_DURATION, lunchDuration

export const setTimeRemaining = timeRemaining => ({
  type: SET_TIME_REMAINING,
  timeRemaining
});

export const addFiveMinutes = () => ({
	type: ADD_FIVE_MINUTES
});
