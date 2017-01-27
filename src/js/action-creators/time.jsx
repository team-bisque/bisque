'use strict';

import {
	WORK_DURATION,
	BREAK_DURATION,
	EAT_DURATION,
	ADD_FIVE_MINUTES,
	HALT_BACKGROUND,
	START_TIME
} from '../constants';

// Sync
export const set_work_duration = workDuration =>
	({ type: WORK_DURATION, workDuration });

export const set_break_duration = breakDuration =>
	({ type: BREAK_DURATION, breakDuration });

export const set_eat_duration = eatDuration =>
	({ type: EAT_DURATION, eatDuration });

export const addFiveMinutes = () =>
  ({type: ADD_FIVE_MINUTES});

export const haltBackground = () =>
  ({type: HALT_BACKGROUND});


// Async
export const setWorkDuration = workDuration => dispatch => {
	dispatch(set_work_duration(workDuration))
};
export const setBreakDuration = breakDuration => dispatch => {
	dispatch(set_break_duration(breakDuration))
};
export const setEatDuration = eatDuration => dispatch => {
	dispatch(set_eat_duration(eatDuration))
};
