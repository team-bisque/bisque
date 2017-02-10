'use strict';
// import store from '../store';
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

export const addUrl = url => ({
  type: ADD_URL, url
});

export const removeUrl = index => ({
  type: REMOVE_URL, index
});

export const editUrl = (url, index) => ({
  type: EDIT_URL, url, index
});

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


export const receiveGreylist = greylist => ({
  type: RECEIVE_GREYLIST, greylist
})

// export const setGreylist = () => dispatch => {
//   User.greylist.set(store.getState().auth.uid, store.getState().settings);
// };

// // User function balance with action-creator
// export const addGreylist = payload => dispatch => {
//   const User = require('../controllers/user');
//   const userId = store.getState().auth.uid;

//   let data = Array.from(store.getState().greylist);
//       data.push(payload.url);
//   User.greylist.set(userId, data)
//     .then(() => User.settings.getById(userId));
// }

// export const removeGreylist = payload => dispatch => {
//   const User = require('../controllers/user');
//   const userId = store.getState().auth.uid;

//   let data = store.getState().greylist.filter((e, i) => i !== payload.index);
//   User.greylist.set(userId, data)
//     .then(() => User.settings.getById(userId));
// }

// export const editGreylist = payload => dispatch => {
//   const User = require('../controllers/user');
//   const userId = store.getState().auth.uid;

//   let data = Array.from(store.getState().greylist);
//       data[payload.index] = payload.url;

//       console.log(data)
//   User.greylist.set(userId, data)
//     .then(() => User.settings.getById(userId));
// }


