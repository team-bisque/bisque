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


export const convertMillisecondsToHM = (milliseconds) => {
  let totalSeconds = milliseconds / 1000;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  return {hours, minutes};
}

export const convertHMToMilliseconds = (hours, minutes) => {
  const IS_IN_DEV = false;
  if (IS_IN_DEV) return (minutes * 1000) + (hours * 60000);
  else return (minutes * 60000) + (hours * 3600000);
}


