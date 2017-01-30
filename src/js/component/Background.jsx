import React, {Component} from 'react';
import { connect }  from 'react-redux';

import { toggleWork } from '../action-creators/status';
import { fetchWeather } from '../action-creators/weather';

import {
	blockLockedTabListener,
	cancelRequestListener,
	removeListeners
} from '../tabcontrol.js';

import ChromePromise from 'chrome-promise';

require('../../css/background.css');

const chromep = new ChromePromise();

class Background extends Component {
	constructor(props) {
		super(props);
		this.startBreak = this.startBreak.bind(this);
		this.startWork = this.startWork.bind(this);
		this.state = {
			newTab: {}
		};
	}

	componentDidMount() {
		this.props.fetchWeather(10004);
		this.startWork();
	}

	startWork(){
		const { status, time, toggleWork } = this.props;

		toggleWork(true);
		setTimeout(() => {
	    chromep.tabs.create({})
	      .then(() => chromep.tabs.query({ active: true }))
	      .then(tabs => (this.setState({ lockedTab: tabs[0] })))
	      .then(() => {
					blockLockedTabListener();
					cancelRequestListener();
				})
	      .then(this.startBreak)
	      .catch(console.error);
	  }, time.workDuration);
	}

	startBreak(){
		const { time, toggleWork } = this.props,
					{ lockedTab } = this.state;


	  toggleWork(false);
		setTimeout(() => {
			chromep.tabs.remove(lockedTab.id)
				.then(removeListeners())
				.then(() => (this.setState({ lockedTab: {} })))
				.then(this.startWork)
				.catch(console.error);
			}, time.breakDuration);
	}

	render(){
		return (
			<div />
		);
	}
}

const mapState = ({ status, time }) => ({ status, time });
const mapDispatch = { toggleWork, fetchWeather };

export default connect(mapState, mapDispatch)(Background);
