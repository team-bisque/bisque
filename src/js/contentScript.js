'use strict';
const keyStrokeCounter = () => {

	let port = null;
	let time = new Date().getTime();
	let status = {
		duration: 0,
		active: false,
		shouldSave: false,
		initializedTime: 0,
		lastLoggedTime: 0
	};

	let data = {
		cpm: 0,
		wpm: 0,
		characters: 0,
		words: [],		
	}

	let lastspace = 0,
			backspace = 0,
			lastCharacterCode = 0,
			currentWordCharacter = 0;


	function save() {
		console.log('contentScript.js save', data)
		if (!status.shouldSave) return;
    data.url = document.URL.split('/')[2];
    if (data.cpm > 5 && data.wpm > 5) {
    	port.postMessage(data);
    	status.shouldSave = false;
    }
	}

	function log(input) {		
    const now = new Date().getTime();
    status.duration = now - time;    
    let durationMinutes = new Date(status.duration).getMinutes();
    if (now - status.lastLoggedTime < (1000 * 60)) {
      // let durationMinutes = new Date(this.duration).getMinutes()
      data.cpm = data.characters / (durationMinutes === 0 ? 1 : durationMinutes);
      data.wpm = data.words.length / (durationMinutes === 0 ? 1 : durationMinutes);
    }
    status.shouldSave = true;
    status.lastLoggedTime = now;  
	}

	function needPrivacy(domElement) {
    // should be a secret when typed domElement has type "password"
    if (domElement && domElement.type === "password") return true;
    return false;
  }

	const event = {
		onKeypress: (e) => {

			e = e || window.event;

	    let charCode = typeof e.which == "number" ? e.which : e.keyCode;

	    if (e.target && !needPrivacy(e.target) && charCode) {


	      // Increse number of backspace and
	      // Decrese number of characters
	      // when backspace is pressed
	      if (charCode === 8) {

	        backspace++;
	        if (data.characters > 0) data.characters--;
	        if (currentWordCharacter > 0) currentWordCharacter--;
	        if(lastspace === backspace) {
		        lastspace = 0;
		        if (data.characters > 0 && data.words.length) {
							currentWordCharacter = data.words.pop();
							lastspace = currentWordCharacter+1;
							backspace = 0;
		        }
		      }

		      if(backspace === currentWordCharacter) currentWordCharacter = 0;
		      if(!data.characters) {
						backspace = 0;
						lastspace = 0;
		      }
	      }
	      // Increse lastspace index number
	      // when space is pressed
	      // need treat whitespace as character.
	      else if (charCode === 32) {
	        lastspace++;
	        data.characters++;
	        if (lastCharacterCode && lastCharacterCode !== charCode) {
	        	data.words.push(currentWordCharacter);
	        	lastspace = 1;
	        	currentWordCharacter = 0;
	        }
	      } else {
	        if (lastCharacterCode === 8) backspace = 0;
	        if (lastspace && !backspace) lastspace++;
	        data.characters ++;
	        currentWordCharacter ++;
	      }

	      lastCharacterCode = charCode;
	      log(String.fromCharCode(charCode));

	      // leave these console.logs for future use
	   		// console.log('contentScript.js onKeypress', e.keyCode)
				// console.log('lastspace', lastspace)
				// console.log('backspace', backspace)
				// console.log('characters', data.characters)
				// console.log('currentWordCharacter', currentWordCharacter)
				// console.log('words', data.words)
	    }	  
		}
	}

	return function(){
		// console.log('contentScript.js counter', status, data)

		status.active = true;
    port = chrome.runtime.connect(); // make port connection to background.js    
    document.removeEventListener("keydown", event.onKeypress); // prevent multiple event
    document.addEventListener("keydown", event.onKeypress);    
    if (document.getElementsByClassName("docs-texteventtarget-iframe").length) {
      let iframe = document.getElementsByClassName("docs-texteventtarget-iframe")[0];
      iframe.contentDocument.addEventListener("keydown", event.onKeypress, false);
    }

    setInterval(save, 10000);
	}
}
const counter = keyStrokeCounter();
counter();
// if (typeof counter === "undefined") {
//   const counter = new keyStrokeCounter();
//   counter.init();
// }
