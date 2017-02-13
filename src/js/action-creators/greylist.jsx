'use strict';
import store from '../store';
import _ from 'lodash';
import {
  ADD_URL,
  REMOVE_URL,
  EDIT_URL,
  RECEIVE_GREYLIST,
  TAB_ALIAS_ADD_GREYLIST,
  TAB_ALIAS_REMOVE_GREYLIST,
  TAB_ALIAS_EDIT_GREYLIST,
  TAB_ALIAS_SET_LOCK
} from '../constants';

import { firebaseDb } from '../firebase';


// ACTIONS
export const receive_greylist = greylist => ({
  type: RECEIVE_GREYLIST, greylist
})

export const addUrl = greylist => ({
  type: ADD_URL, greylist
});

export const removeUrl = index => ({
  type: REMOVE_URL, index
});

export const editUrl = (greylist, index) => ({
  type: EDIT_URL, greylist, index
});

// ALIAS ACTIONS
export const tabAddGreylist = greylist => ({
  type: TAB_ALIAS_ADD_GREYLIST,
  greylist
});

export const tabRemoveGreylist = index => ({
  type: TAB_ALIAS_REMOVE_GREYLIST,
  index
});

export const tabEditGreylist = (greylist, index) => ({
  type: TAB_ALIAS_EDIT_GREYLIST,
  greylist, index
});

export const setAllLockAlias = bool => ({
  type: TAB_ALIAS_SET_LOCK,
  bool
})

export const setGreylist = () => dispatch => {
  // User.greylist.set(store.getState().auth.uid, store.getState().settings);
};

export const receiveGreylist = () => (dispatch, getState)=>{
  const ref = firebaseDb.ref(`users/${getState().auth.uid}/greylist`);
  ref.once('value', (snapshot) => {
    // console.log('receiveGreylist: snapshop', snapshot.val())
    dispatch(receive_greylist(snapshot.val()));
  });
};

// User function balance with action-creator
export const addGreylist = payload => (dispatch, getState) => {
  const ref = firebaseDb.ref(`users/${getState().auth.uid}/greylist`);  
  let data = Array.from(getState().greylist);
      data.push(payload.greylist);

  ref.set(data)
      .then(()=>{
        dispatch(addUrl(payload.greylist));
      })
      .catch(console.error);
}

export const removeGreylist = payload => (dispatch, getState) => {
  const ref = firebaseDb.ref(`users/${getState().auth.uid}/greylist`);  
  let data = getState().greylist.filter((e, i) => i !== payload.index);
  ref.set(data)
      .then(()=>{
        dispatch(removeUrl(payload.index));
      })
      .catch(console.error);
}

export const editGreylist = payload => (dispatch, getState) => {
  const ref = firebaseDb.ref(`users/${getState().auth.uid}/greylist`);    
  let data = Array.from(getState().greylist);
      data[payload.index] = payload.greylist;

  ref.set(data)
      .then(()=>{
        dispatch(editUrl(payload.greylist, payload.index));
      })
      .catch(console.error);
}

export const setAllLock = payload => (dispatch, getState) => {
  let greylists = _.map(getState().greylist, (o) => {
    o.isBlocked = payload.bool;
    return o;
  });

  const ref = firebaseDb.ref(`users/${getState().auth.uid}/greylist`);
  ref.set(greylists)
    .then(()=>{
      dispatch(receiveGreylist());
    });        
}

