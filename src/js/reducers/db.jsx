
import {
  RECEIVE_DATA,
} from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.data;
    default:
      return state;
  }
};
