'use strict';

import axios from 'axios';

import {tasksKey} from '../apiKeys';

import {
  RECEIVE_TASKS
} from '../constants';

export const receiveTasks = tasks => ({ type: RECEIVE_TASKS, tasks });

export const fetchTasks = () =>
  dispatch =>
    axios.get(`https://www.googleapis.com/tasks/v1/users/@me/lists?key=${tasksKey}`)
      .then(req => {
        console.log(req);
        dispatch(receiveTasks('burp'));
      })
      .catch(err => console.error(err));
