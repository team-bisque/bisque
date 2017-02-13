import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {Tooltip} from 'react-bootstrap';

import {TestableTimer} from '../../src/js/components/Timer';
import Donut from '../../src/js/components/Timer/Donut';
import statusReducer from '../../src/js/reducers/status';
import * as types from '../../src/js/constants';

const minute = 60000;

describe('<Timer>', () => {

	let timerSpy, testStore, action

	beforeEach('Create component and spy', () => {
		testStore = createStore(statusReducer);
		action = {type: 'give me your tired, your poor, your global states yearning to be hydrated'};
		testStore.dispatch(action);
		timerSpy = shallow(
			<Provider store={testStore}>
				<TestableTimer status={testStore.getState()} />
			</Provider>
		);
	});

	it('has the expected props', () => {
		const status = {
		  timeRemaining: 0,
		  isWorking: false,
		  isPaused: true,
		  settings: {
		    workDuration: 25 * minute,
		    breakDuration: 5 * minute,
		    lunchDuration: 60 * minute,
		    blockGreylist: false
		  }
		};
		expect(timerSpy.props().status).to.be.deep.equal(status);
	});

	it('renders a play button when paused', () => {
		const playButtonExists = timerSpy
			.dive().find('.fa-play').exists();
		expect(playButtonExists).to.equal(true);
	});

	it('renders the appropriate buttons when timer is going and user is on break', () => {
		const unPauseAction = {type: types.TOGGLE_PAUSE};
		testStore.dispatch(unPauseAction);
		timerSpy = shallow(
			<Provider store={testStore}>
				<TestableTimer status={testStore.getState()} />
			</Provider>
		);
		const pauseButtonExists = timerSpy
			.dive().find('.fa-pause').exists();
		const addFiveMinutesButtonExists = timerSpy
			.dive().find('.fa-history').exists();
		const workButtonExists = timerSpy
			.dive().find('.fa-suitcase').exists();
		expect(pauseButtonExists).to.equal(true);
		expect(addFiveMinutesButtonExists).to.equal(true);
		expect(workButtonExists).to.equal(true);
	});

	it('renders the appropriate buttons when timer is going and user is on work', () => {
		const onWorkAction = {type: types.START_WORK};
		testStore.dispatch(onWorkAction);
		timerSpy = shallow(
			<Provider store={testStore}>
				<TestableTimer status={testStore.getState()} />
			</Provider>
		);
		const pauseButtonExists = timerSpy
			.dive().find('.fa-pause').exists();
		const addFiveMinutesButtonExists = timerSpy
			.dive().find('.fa-history').exists();
		const breakButtonExists = timerSpy
			.dive().find('.fa-beer').exists();
		expect(pauseButtonExists).to.equal(true);
		expect(addFiveMinutesButtonExists).to.equal(true);
		expect(breakButtonExists).to.equal(true);
	});

	it('renders the right message if timer is paused', () => {
		const message = (
			<div className="timer-message">
        <span>Timer is paused</span>
      </div>
		)
		expect(timerSpy.dive().contains(message))
			.to.equal(true);
	});

	it('renders the right message if timer is playing and user is on work', () => {
		const onWorkAction = {type: types.START_WORK};
		testStore.dispatch(onWorkAction);
		timerSpy = shallow(
			<Provider store={testStore}>
				<TestableTimer status={testStore.getState()} />
			</Provider>
		);
		const message = (
			<div className="timer-message">
        <span>You're on work</span>
      </div>
		)
		expect(timerSpy.dive().contains(message))
			.to.equal(true);
	});

	it('renders the right message if timer is playing and user is on break', () => {
		const onBreakAction = {type: types.START_BREAK};
		testStore.dispatch(onBreakAction);
		timerSpy = shallow(
			<Provider store={testStore}>
				<TestableTimer status={testStore.getState()} />
			</Provider>
		);
		const message = (
			<div className="timer-message">
        <span>You're on break</span>
      </div>
		);
		expect(timerSpy.dive().contains(message))
			.to.equal(true);
	});

	it('renders a Donut component', () => {
		const donut = (
      <Donut
      	status={testStore.getState()}
      	diameter={250}
      	center={10}
      />
    );
		expect(timerSpy.dive().contains(donut))
			.to.equal(true);
	});

	it('renders the appropriate message for whether or not time is up', () => {
		let message = (<span>minutes passed</span>);
		expect(timerSpy.dive().contains(message))
			.to.equal(true);

		const timeRemaining = 1;
		const setTimeRemainingAction = {
			type: types.SET_TIME_REMAINING,
			timeRemaining
		};
		testStore.dispatch(setTimeRemainingAction);
		timerSpy = shallow(
			<Provider store={testStore}>
				<TestableTimer status={testStore.getState()} />
			</Provider>
		);
		message = (<span>minutes left</span>);
		expect(timerSpy.dive().contains(message))
			.to.equal(true);
	});
});
