'use strict';

const User = require('../controllers/user');

import store from '../store';
import _ from 'lodash';
import {  
  ADD_URL,
  REMOVE_URL,
  EDIT_URL,
  RECEIVE_GREYLIST,
  TAB_ALIAS_SAVE_SETTINGS
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

export const tabSaveSettings = () => ({
  type: TAB_ALIAS_SAVE_SETTINGS  
});

export const receiveGreylist = greylist => ({
  type: RECEIVE_GREYLIST, greylist
})

export const setGreylist = () => dispatch => {  
  User.greylist.set(store.getState().auth.uid, store.getState().settings);
};

export const addGreylist = url => dispatch => {
  // we will need to validate weather input url already exist;
  var maxKey = _.maxBy(store.getState().greylist, o => Object.keys(o));
  console.log('max key and new id', maxKey);
  store.dispatch(addUrl({[maxKey+1]:url}));
}




