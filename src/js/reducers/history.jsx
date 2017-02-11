'ues strict';
import {
  RECEIVE_HISTORY,
  SET_HISTORY
} from '../constants';

const moment = require('moment');
const _ = require('lodash');


export default (history = null, action) => {
	let newState = Object.assign({}, history);
  switch (action.type) {
    case RECEIVE_HISTORY:
      return action.history;
    case SET_HISTORY: 
    	let date = moment(action.time).format('MM-DD-YYYY'),
					hour = action.time.getHours(),
					data = action.data;

					if(action.index <= 0){
						newState[date][hour].push(data)
					} else {
						newState[date][hour][index] = action.data;
					}

    	return newState;

    default:
      return history;
  }
};
