'use strict';
import {
	TAB_ALIAS_RECEIVE_HISTORY,
  RECEIVE_HISTORY,
  SET_HISTORY,
  SET_VISITS,
  INCREASE_VISIT
} from '../constants';

import { firebaseDb } from '../firebase';
const moment = require('moment');


export const tabReceiveHistory = () => ({
	type: TAB_ALIAS_RECEIVE_HISTORY
});

export const receive_history = history => ({ type: RECEIVE_HISTORY, history });

export const setSiteVisits = visits => ({ type: SET_VISITS, visits });


export const receiveHistory = () => (dispatch, getState) => {
	// Action-creators/history receiveHistory
  const ref = firebaseDb.ref(`users/${getState().auth.uid}/history`);
  ref.once('value', (snapshot) => {
  	// console.log('receiveHistory: snapshop', snapshot.val())
    dispatch(receive_history(snapshot.val()));
  });
};

const set_history = (time, index, data) => ({
  type: SET_HISTORY,
  time, index, data
})

const increase_visits = (time, index, visits) => ({
  type: INCREASE_VISIT,
  time, index, visits
})
export const increaseVisits = (time, url) => (dispatch, getState) => {
  // Action-creators/status increaseVisits  
  const date = moment(time).format('MM-DD-YYYY'),
        hour = time.getHours(),
        history = getState().history;
  // console.log('increaseVisits: snapshop',time, url);

  let index = -1;
  // console.log(date, hour);
  if(history && history[date] && history[date][hour]) index = _.findIndex(history[date][hour], o => o.url === url);

  if(index >= 0){
    // console.log('exist!!!!', index);
    const historyRef = firebaseDb.ref(`users/${getState().auth.uid}/history`),
          refPath = `${date}/${hour}/${index}/visits`,
          ref = historyRef.child(refPath);

    let visits = history[date][hour][index].visits + 1;
    ref.set(visits)
      .then(()=>{
        // ref.off();
        dispatch(increase_visits(time, index, visits));
      })
      .catch(console.error);
    
  } else {
    dispatch(setHistory(time, {url: url, visits: 1}));
  }
    
        
}
export const setHistory = (time, data) => (dispatch, getState) => {
	// Action-creators/status setHistory  
  const date = moment(time).format('MM-DD-YYYY'),
        hour = time.getHours(),
        history = getState().history;

  function isGreylist (url) {

    let result = false;
    getState().greylist.forEach(greylist => {
      console.log(greylist)
      if(greylist.url.includes(url.replace('www.',''))) result = true;
    })
    return result;
  }

  let index = -1;
  if(history && history[date] && history[date][hour]) {
      index = _.findIndex(history[date][hour], o => o.url === data.url);
  }

  if(index >= 0){
    let prevData = history[date][hour][index];
    // get average value
    if(data.cpm && prevData.cpm) data.cpm =  _.mean([data.cpm, prevData.cpm]);
    if(data.cpm && prevData.wpm) data.wpm =  _.mean([data.cpm, prevData.wpm]);
      
    if(!data.visits) data.visits = prevData.visits;
    if(!data.isGreylist) data.isGreylist = prevData.visits;
  } else {
    if(!data.visits) data.visits = 1;
    if(!data.isGreylist) data.isGreylist = isGreylist(data.url);
    if(history && history[date] && history[date][hour] && history[date][hour].length) {
      // console.log('history[date][hour].length', history[date][hour].length);
      index = parseInt(_.max(Object.keys(history[date][hour]))) + 1;
    }
    else index = 0
  }
    const historyRef = firebaseDb.ref(`users/${getState().auth.uid}/history`),
          refPath = `${date}/${hour}/${index}`,
          ref = historyRef.child(refPath);

    
    ref.set(data)
      .then(()=>{
        // ref.off();
        dispatch(set_history(time, index, data));
      })      
      .catch(console.error);      
    
  
};