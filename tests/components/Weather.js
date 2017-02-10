import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Weather from '../../src/js/components/Weather';

const testWeather = {
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

	let weather;

	beforeEach('Create component and spy', () => {
		weather = shallow(<Weather weather={testWeather} />);
	});

  it('has expected props', () => {
    console.log(weather.props());
    expect(weather.props().weather).to.be.defined;
    expect(weather.props().weather.temp).to.be.equal(testWeather.main.temp);
    expect(weather.props().weather.name).to.be.equal(testWeather.name);
    expect(weather.props().weather.weather[0].id).to.be.equal(testWeather.weather[0].id);
  });

	it('shows the appropriate weather icon', () => {
    const icon = weather.find('i');
		expect(icon).to.have.length(1);
	});
});
