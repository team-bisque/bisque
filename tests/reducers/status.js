import {expect} from 'chai';

import * as types from '../../src/js/constants';
import reducer from '../../src/js/reducers/status';

describe('Status Reducer ', () => {

  const minute = 60 * 1000;

  it('has proper initial state', () => {
    const initialState = {
      timeRemaining: 0,
      isWorking: false,
      isPaused: true,
      durations: {
        workDuration: 8 * minute,
        breakDuration: 6 * minute,
        lunchDuration: 30 * minute
      }
    };
    expect(reducer(undefined, {}))
      .to.be.deep.equal(initialState);
  });

  it('sets time remaining', () => {
    let timeRemaining = 31;
    let setTimeAction = {
      type: types.SET_TIME_REMAINING,
      timeRemaining
    };
    expect(reducer({}, setTimeAction)).to.be.deep.equal({timeRemaining: 31});

    timeRemaining = 67;
    setTimeAction = {
      type: types.SET_TIME_REMAINING,
      timeRemaining
    };
    expect(reducer({}, setTimeAction)).to.be.deep.equal({timeRemaining: 67});
  });

  it('adds five minutes', () => {
    const initialState = {
      timeRemaining: 8 * minute
    };
    const action = {type: types.ADD_FIVE_MINUTES};
    const expectedState = {
      timeRemaining: 13 * minute
    };
    expect(reducer(initialState, action))
      .to.be.deep.equal(expectedState);
  })

  it('toggles pause', () => {
    const initialState = {
      isPaused: true
    };
    const togglePauseState = {
      isPaused: false
    };
    const togglePauseAction = {
      type: types.TOGGLE_PAUSE
    }
    expect(reducer(initialState, togglePauseAction)).to.be.deep.equal(togglePauseState);
  });
});
