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
  TAB_ALIAS_EDIT_GREYLIST
} from '../constants';

import { firebaseDb } from '../firebase';


// ACTIONS
export const receive_greylist = greylist => ({
  type: RECEIVE_GREYLIST, greylist
})

export const addUrl = url => ({
  type: ADD_URL, url
});

export const removeUrl = index => ({
  type: REMOVE_URL, index
});

export const editUrl = (url, index) => ({
  type: EDIT_URL, url, index
});

// ALIAS ACTIONS
export const tabAddGreylist = url => ({
  type: TAB_ALIAS_ADD_GREYLIST,
  url
});

export const tabRemoveGreylist = index => ({
  type: TAB_ALIAS_REMOVE_GREYLIST,
  index
});

export const tabEditGreylist = (url, index) => ({
  type: TAB_ALIAS_EDIT_GREYLIST,
  url, index
});

export const setGreylist = () => dispatch => {
  User.greylist.set(store.getState().auth.uid, store.getState().settings);
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
      data.push(payload.url);

  ref.set(data)
      .then(()=>{
        dispatch(addUrl(payload.url));
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

export const editGreylist = payload => dispatch => {
  const ref = firebaseDb.ref(`users/${getState().auth.uid}/greylist`);    
  let data = Array.from(store.getState().greylist);
      data[payload.index] = payload.url;

  ref.set(data)
      .then(()=>{
        dispatch(editUrl(payload.url, payload.index));
      })
      .catch(console.error);
}


