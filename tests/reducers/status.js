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
      nuclear: false,
      durations: {
        workDuration: 25 * minute,
        breakDuration: 5 * minute,
        lunchDuration: 60 * minute
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

  it('starts a break', () => {
    const initialState = {
      timeRemaining: 0,
      isWorking: true,
      isPaused: true,
      durations: {
        breakDuration: 15
      }
    }
    const action = {type: types.START_BREAK};
    const expectedState = {
      timeRemaining: 15,
      isWorking: false,
      isPaused: false,
      durations: {
        breakDuration: 15
      }
    }
    expect(reducer(initialState, action))
      .to.be.deep.equal(expectedState);
  });

  it('starts work', () => {
    const initialState = {
      timeRemaining: 0,
      isWorking: false,
      isPaused: true,
      durations: {
        workDuration: 20
      }
    };
    const action = {type: types.START_WORK};
    const expectedState = {
      timeRemaining: 20,
      isWorking: true,
      isPaused: false,
      durations: {
        workDuration: 20
      }
    };
    expect(reducer(initialState, action))
      .to.be.deep.equal(expectedState);
  });

  it('toggles work from break to work', () => {
    const initialState = {
      timeRemaining: 15,
      isWorking: false,
      isPaused: true,
      durations: {
        workDuration: 20
      }
    };
    const action = {type: types.TOGGLE_WORK};
    const expectedState = {
      timeRemaining: 20,
      isWorking: true,
      isPaused: false,
      durations: {
        workDuration: 20
      }
    };
    expect(reducer(initialState, action))
      .to.be.deep.equal(expectedState);
  });

  it('toggles work from work to break', () => {
    const initialState = {
      timeRemaining: 25,
      isWorking: true,
      isPaused: true,
      durations: {
        breakDuration: 10
      }
    };
    const action = {type: types.TOGGLE_WORK};
    const expectedState = {
      timeRemaining: 10,
      isWorking: false,
      isPaused: false,
      durations: {
        breakDuration: 10
      }
    };
    expect(reducer(initialState, action))
      .to.be.deep.equal(expectedState);
  });

  it('toggles pause from paused to unpaused', () => {
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

  it('toggles pause from unpaused to paused', () => {
    const initialState = {
      isPaused: false
    };
    const togglePauseState = {
      isPaused: true
    };
    const togglePauseAction = {
      type: types.TOGGLE_PAUSE
    }
    expect(reducer(initialState, togglePauseAction)).to.be.deep.equal(togglePauseState);
  });

  it('receives durations', () => {
    const initialState = {
      durations: {
        breakDuration: 10,
        workDuration: 15,
        lunchDuration: 30
      }
    };
    const durations = {
      breakDuration: 15,
      workDuration: 20,
      lunchDuration: 35
    };
    const expectedState = {durations};
    const action = {
      type: types.RECEIVE_DURATIONS,
      durations
    };
    expect(reducer(initialState, action))
      .to.be.deep.equal(expectedState);
  });
});
