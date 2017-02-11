import {expect} from 'chai';

import * as types from '../../src/js/constants';
import reducer from '../../src/js/reducers/history';

describe('History reducer', () => {

  it('returns a null initial state', () => {
    const initialState = null;
    const action = {
      type: 'twas brillig and the action types'
    };
    expect(reducer(undefined, action))
      .to.be.equal(initialState);
  });

  it('returns the history on RECEIVE_HISTORY', () => {
    const history = {'1/1/2011': 5};
    const action = {
      type: types.RECEIVE_HISTORY,
      history
    };
    expect(reducer(undefined, action))
      .to.be.deep.equal(history);
  });
});
