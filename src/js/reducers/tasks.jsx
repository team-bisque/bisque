'use strict';

import {
  RECEIVE_TASK,
  RECEIVE_TASKS,
  REMOVE_TASK,
  COMPLETE_TASK
} from '../constants';

export default (state = [], action) => {
  const newState = Object.assign([], state);

  switch (action.type) {
    case RECEIVE_TASK:
      newState.map(list => {if (list.id === action.taskList) list.data.push(action.task.data)});
      break;
    case RECEIVE_TASKS:
      return action.tasks
    case REMOVE_TASK:
      newState.map(list => {
        if (list.id === action.taskList) list.data.map((task, idx) => {
          if (task.id === action.task) list.data.splice(idx, 1);
        })
      })
      break;
    case COMPLETE_TASK:
      newState.map(list => {
        if (list.id === action.taskList) list.data.map((task, idx) => {
          if (task.id === action.task.id) task.status = 'completed';
        })
      })
      break;
    default:
      return state;
  }

  return newState;
};
