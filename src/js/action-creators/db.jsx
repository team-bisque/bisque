import {
  RECEIVE_HISTORY,
  RECEIVE_SETTINGS
} from '../constants';

export const receiveHistory = history => ({ type: 'RECEIVE_HISTORY', history });
export const receiveSettings = settings => ({ type: 'RECEIVE_SETTINGS', settings });
