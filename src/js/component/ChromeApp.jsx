import React 				from 'react';
import { connect }  from 'react-redux';

import { toggleWork } from '../action-creators/status';

import Background from './Background';

import ChromePromise from 'chrome-promise';

require('../stylesheets/backgroud.css');

const chromep = new ChromePromise();

class ChromeApp extends React.Component {
	constructor(props) {
		super(props);
		this.setTabActivatedListener = this.setTabActivatedListener.bind(this);
		this.removeTabActivatedListener = this.removeTabActivatedListener.bind(this);
		this.tabActivateCallback = this.tabActivateCallback.bind(this);
		this.setCancelRequestListener = this.setCancelRequestListener.bind(this);
		this.removeCancelRequestListener = this.removeCancelRequestListener.bind(this);
		this.cancelRequestCallback = this.cancelRequestCallback.bind(this);
		this.startBreak = this.startBreak.bind(this);
		this.startWork = this.startWork.bind(this);
		this.state = {
			lockedTab: {}
		}
	}

	componentDidMount() {
		console.log('ChromeApp componentDidMount')
		this.startWork()
	}

	// this function starts work
	startWork(){
		console.log('Start Working')
		const { status, time, toggleWork } = this.props;

		toggleWork(true);
		setTimeout(() => {
	    chromep.tabs.create({})
	      .then(() => chromep.tabs.query({ active: true }))
	      .then(tabs =>(this.setState({ lockedTab: tabs[0] })))
	      .then(this.setTabActivatedListener)
	      .then(this.setCancelRequestListener)
	      .then(this.startBreak)
	      .catch(console.error);
	  }, time.workDuration);
	}

	startBreak(){
		console.log('Start Break')
		const { time, toggleWork } = this.props,
					{ lockedTab } = this.state;


	  toggleWork(false);
	  setTimeout(() => {
      chromep.tabs.remove(lockedTab.id)
        .then(this.removeTabActivatedListener)
        .then(this.removeCancelRequestListener)
        .then(() =>(this.setState({ lockedTab: {} })))
        .then(this.startWork)
        .catch(console.error);
	  }, time.breakDuration);

	  console.log('breakStarts');
	}

	tabActivateCallback(activeInfo) {
    // const { browser } = this.props;
    const { lockedTab } = this.state;
    // console.log('tabActivateCallback', activeInfo, lockedTab)
    if(!lockedTab.id && activeInfo.tabId === lockedTab.id) {
    	//console.log('do not update')
    	return;
    }
    //console.log('update', lockedTab)
    return chromep.tabs.update(lockedTab.id, { active:true });
  }

  setTabActivatedListener(){
  	// console.log('####### setTabActivatedListener #######')
    chrome.tabs.onActivated.addListener(this.tabActivateCallback)
  }

  removeTabActivatedListener(){
  	// console.log('####### removeTabActivatedListener #######')
    chrome.tabs.onActivated.removeListener(this.tabActivateCallback)
  }

	cancelRequestCallback(detail) {
		return { redirectUrl: 'javascript:' }
	}

  setCancelRequestListener() {
    chrome.webRequest.onBeforeRequest.addListener(
      this.cancelRequestCallback,
      { urls: ['https://*/*', 'http://*/*'] },
      ['blocking']
    );
  }

  removeCancelRequestListener() {
    chrome.webRequest.onBeforeRequest.removeListener(this.cancelRequestCallback);
  }

	render(){
		console.log(...this.props)
		return (
	    <div>
				<Background { ...this.props } />
	    </div>
	  )
	}
};

const mapState = ({ status, time }) => ({ status, time });
const mapDispatch = { toggleWork };

export default connect(mapState, mapDispatch)(ChromeApp);

// // on tab actived events and callback
//   function tabActivateCallback(activeInfo) {
//     console.log('tabActivateCallback', activeInfo.tabId, app.breakTab.id)
//     if(!app.breakTab.id && activeInfo.tabId === app.breakTab.id) return;
//     chromep.tabs.update(app.breakTab.id, { active:true })
//   };

//   function setTabActivatedListener(){
//     chrome.tabs.onActivated.addListener(tabActivateCallback)
//   };

//   function removeTabActivatedListener(){
//     chrome.tabs.onActivated.removeListener(tabActivateCallback)
//   };

// // Redirect events and callback
//   function cancelRequestCallback(detail) {return {redirectUrl: 'javascript:'}}

//   function setCancelRequestListener() {
//     chrome.webRequest.onBeforeRequest.addListener(
//       cancelRequestCallback,
//       {
//         urls: ['https://*/*', 'http://*/*']
//       },
//       ['blocking']);
//   }

//   function removeCancelRequestListener() {
//     chrome.webRequest.onBeforeRequest.removeListener(cancelRequestCallback);
//   }


// workStarts();
