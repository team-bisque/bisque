import {expect} from 'chai';

import * as types from '../../src/js/constants';
import * as authActionCreators from '../../src/js/action-creators/auth';

describe('Auth action creators', () => {

  it('return a TAB_ALIAS_LOGIN action', () => {
    const expectedAction = {type: types.TAB_ALIAS_LOGIN};
    expect(authActionCreators.tabAuthenticate())
      .to.be.deep.equal(expectedAction);
  });

  it('return an AUTHENTICATE action', () => {
    const user = 'Davelin Nichols-Griggs-Kang';
    const expectedAction = {
      type: types.AUTHENTICATE,
      user
    };
    expect(authActionCreators.authenticate(user))
      .to.be.deep.equal(expectedAction);
  });
});
