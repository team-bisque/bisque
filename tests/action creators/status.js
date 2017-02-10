import {expect} from 'chai';

import * as types from '../../src/js/constants';
import * as statusActions from '../../src/js/action-creators/status';

describe('status actions', () => {
  it('should create an action to start work', () => {
    const expectedAction = {
      type: types.START_WORK
    };
    expect(statusActions.startWork()).to.be.deep.equal(expectedAction);
  });

  it('should create an action to start break', () => {
    const expectedAction = {
      type: types.START_BREAK
    };
    expect(statusActions.startBreak()).to.be.deep.equal(expectedAction);
  });
  it('should create an action to set time remaining', () => {
    const timeRemaining = 35;
    const expectedAction = {
      type: types.SET_TIME_REMAINING,
      timeRemaining
    };
    expect(statusActions.setTimeRemaining(timeRemaining)).to.be.deep.equal(expectedAction);
  });
  it('should create an action to add five minutes', () => {
    const expectedAction = {
      type: types.ADD_FIVE_MINUTES
    };
    expect(statusActions.addFiveMinutes()).to.be.deep.equal(expectedAction);
  });
  it('should create an action to toggle work', () => {
    const expectedAction = {
      type: types.TOGGLE_WORK
    };
    expect(statusActions.toggleWork()).to.be.deep.equal(expectedAction);
  })
});

