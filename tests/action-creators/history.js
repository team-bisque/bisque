import {expect} from 'chai';

import * as types from '../../src/js/constants';
import * as historyActionCreators from '../../src/js/action-creators/history';

describe('History action creators', () => {

  it('return a RECEIVE_HISTORY action', () => {
    const history = {'2/2/2017': 300};
    const expectedAction = {
      type: types.RECEIVE_HISTORY,
      history
    };
    expect(historyActionCreators.receive_history(history))
      .to.be.deep.equal(expectedAction);
  });
});
