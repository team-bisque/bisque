import {expect} from 'chai';

import * as types from '../../src/js/constants';
import reducer from '../../src/js/reducers/greylist';

describe('Greylist reducer', () => {

  it('starts with an empty array as the initial state', () => {
    const expectedGreylist = [];
    const action = {
      type: 'yo banana boy'
    };
    expect(reducer(undefined, action))
      .to.be.deep.equal(expectedGreylist);
  });

  it('adds a url to the greylist', () => {
    const greylist = [
      'themegas.com',
      'fullstackacademy.com'
    ];
    const url = 'redux.js.org';
    const action = {
      type: types.ADD_URL,
      url
    };
    const expectedGreylist = [...greylist, url];
    expect(reducer(greylist, action))
      .to.be.deep.equal(expectedGreylist);
  });

  it('removes a url from the greylist', () => {
    const greylist = [
      'linkedin.com',
      'vine.com'
    ];
    const index = 1;
    const action = {
      type: types.REMOVE_URL,
      index
    };
    const expectedGreylist = ['linkedin.com'];
    expect(reducer(greylist, action))
      .to.be.deep.equal(expectedGreylist);
  });

  it('edits a url', () => {
    const greylist = [
      'whitehouse.com',
      'amazon.com'
    ];
    const index = 0;
    const url = 'whitehouse.gov';
    const action = {
      type: types.EDIT_URL,
      index, url
    };
    const expectedGreylist = [
      'whitehouse.gov',
      'amazon.com'
    ];
    expect(reducer(greylist, action))
      .to.be.deep.equal(expectedGreylist);
  });

  it('gets a new greylist', () => {
    const greylist = [
      'facebook.com',
      'twitter.com'
    ];
    const action = {
      type: types.RECEIVE_GREYLIST,
      greylist
    };
    expect(reducer(undefined, action))
      .to.be.deep.equal(greylist);
  });
});
