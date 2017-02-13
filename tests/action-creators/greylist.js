import {expect} from 'chai';

import * as types from '../../src/js/constants';
import * as greylistActions from '../../src/js/action-creators/greylist';

describe('Greylist action creators', () => {

  it('return an addUrl action', () => {
    const url = 'bisque.com';
    const expectedAction = {
      type: types.ADD_URL,
      url
    };
    expect(greylistActions.addUrl(url))
      .to.be.deep.equal(expectedAction);
  });

  it('return a removeUrl action', () => {
    const index = 3;
    const expectedAction = {
      type: types.REMOVE_URL,
      index
    };
    expect(greylistActions.removeUrl(index))
      .to.be.deep.equal(expectedAction);
  });

  it('return an editUrl action', () => {
    const url = 'zombo.com';
    const index = 7;
    const expectedAction = {
      type: types.EDIT_URL,
      url,
      index
    };
    expect(greylistActions.editUrl(url, index))
      .to.be.deep.equal(expectedAction);
  });

  it('return a tabAddGreylist action', () => {
    const url = 'vox.com/news';
    const expectedAction = {
      type: types.TAB_ALIAS_ADD_GREYLIST,
      url
    };
    expect(greylistActions.tabAddGreylist(url))
      .to.be.deep.equal(expectedAction);
  });

  it('return a tabRemoveGreylist action', () => {
    const index = 37;
    const expectedAction = {
      type: types.TAB_ALIAS_REMOVE_GREYLIST,
      index
    };
    expect(greylistActions.tabRemoveGreylist(index))
      .to.be.deep.equal(expectedAction);
  });

  it('return a tabEditGreylist action', () => {
    const url = 'whitehouse.gov';
    const index = 1600;
    const expectedAction = {
      type: types.TAB_ALIAS_EDIT_GREYLIST,
      url,
      index
    };
    expect(greylistActions.tabEditGreylist(url, index))
      .to.be.deep.equal(expectedAction);
  });

  it('return a receive_greylist action', () => {
    const greylist = [
      'github.com',
      'hackernews.com',
      'theprotomen.com'
    ];
    const expectedAction = {
      type: types.RECEIVE_GREYLIST,
      greylist
    };
    expect(greylistActions.receive_greylist(greylist))
      .to.be.deep.equal(expectedAction);
  });
});
