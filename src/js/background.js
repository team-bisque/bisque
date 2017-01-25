'user strict';
var toggle = false;
const breakURL = 'http://youtube.com';
const app = {
  working: true,
  workDuration: 5000,
  breakDuration: 2000
}

// Promisify 

const prom = {
  tabs: {
    create: (createProperties) => {
      return new Promise(resolve => (
        chrome.tabs.create(createProperties, (tab) => {
          resolve(tab)
        })
      ))
    },
    discard: (id) => {
      return new Promise(resolve => {
        chrome.tabs.discard(id, (tab) => {
          resolve(tab)
        })
      })
    },
    getCurrent: () => {
      return new Promise((resolve, reject)) => (
        chrome.tabs.getCurrent(tab => {
        	console.log('getCurrent' , tab)
          resolve(tab)
        })
      ))
    }
  }
}

// function redirect(createProperties){
// 	return prom.tabs.create(createProperties)
// }



function breakStarts() {
  console.log('breakStarts')

  // break start
  // redirect you somewhere

  // disable other tabs
  setTimeout(() => {
    prom.tabs.getCurrent()
      .then(tab => {
      	console.log('breakStarts' , tab)
      	prom.tabs.discard(tab.id)
      })
      .then(() => {
        workStarts()
      })
  }, app.breakDuration);
}

function workStarts() {
  console.log('workStarts')

  setTimeout(() => {
    prom.tabs.create({url: breakURL, active: true})
      .then(() => {
        breakStarts()
      })
  }, app.workDuration)
}

chrome.browserAction.onClicked.addListener(function(tab) {

  console.log('browserAction.onClicked', tab)
  if (toggle) {

    chrome.browserAction.setIcon({ path: `icon.png`, tabId: tab.id });
  } else {
    console.log('Toggle on')
    chrome.browserAction.setIcon({ path: `icon.png`, tabId: tab.id });
    workStarts()
  }
  toggle = !toggle;
});
