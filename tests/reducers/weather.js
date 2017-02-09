import {expect} from 'chai';
import {createStore} from 'redux';

import weatherReducer from '../../src/js/reducers/weather';

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

describe('Weather Reducer', () => {
  let testStore;
  beforeEach('Create test store', () => {
    testStore = createStore(weatherReducer);
  });

  it('has proper initial state', () => {
    expect(testStore.getState()).to.be.null;
  });

  it('can receive today’s weather report', () => {
    testStore.dispatch({type: 'RECEIVE_WEATHER', weather});
    let newState = testStore.getState();
    expect(newState).to.be.deep.equal(weather);
  });
});
