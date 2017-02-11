import {expect} from 'chai';

import * as types from '../../src/js/constants';
import reducer from '../../src/js/reducers/db';

describe('Db reducer', () => {

  it('has an empty object as initial state', () => {
    const action = {type: 'why does the strictly typed language sing?'};
    const expectedState = {};
    expect(reducer(undefined, action))
      .to.be.deep.equal(expectedState);
  });

  it('receives history', () => {
    const history = `doesn't repeat itself but it often rhymes`;
    const action = {
      type: types.RECEIVE_HISTORY,
      history
    };
    const expectedState = history;
    expect(reducer(undefined, action))
      .to.be.deep.equal(expectedState);
  });
  it('receives settings', () => {
    const settings = {phaser: 'stun'};
    const action = {
      type: types.RECEIVE_SETTINGS,
      settings
    };
    const expectedState = settings;
    expect(reducer(undefined, action))
      .to.be.deep.equal(expectedState);
  });
});
