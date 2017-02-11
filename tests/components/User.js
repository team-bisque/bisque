import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import User from '../../src/js/components/User';

const barack = {
  displayName: 'Barack Obama',
  email: 'barackobama@vacation.com',
  uid: 'udiSTRING',
  v: 'go-outside-76d86.firebaseapp.com'
};

describe('<User/>', () => {

	let user;

	beforeEach('Create component and spy', () => {
		user = shallow(<User auth={barack} />);
	});

  it('has expected props', () => {
    expect(user.props().user).to.be.defined;
  });

	it('offers a greeting if a user is logged in', () => {
		expect(user.find('h3')).to.have.length(1);
	});
});
