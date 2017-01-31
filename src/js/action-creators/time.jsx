'use strict';

import {
	WORK_DURATION,
	LUNCH_DURATION,
	BREAK_DURATION,
	SET_TIME_REMAINING,
	ADD_FIVE_MINUTES,
	HALT_BACKGROUND
} from '../constants';

export const receiveWorkDuration = workDuration => ({
	type: WORK_DURATION,
	workDuration
});

export const receiveBreakDuration = breakDuration => ({
	type: BREAK_DURATION,
	breakDuration
});

export const receiveLunchDuration = lunchDuration => ({
	type: LUNCH_DURATION,
	lunchDuration
});

export const setTimeRemaining = timeRemaining => ({
	type: SET_TIME_REMAINING,
	timeRemaining
});

export const addFiveMinutes = () => ({
	type: ADD_FIVE_MINUTES
});
