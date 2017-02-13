import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import sinon from 'sinon';

// this is boilerplate jsdom, allows you to use mount
// instead of shallow, so you can test a live version
import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

import {TestableLogin} from '../../src/js/components/Login';

describe('Login component', () => {

  let LoginWrapper, authenticateSpy;

  beforeEach('set up shallow wrapper and sinon spy', () => {
    authenticateSpy = sinon.spy();
    LoginWrapper = mount(<TestableLogin authenticateAlias={authenticateSpy} />);
  });

  it('renders the Google icon and sign-on message', () => {
    const signInElement = (<div>signin with google account</div>);
    const hasGoogleIcon = LoginWrapper
      .find('.fa-google').exists();
    const hasSignInText = LoginWrapper
      .contains(signInElement);
    expect(hasGoogleIcon).to.be.true;
    expect(hasSignInText).to.be.true;
  });

  it('launches its onClick when the icon or message are clicked', () => {
    LoginWrapper.find('i').at(0).simulate('click');
    LoginWrapper.find('div > div').at(0).simulate('click');
    expect(authenticateSpy.calledTwice).to.be.true;
  });
});
