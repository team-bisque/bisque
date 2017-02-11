import {expect} from 'chai';

import * as types from '../../src/js/constants';
import reducer from '../../src/js/reducers/route';

describe('Route reducer', () => {

  it('starts with a null initial state', () => {
    const action = {
      type: 'Who codes the coders?'
    };
    const expectedState = null;
    expect(reducer(undefined, action))
      .to.be.equal(expectedState);
  });

  it('returns the route upon receiving a SET_ROUTE action', () => {
    const route = 'settings';
    const action = {
      type: types.SET_ROUTE,
      route
    };
    const expectedState = route;
    expect(reducer(undefined, action))
      .to.be.equal(expectedState);
  });
});
