import {expect} from 'chai';
import {createStore, combineReducers} from 'redux';

// import statusReducer from '../../src/js/reducers/status';
// import settingsReducer from '../../src/js/reducers/settings';

describe('Status Reducer', () => {

  let testStore;

  beforeEach('Create test store', () => {
    let testRoot = combineReducers({settingsReducer, statusReducer})
    testStore = createStore(testRoot);
    console.log(testStore);
  });

  it('has proper initial state', () => {
    let newState = testStore.getState();

    expect(newState.isWorking).to.be.false();
    expect(newState.isPaused).to.be.false();
    expect(newState.timeRemaining).to.be.equal(0);
  });
});
