'use strict';

import {expect} from 'chai';

import * as types from '../../src/js/constants';
import reducer from '../../src/js/reducers/tasks';

describe('Tasks reducer', () => {

  it('has a null initial state', () => {
    const action = {type: 'livin la vida reduxa'};
    const expectedState = null;
    expect(reducer(undefined, action))
      .to.be.equal(null);
  });

  it('receives tasks', () => {
    const tasks = [
      'learn angular',
      'play with elm'
    ];
    const action = {
      type: types.RECEIVE_TASKS,
      tasks
    };
    expect(reducer(undefined, action))
      .to.be.deep.equal(tasks);
  });
});
