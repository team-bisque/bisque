import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import {TestablePopup} from '../../src/js/components/Popup';

describe('Popup component', () => {

  let PopupWrapper;


  beforeEach('create shallow wrapper of Popup component', () => {
    PopupWrapper = shallow(<TestablePopup />);
  });

  it('renders its root div', () => {
    const rootDivExists = PopupWrapper.find('#popup').exists();
    expect(rootDivExists).to.be.true;
  });
});
