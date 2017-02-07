
import {
  RECEIVE_HISTORY
} from '../constants';

export default (history = null, action) => {
  switch (action.type) {
    case RECEIVE_HISTORY:
      return action.history;

    default:
      return history;
  }
};
