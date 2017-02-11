'use strict';

import {expect} from 'chai';

import * as types from '../../src/js/constants';
import * as tasksActionCreators from '../../src/js/action-creators/tasks'

describe('tasks action creators', () => {

  it('receive tasks', () => {
    const tasks = [
      'pay bills',
      'walk dog',
      'learn how to test action creators'
    ];
    const expectedAction = {
      type: types.RECEIVE_TASKS,
      tasks
    };
    expect(tasksActionCreators.receiveTasks(tasks))
      .to.be.deep.equal(expectedAction);
  });
});
