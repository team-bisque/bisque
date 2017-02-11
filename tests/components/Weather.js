import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { Provider } from 'react-redux';
import { createStore } from 'redux'

import Weather from '../../src/js/components/Weather';
import weatherReducer from '../../src/js/reducers/weather';
import * as types from '../../src/js/constants';

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

describe('<Weather/>', () => {

	let weatherSpy, testStore, action;

	beforeEach('Create component and spy', () => {
    testStore = createStore(weatherReducer);
    action = {
      type: types.RECEIVE_WEATHER,
      weather
    };
    testStore.dispatch(action);
		weatherSpy = shallow(
      <Provider store={testStore}>
        <Weather weather={testStore.getState()} />
      </Provider>
    );
	});

  it('has expected props', () => {
    expect(weatherSpy.props().weather).to.be.defined;
    expect(weatherSpy.props().weather.main.temp).to.be.equal(weather.main.temp);
    expect(weatherSpy.props().weather.name).to.be.equal(weather.name);
    expect(weatherSpy.props().weather.weather[0].id).to.be.equal(weather.weather[0].id);
  });

  it('shows a weather icon', () => {
    const icon = weatherSpy.dive().find('i');
		expect(icon).to.have.length(1);
	});
});
