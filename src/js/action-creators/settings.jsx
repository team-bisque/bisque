'use strict';

import {
  SAVE_SETTINGS
} from '../constants';

export const saveSettings = (settings) => ({
  type: SAVE_SETTINGS, settings
});

export const saveSettingsToDb = settings => dispatch => {
  dispatch(saveSettings(settings));
  // firebase goes here
};
