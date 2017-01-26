'use strict';

import {
  RECEIVE_STEPS
} from '../constants';

export const receiveSteps = (steps) =>
  ({steps, type: RECEIVE_STEPS});
