import {expect} from 'chai';

import * as types from '../../src/js/constants';
import * as routeActionCreators from '../../src/js/action-creators/route';

describe('Route action creators', () => {

  it('return a SET_ROUTE action', () => {
    const route = 'settings';
    const expectedAction = {
      type: types.SET_ROUTE,
      route
    };
    expect(routeActionCreators.setRoute(route))
      .to.be.deep.equal(expectedAction);
  });
});
