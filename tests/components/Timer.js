import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import Timer from '../../src/js/components/Timer';

describe('Timer component', () => {

	let slider, togglePauseSpy;

	beforeEach('Create component and spy', () => {
		togglePauseSpy = spy();
		slider = shallow(<Timer togglePause={togglePauseSpy} />);
	});

	it('can pause', () => {

		let el = slider.get(0);
		expect(el.props.min).to.be.equal('0');
		expect(el.props.max).to.be.equal('255');
	});

	it('calls onChange with proper value', () => {
		slider.simulate('change', { target: {value: 5}});

		expect(onChangeSpy.called).to.be.true();
	});
});
