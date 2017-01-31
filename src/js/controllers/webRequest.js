'use strict';
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

class WebRequest {
    // https://developer.chrome.com/extensions/webRequest
    constructor() {
        this.filter = {
            urls: ['https://*/*', 'http://*/*']
        };
        this.OnBeforeRequestOptions = [ 'blocking' ];  
        this.redirectUrl = 'javascript:';


        this.redirect = this.redirect.bind(this)
    }

    // https://developer.chrome.com/extensions/webRequest#event-onBeforeRequest

    redirect(){
        return { redirectUrl: this.redirectUrl }
    }

    addOnBeforeRequestEvent(){
        chrome.webRequest.onBeforeRequest.addListener(
          this.redirect,
          this.filter, 
          this.OnBeforeRequestOptions
        );
    }

    removeOnBeforeRequestEvent(){
        chrome.webRequest.onBeforeRequest.removeListener(this.redirect)   
    }


    
}

module.exports = WebRequest;