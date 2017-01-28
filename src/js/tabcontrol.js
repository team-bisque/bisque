/*
---------------------------------------------------------------------
TAB CONTROL:

These functions control the core functionality of the Chrome app when
users are on break: blocking their access to existing (or new) tabs and 
canceling new HTTP requests. They are applied in ChromeApp.jsx.

The Chrome API requires us to model this functionality as event listeners.
For each piece of functionality (blocking tabs/canceling requests),
we've created an event listener and a corresponding event. 

---------------------------------------------------------------------
*/


////////// BLOCK TAB FUNCTIONALITY //////////

export function blockLockedTab (activeInfo) {
    // Event that forces users back to our newTab if
    // they click on another tab     

    // If user is on break, make newTab active (i.e., force user to it) 
    const { newTab } = this.state;
    return chromep.tabs.update(newTab.id, { active:true })
}

export function blockLockedTabListener () {
    // Adds a listener that fires blockLockedTab every time 
    // the tab is changed.
    chrome.tabs.onActivated.addListener(blockLockedTab)
}

////////// CANCEL REQUEST FUNCTIONS //////////

export function cancelRequestListener () {
    // Adds a listener that fires cancelRequest every time 
    // the user makes a new GET request through their search bar

    chrome.webRequest.onBeforeRequest.addListener(
      cancelRequest,
      { urls: ['https://*/*', 'http://*/*'] }, 
      ['blocking']
    );
}

export function cancelRequest () {
    // Event that cancels new GET requests as soon as they are made
    return { redirectUrl: 'javascript:' }
}

////////// REMOVE LISTENERS //////////

export function removeListeners () {
    // Removes listeners when user goes back to work.
    chrome.webRequest.onBeforeRequest.removeListener(cancelRequest)
    chrome.tabs.onActivated.removeListener(blockLockedTab)
}