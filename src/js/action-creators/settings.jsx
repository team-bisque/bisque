'use strict';

import {
  SET_WORK_DURATION,
  SET_LUNCH_DURATION,
  SET_BREAK_DURATION,
  SET_START_TIME,
  ADD_URL,
  REMOVE_URL,
  EDIT_URL
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

export const setStartTime = startTime => ({
  type: SET_START_TIME, startTime
});

export const addUrl = url => {
  return {
    type: ADD_URL,
    url
  }
}

export const removeUrl = index => {
  return {
    type: REMOVE_URL,
    index
  }
}

export const editUrl = (url, index) => {
  return {
    type: EDIT_URL,
    url,
    index
  }
}
