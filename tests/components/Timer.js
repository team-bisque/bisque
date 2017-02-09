import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import Timer from '../../src/components/Timer';

describe('Timer component', () => {

	let slider, onChangeSpy;

	beforeEach('Create component and spy', () => {
		onChangeSpy = spy();
		slider = shallow(<Timer onChange={onChangeSpy} />);
	});

	it('has min of 0 and max of 255', () => {
		let el = slider.get(0);
		expect(el.props.min).to.be.equal('0');
		expect(el.props.max).to.be.equal('255');
	});

	it('calls onChange with proper value', () => {
		slider.simulate('change', { target: {value: 5}});

		expect(onChangeSpy.called).to.be.true();
	});
});
