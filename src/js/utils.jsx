export const callBackground = (method, ...args) => {
	console.log('callBackground', method, ...args)
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      method: method,
      args: args
    }, function(res) {
    	console.log('callBackground result', res)
      if (res.error !== undefined) {
        reject(res.error);
      } else {
        resolve(res.result);
      }
    })
  });
}