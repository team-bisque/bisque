import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import {createStore} from 'redux';

import Timer from '../../src/js/components/Timer';

describe('Timer component', () => {

	let timer, togglePauseSpy;

	beforeEach('Create component and spy', () => {
		togglePauseSpy = spy();
		timer = shallow(<Timer togglePause={togglePauseSpy} />);
	});

	it('pauses the timer', () => {
		timer.simulate('click');

		expect(togglePauseSpy.called).to.be.true();
	});
});
