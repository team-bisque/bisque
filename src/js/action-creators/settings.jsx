'use strict';

import {
  SET_WORK_DURATION,
  SET_LUNCH_DURATION,
  SET_BREAK_DURATION,
  SAVE_SETTINGS
} from '../constants';

export const setWorkDuration = workDuration => ({
  type: SET_WORK_DURATION, workDuration
});

export const setBreakDuration = breakDuration => ({
  type: SET_BREAK_DURATION, breakDuration
});

export const setLunchDuration = lunchDuration => ({
  type: SET_LUNCH_DURATION, lunchDuration
});

export const saveSettings = urlList => ({
  type: SAVE_SETTINGS, urlList
});

export const setWorkDurationInDb = workDuration => dispatch => {
  dispatch(setWorkDuration(workDuration));
  //db goes here
};

export const setBreakDurationInDb = breakDuration => dispatch => {
  dispatch(setBreakDuration(breakDuration));
  //db goes here
};

export const setLunchDurationInDb = lunchDuration => dispatch => {
  dispatch(setLunchDuration(lunchDuration));
  //db goes here
};

export const saveSettingsInDb = urlList => dispatch => {
  dispatch(saveSettings(urlList));
  //db goes here
};
