'use strict';

import {
  SAVE_SETTINGS
} from '../constants';

export const saveSettings = (settings) => ({
  type: SAVE_SETTINGS, settings
});
