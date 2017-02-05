
import {
  RECEIVE_HISTORY,
  RECEIVE_SETTINGS
} from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case RECEIVE_HISTORY:
      return action.history;

    case RECEIVE_SETTINGS:
      return action.settings;

    default:
      return state;
  }
};
