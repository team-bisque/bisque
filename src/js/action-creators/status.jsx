'use strict';

import {
  TOGGLE_WORK,
  TOGGLE_PAUSE,
  TOGGLE_LUNCH
} from '../constants';

export const toggleWork = () =>
  ({type: TOGGLE_WORK});

export const togglePause = () =>
  ({type: TOGGLE_PAUSE});

export const toggleLunch = () =>
  ({type: TOGGLE_LUNCH});
