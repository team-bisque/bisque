import {expect} from 'chai';
import {createStore} from 'redux';

import * as types from '../../src/js/constants';
import reducer from '../../src/js/reducers/auth';

const user = {
  displayName: 'Barack Obama',
  email: 'barackobama@vacation.com',
  uid: 'udiSTRING',
  v: 'go-outside-76d86.firebaseapp.com'
};

describe('Auth reducer', () => {

  it('returns an initial state of null', () => {
    const action = {type: 'user: Brilo Jaffow'}
    const expectedState = null;
    expect(reducer(undefined, action))
      .to.be.equal(expectedState);
  });

  it('returns a user if given an RECEIVE_USER action', () => {
    const action = {
      type: types.RECEIVE_USER,
      user
    }
    const expectedState = user;
    expect(reducer(undefined, action))
      .to.be.deep.equal(user);
  });
});
