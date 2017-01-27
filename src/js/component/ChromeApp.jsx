import React 				from 'react';
import { connect }  from 'react-redux';

import { setWorking } from '../reducers/chromeApp';
import { lockTab } from '../reducers/browser';

import ChromePromise from 'chrome-promise';
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
	}

	componentDidMount() {
		console.log('ChromeApp componentDidMount')
		this.startWork()		
	}

	// this function starts work
	startWork(){
		console.log('Start Working')
		const { app, browser, setWorking, lockTab } = this.props;

		setWorking(true);
		setTimeout(() => {
	    chromep.tabs.create({})	    	
	      .then(() => chromep.tabs.query({ active: true }))
	      .then(tabs =>(lockTab(tabs[0])))
	      .then(this.setTabActivatedListener)
	      .then(this.setCancelRequestListener)
	      .then(this.startBreak)
	      .catch(console.error);
	  }, app.workDuration);
	}

	startBreak(){
		console.log('Start Break')
		const { app, browser, setWorking, lockTab } = this.props;

	  setWorking(false);	  
	  setTimeout(() => {  
      chromep.tabs.remove(browser.lockedTab.id)        
    		
        .then(this.removeTabActivatedListener)        
        .then(this.removeCancelRequestListener)
        .then(() =>(lockTab({})))
        .then(this.startWork)        
        .catch(console.error);
	  }, app.breakDuration);
	    
	  console.log('breakStarts');
	}

	tabActivateCallback(activeInfo) {    
    const { browser } = this.props;
    console.log('tabActivateCallback', activeInfo, browser)
    if(!browser.lockedTab.id && activeInfo.tabId === browser.lockedTab.id) {
    	console.log('do not update')
    	return;
    }
    console.log('update', browser.lockedTab)
    chrome.tabs.update(browser.lockedTab.id, { active:true });
  }

  setTabActivatedListener(){
  	console.log('####### setTabActivatedListener #######')
    chrome.tabs.onActivated.addListener(this.tabActivateCallback)
  }

  removeTabActivatedListener(){
  	console.log('####### removeTabActivatedListener #######')
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
		return (
	    <div>
	    	DO YOUR HTML & CSS MAGIC BRIAN :)
	    </div>
	  );	
	}
};

const mapState = ({ app, browser }) => ({ app, browser });
const mapDispatch = { setWorking, lockTab };

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