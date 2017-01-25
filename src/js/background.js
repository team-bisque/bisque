var toggle = false;

chrome.browserAction.onClicked.addListener(function(tab) {
  if (toggle) {
    chrome.browserAction.setIcon({path: `off.png`, tabId: tab.id});
    chrome.tabs.executeScript(tab.id, {code: `alert()`});
  }
  else {
    chrome.browserAction.setIcon({path: `on.png`, tabId: tab.id});
    chrome.tabs.executeScript(tab.id, {file: `./console.js`});
  }
  toggle = !toggle;
});
