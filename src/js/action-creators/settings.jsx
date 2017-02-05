'use strict';

import {
  SAVE_SETTINGS,
  SET_START_TIME
} from '../constants';

export const saveSettings = (settings) => ({
  type: SAVE_SETTINGS, settings
});

export const setStartTime = startTime => ({
  type: SET_START_TIME, startTime
});
