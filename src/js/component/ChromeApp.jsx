import React 				from 'react';
import { connect }  from 'react-redux';

import { toggleWork } from '../action-creators/status';
import { blockLockedTab, blockLockedTabListener, cancelRequestListener, cancelRequest, removeListeners } from '../tabcontrol.js';

import Background from './Background';

import ChromePromise from 'chrome-promise';

require('../../css/background.css');

const chromep = new ChromePromise();

class ChromeApp extends React.Component {
	constructor(props) {
		super(props);		
		this.startBreak = this.startBreak.bind(this);
		this.startWork = this.startWork.bind(this);
		this.state = {
			newTab: {}
		}
	}

	componentDidMount() {
		this.startWork()		
	}

	// this function starts work
	startWork(){
		const { status, time, toggleWork } = this.props;

		toggleWork(true);
		setTimeout(() => {
	    chromep.tabs.create({})	    	
	      .then(() => chromep.tabs.query({ active: true }))
	      .then(tabs =>(this.setState({ lockedTab: tabs[0] })))
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
        .then(() =>(this.setState({ lockedTab: {} })))
        .then(this.startWork)        
        .catch(console.error);
	  }, time.breakDuration);
	}

	render(){
		return (
	    <div>
	    	<Background { ...this.props } />
	    </div>
	  )
	}
}

const mapState = ({ status, time }) => ({ status, time });
const mapDispatch = { toggleWork };

export default connect(mapState, mapDispatch)(ChromeApp);