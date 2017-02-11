'use strict';
import {
	TAB_ALIAS_RECEIVE_HISTORY,
  RECEIVE_HISTORY,
  SET_HISTORY,
  SET_VISITS
} from '../constants';

import { firebaseDb } from '../firebase';
const moment = require('moment');
const historyRef = firebaseDb.ref('user_history');

export const tabReceiveHistory = () => ({
	type: TAB_ALIAS_RECEIVE_HISTORY
});

const receive_history = history => ({ type: RECEIVE_HISTORY, history });

const setSiteVisits = visits => ({ type: SET_VISITS, visits });


export const receiveHistory = () => (dispatch, getState) => {
	// Action-creators/history receiveHistory
  const ref = historyRef.child(getState().auth.uid);
  ref.once('value', (snapshot) => {
  	// console.log('receiveHistory: snapshop', snapshot.val())
    dispatch(receive_history(snapshot.val()));
  });
};

const set_history = (time, index, data) => ({
  type: SET_HISTORY,
  time, index, data
})

export const setHistory = (time, data) => (dispatch, getState) => {
	// Action-creators/status setHistory  
  const date = moment(time).format('MM-DD-YYYY'),
        hour = time.getHours(),
        refPath = `${getState().auth.uid}/${date}/${hour}`,
        ref = historyRef.child(refPath),
        history = getState().history;

  let index = 0;

  function isGreylist (url) {

    let result = false;
    getState().greylist.forEach(greylist => {
      console.log(greylist)
      if(greylist.includes(url.replace('www.',''))) result = true;
    })
    return result;
  }

  if(!history[date][hour]) {
    if(!data.visits)     data.visits = 1;
    if(!data.isGreylist) data.isGreylist = isGreylist(data.url);
  } else {
    index = _.findIndex(history[date][hour], o => o.url === data.url);
    if(index === -1) {
      if(!data.visits) data.visits = 1;
      if(!data.isGreylist) data.isGreylist = isGreylist(data.url);
    }else {
      if(!data.visits) data.visits = history[date][hour][index].visits;
      if(!data.isGreylist) data.isGreylist = history[date][hour][index].visits;
    }
  }

  console.log('setDuration: snapshop',time, data)
  ref.on('value', snapshot => {    
    ref.set(data)
      .then(()=>{
        ref.off();                
        dispatch(set_history(time, index, data));        
      })      
      .catch(console.error);
  });
};