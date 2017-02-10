import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Spy wrapper for chrome functions
// Activate only when testing or you will not be able to build
// const chrome = require('sinon-chrome/extensions');

import Timer from '../../src/js/components/Timer';
import statusReducer from '../../src/js/reducers/status';

const minute = 60000;

const store = {
	status: {
		timeRemaining: 1 * minute,
		isWorking: true,
		isPaused: false,
	}
};

describe('<Timer>', () => {

	let timer, testStore;

	beforeEach('Create component and spy', () => {
		testStore = createStore(statusReducer);

		timer = shallow(
			<Provider store={testStore}>
				<Timer status={testStore.getState()} />
			</Provider>
		);
	});

	it('has the expected props', () => {
		expect(timer.props().status.timeRemaining).to.be.defined;
		expect(timer.props().status.isWorking).to.be.defined;
		expect(timer.props().status.isPaused).to.be.defined;
		expect(timer.props().status.addFiveMinutes).to.be.defined;
		expect(timer.props().status.togglePause).to.be.defined;
		expect(timer.props().status.toggleWork).to.be.defined;
	});

	// it('pauses the timer', () => {
	// 	timer.simulate('click');
	//
	// 	expect(togglePauseSpy.called).to.be.true();
	// });
});
