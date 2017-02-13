import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import {TestablePopup} from '../../src/js/components/Popup';
import Timer from '../../src/js/components/Timer';
import Login from '../../src/js/components/Login';

describe('Popup component', () => {

  let PopupWrapper, auth;

  beforeEach('create shallow wrapper', () => {
    auth = true;
    PopupWrapper = shallow(<TestablePopup auth={auth}/>);
  });

  it('renders its root div', () => {
    const rootDivExists = PopupWrapper.find('#popup').exists();
    expect(rootDivExists).to.be.true;
  });

  it('renders a Home button', () => {
    const homeButtonExists = PopupWrapper.find('.fa-home').exists();
    expect(homeButtonExists).to.be.true;
  });

  it('renders a Login if logged in and a Timer if not', () => {
    const TimerExists = PopupWrapper.contains(<Timer status={undefined}/>);
    expect(TimerExists).to.be.true;
    auth = false;
    PopupWrapper = shallow(<TestablePopup auth={auth} />);
    const LoginExists = PopupWrapper.contains(<Login />);
    expect(LoginExists).to.be.true;
  });
});
