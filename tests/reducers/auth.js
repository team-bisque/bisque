import {expect} from 'chai';
import {createStore} from 'redux';

import * as types from '../../src/js/constants';
import reducer from '../../src/js/reducers/auth';

// import authReducer from '../../src/js/reducers/auth';

const user = {
  displayName: 'Barack Obama',
  email: 'barackobama@vacation.com',
  uid: 'udiSTRING',
  v: 'go-outside-76d86.firebaseapp.com'
};

// describe('Auth Reducer', () => {
//   let testStore;
//   beforeEach('Create test store', () => {
//     testStore = createStore(authReducer);
//   });

//   it('has proper initial state', () => {
//     expect(testStore.getState()).to.be.null;
//   });

//   it('can receive user info', () => {
//     testStore.dispatch({type: 'AUTHENTICATE', user});
//     let newState = testStore.getState();
//     expect(newState).to.be.deep.equal(user);
//   });
// });

describe('Auth reducer', () => {

  it('returns an initial state of null', () => {
    const action = {type: 'user: Brilo Jaffow'}
    const expectedState = null;
    expect(reducer(undefined, action))
      .to.be.equal(expectedState);
  });

  it('returns a user if given an AUTHENTICATE action', () => {
    const action = {
      type: types.AUTHENTICATE,
      user
    }
    const expectedState = user;
    expect(reducer(undefined, action))
      .to.be.deep.equal(user);
  });
});
