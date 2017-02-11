import {
	TAB_ALIAS_RECEIVE_HISTORY,
  RECEIVE_HISTORY,
  SET_VISITS
} from '../constants';

import { firebaseDb } from '../firebase';
const historyRef = firebaseDb.ref('user_history');

export const tabReceiveHistory = () => ({
	type: TAB_ALIAS_RECEIVE_HISTORY
});

export const receive_history = history => ({ type: RECEIVE_HISTORY, history });

export const setSiteVisits = visits => ({ type: SET_VISITS, visits });

export const receiveHistory = () => (dispatch, getState) => {
  const ref = historyRef.child(getState().auth.uid);
  ref.once('value', (snapshot) => {	      
    dispatch(receive_history(snapshot.val()));
  });
};

export const setHistory = (key, value) => (dispatch, getState) => {
	const ref = historyRef.child(getState().auth.uid);
	return new Promise((resolve, reject) => {
    ref.set(value, error => error ? reject(error) : resolve());
  });
};