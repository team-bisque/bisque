'use strict';

import axios from 'axios';

import {firebaseConfig} from '../apiKeys';
import store from '../store';
import {
  RECEIVE_TASKS
} from '../constants';

export const receiveTasks = tasks => ({ type: RECEIVE_TASKS, tasks });

export const fetchTasks = (token) =>
  dispatch =>{
  	chrome.identity.getAuthToken({
			interactive: true
		}, token => {
			let config = {
		    headers: {
		      'Authorization': 'Bearer ' + token
		    }
		  }
			axios.get(`https://www.googleapis.com/tasks/v1/users/@me/lists?key=${firebaseConfig.apiKey}`, config)
        .then(req => {
          console.log(req);
          dispatch(receiveTasks('burp'));
        })
        .catch(err => console.error(err));
     }) 
		
	}
      
