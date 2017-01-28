'use strict';

import {
	WORK_DURATION,
	LUNCH_DURATION,
	BREAK_DURATION,
} from '../constants';

export const receiveWorkDuration = workDuration => ({
	type: WORK_DURATION, workDuration
});

export const receiveBreakDuration = breakDuration => ({
	type: BREAK_DURATION, breakDuration
});

export const receiveLunchDuration = eatDuration => ({
	type: LUNCH_DURATION, eatDuration
});
