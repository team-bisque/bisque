'ues strict';
import {
  RECEIVE_HISTORY,
  SET_HISTORY,
  INCREASE_VISIT
} from '../constants';

const moment = require('moment');
const _ = require('lodash');


export default (history = null, action) => {
	let newState = Object.assign({}, history);
  switch (action.type) {
    case RECEIVE_HISTORY:
      return action.history;
    case SET_HISTORY: 
    	var date = moment(action.time).format('MM-DD-YYYY'),
					hour = action.time.getHours();

					if(action.index <= 0){
            newState[date] = {}
            newState[date][hour] = [];
						newState[date][hour].push(action.data)
					} else {
						newState[date][hour][action.index] = action.data;
					}

    	return newState;

    case INCREASE_VISIT:
    	var date = moment(action.time).format('MM-DD-YYYY'),
					hour = action.time.getHours();

					newState[date][hour][action.index].visits = action.visits;

    	return newState;
    default:
      return history;
  }
};
