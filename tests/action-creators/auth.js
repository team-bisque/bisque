import {expect} from 'chai';

import * as types from '../../src/js/constants';
import * as authActionCreators from '../../src/js/action-creators/auth';

describe('Auth action creators', () => {

  it('return a TAB_ALIAS_AUTH action', () => {
    const expectedAction = {type: types.TAB_ALIAS_AUTH};
    expect(authActionCreators.authenticateAlias())
      .to.be.deep.equal(expectedAction);
  });

  it('return an RECEIVE_USER action', () => {
    const user = 'Davelin Nichols-Griggs-Kang';
    const expectedAction = {
      type: types.RECEIVE_USER,
      user
    };
    expect(authActionCreators.receiveUser(user))
      .to.be.deep.equal(expectedAction);
  });
});
