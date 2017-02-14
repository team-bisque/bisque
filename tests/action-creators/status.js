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
    expect(statusActions.toggle_work()).to.be.deep.equal(expectedAction);
  })

  it('should create an action to toggle pause', () => {
    const expectedAction = {
      type: types.TOGGLE_PAUSE
    };
    expect(statusActions.togglePause()).to.be.deep.equal(expectedAction);
  });

  it('should create an action to toggle lunch', () => {
    const expectedAction = {
      type: types.TOGGLE_LUNCH
    };
    expect(statusActions.toggleLunch()).to.be.deep.equal(expectedAction);
  });

  it('should create an action to receive durations', () => {
    const settings = 3;
    const expectedAction = {
      type: types.RECEIVE_SETTINGS,
      settings
    };
    expect(statusActions.receive_settings(settings))
      .to.be.deep.equal(expectedAction);
  });

  it('should create an action to set start time', () => {
    const startTime = 10000000;
    const expectedAction = {
      type: types.SET_START_TIME,
      startTime
    };
    expect(statusActions.setStartTime(startTime))
      .to.be.deep.equal(expectedAction);
  });

  it('should create an action to save settings', () => {
    const settings = 3;
    const expectedAction = {type: types.TAB_ALIAS_SET_SETTINGS, settings};
    expect(statusActions.setSettingsAlias(settings))
      .to.be.deep.equal(expectedAction);
  });
});

