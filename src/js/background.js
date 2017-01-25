chrome.extensionRequest.addListener((req, sender)=>{

	console.log('BACKGROUND', req, sender)
	chrome.tabs.update(sender.tab.id, {url:req.redirect})
})