'use strict';

import {
  SET_WORK_DURATION,
  SET_LUNCH_DURATION,
  SET_BREAK_DURATION,
  UPDATE_URL_LIST
} from '../constants';


export const setWorkDuration = workDuration => ({
  type: SET_WORK_DURATION,
  workDuration
});

export const setBreakDuration = breakDuration => ({
  type: SET_BREAK_DURATION,
  breakDuration
});

export const setLunchDuration = lunchDuration => ({
  type: SET_LUNCH_DURATION,
  lunchDuration
});

export const updateUrlList = urlList => ({
  type: UPDATE_URL_LIST,
  urlList
})

export const addUrl = () => {type: ADD_URL}

export const setDuration = (type, duration) => dispatch => {
  switch (type) {
    case 'workMinutes':
      dispatch(setWorkDuration(duration));
      break;
    case 'breakMinutes':
      dispatch(setBreakDuration(duration));
      break;
    case 'lunchMinutes':
      dispatch(setLunchDuration(duration));
      break;
  }
  // db stuff goes here
};

export const updateUrlListInDb = urlList => dispatch => {
  dispatch(updateUrlList(urlList));
  //db stuff goes here
}
