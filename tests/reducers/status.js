import {expect} from 'chai';
// import {createStore, combineReducers} from 'redux';

import * as types from '../../src/js/constants';

import reducer from '../../src/js/reducers/status';
// import store from '../../src/js/store';

describe('Status Reducer (currently only works if you comment out the import store and the START_WORK, START_BREAK, and TOGGLE_WORK cases in the reducer)', () => {

  // let testStore;

  // beforeEach('Create test store', () => {
  //   let testRoot = combineReducers({status})
  //   testStore = createStore({testRoot});
  // });

  // beforeEach('create initial state', () => {
  //   const nonsenseAction = {type: 'nonsense'};
  //   reducer(undefined, nonsenseAction);
  // })

  // it('has proper initial state', () => {
  //   let newState = testStore.getState();

  //   expect(newState.isWorking).to.be.false();
  //   expect(newState.isPaused).to.be.false();
  //   expect(newState.timeRemaining).to.be.equal(0);
  // });

  it('has proper initial state', () => {
    const initialState = {
      timeRemaining: 0,
      isWorking: false,
      isPaused: true,
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
