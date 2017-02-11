'use strict';

import axios from 'axios';
import {firebaseConfig} from '../apiKeys';
import store from '../store';

import {
  RECEIVE_TASKS,
	RECEIVE_TASK,
	REMOVE_TASK,
	COMPLETE_TASK,
	TAB_ALIAS_ADD_TASK,
	TAB_ALIAS_REMOVE_TASK,
	TAB_ALIAS_COMPLETE_TASK
} from '../constants';

export const receiveTask = (task, taskList) => ({ type: RECEIVE_TASK, task, taskList });
export const removeTask = (task, taskList) => ({ type: REMOVE_TASK, task, taskList });
export const completeTask = (task, taskList) => ({ type: COMPLETE_TASK, task, taskList });
export const receiveTasks = tasks => ({ type: RECEIVE_TASKS, tasks });

export const tabAddTask = (task, taskList) => ({
	type: TAB_ALIAS_ADD_TASK,
	task,
	taskList
})

export const tabRemoveTask = (task, taskList) => ({
	type: TAB_ALIAS_REMOVE_TASK,
	task,
	taskList
})

export const tabCompleteTask = (task, taskList) => ({
	type: TAB_ALIAS_COMPLETE_TASK,
	task,
	taskList
})

export const fetchTasks = () => dispatch => {
	// The Google Tasks API requires us to get all of a user's tasklists
	// And separately request all of the tasks in that list, requiring two AJAX requests
	chrome.identity.getAuthToken({interactive: true}, token => {
		let config = { headers: { 'Authorization': 'Bearer ' + token } }
		axios.get(`https://www.googleapis.com/tasks/v1/users/@me/lists?key=${firebaseConfig.apiKey}`, config)
		.then(taskLists => {
			const taskIds = taskLists.data.items.map(list => {return {id: list.id, title: list.title}})
			const taskRequests = taskIds.map(list => {
					return axios.get(`https://www.googleapis.com/tasks/v1/lists/${list.id}/tasks?key=${firebaseConfig.apiKey}`, config)
					.then(task => {
						const title = list.title;
						const id = list.id;
						return {title, id, data: task.data.items}
						}
					)
			})
			return axios.all(taskRequests)
		})
		.then(tasks => {
			dispatch(receiveTasks(tasks));
		})
		.catch(err => console.error(err));
	})
}

export const createNewTask = payload => dispatch => {
	const taskList = payload.taskList, task = payload.task;
	chrome.identity.getAuthToken({interactive: true}, token => {
		let config = { headers: { 'Authorization': 'Bearer ' + token } }
		axios.post(`https://www.googleapis.com/tasks/v1/lists/${taskList}/tasks?key=${firebaseConfig.apiKey}`, task, config)
		.then(newTask => {
			const taskListToAdd = taskList;
			dispatch(receiveTask(newTask, taskListToAdd))
		})
		.catch(err => console.error(err));
	})
}

export const deleteTask = payload => dispatch => {
	const task = payload.task, taskList = payload.taskList;
	dispatch(removeTask(task, taskList));
	chrome.identity.getAuthToken({interactive: true}, token => {
		let config = { headers: { 'Authorization': 'Bearer ' + token } }
		axios.delete(`https://www.googleapis.com/tasks/v1/lists/${taskList}/tasks/${task}/?key=${firebaseConfig.apiKey}`, config)
		.catch(err => console.error(err));
	})
}

export const finishTask = payload => dispatch => {
	const task = payload.task, taskList = payload.taskList;
	dispatch(completeTask(task, taskList));
		chrome.identity.getAuthToken({interactive: true}, token => {
		let config = { headers: { 'Authorization': 'Bearer ' + token } }
		axios.put(`https://www.googleapis.com/tasks/v1/lists/${taskList}/tasks/${task.id}/?key=${firebaseConfig.apiKey}`, task, config)
		.catch(err => console.error(err));
	})
}