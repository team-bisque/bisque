import {expect} from 'chai';
import {createStore} from 'redux';

// import authReducer from '../../src/js/reducers/auth';

const weather = {
  coord: {
    lat: 40.71,
    lon: -74.01
  },
  main: {
    humidity: 100,
    temp: 270.814
  },
  name: 'New York',
  weather: [{
    description: 'overcast clouds',
    id: 804
  }]
};

describe('Auth Reducer', () => {
  let testStore;
  beforeEach('Create test store', () => {
    testStore = createStore(authReducer);
  });

  it('has proper initial state', () => {
    expect(testStore.getState()).to.be.null;
  });
});
