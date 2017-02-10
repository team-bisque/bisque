import {expect} from 'chai';
import {createStore} from 'redux';

import authReducer from '../../src/js/reducers/auth';

const user = {
  displayName: 'Barack Obama',
  email: 'barackobama@vacation.com',
  uid: 'udiSTRING',
  v: 'go-outside-76d86.firebaseapp.com'
};

describe('Auth Reducer', () => {
  let testStore;
  beforeEach('Create test store', () => {
    testStore = createStore(authReducer);
  });

  it('has proper initial state', () => {
    expect(testStore.getState()).to.be.null;
  });

  it('can receive user info', () => {
    testStore.dispatch({type: 'AUTHENTICATE', user});
    let newState = testStore.getState();
    expect(newState).to.be.deep.equal(user);
  });
});
