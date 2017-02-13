import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import rootReducer from '../../src/js/reducers/index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Main from '../../src/js/components/Main';

describe('<Main />', () => {

    let testStore;

    beforeEach('Create component and store', () => {
        testStore = createStore(rootReducer);
        // testMain = shallow(<Main store={testStore} />)
    })

    it('Contains correct initial local state', () => {
        const testMain = shallow(<Main store={testStore} />)
        expect(testMain.state().width).to.equal(0);
        expect(testMain.state().height).to.equal(0);
        expect(testMain.state().bgPositionX).to.equal(0);
        expect(testMain.state().bgPositionY).to.equal(0);
        expect(testMain.state().modal).to.equal(null);
    });

    it('Sets a background image at random before mounting', () => {
        const testMain = mount(<Main store={testStore} />)
        const bgImageSpy = spy();
        bgImageSpy.reset();
        testMain.componentWillMount();
        expect(bgImageSpy.callCount).to.be.equal
    })

})
