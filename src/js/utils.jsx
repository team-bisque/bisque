export const callBackground = (method, ...args) => {
	console.log('callBackground', method, ...args)
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      method: method,
      args: args
    }, function(res) {
      if (res.error !== undefined) {
        reject(res.error);
      } else {
        resolve(res.result);
      }
    })
  });
}

export const getPreciseLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      resolve(position.coords);
    });
  });
};

export const convertMillisecondsToHM = (milliseconds) => {
  let totalSeconds = milliseconds / 1000;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  return {hours, minutes};
}

export const convertHMToMilliseconds = (hours, minutes) => (minutes * 60000) + (hours * 3600000);

export const convertMillisecondsToMinutes = (milliseconds) => milliseconds / 60000;

export const convertMinutesToMilliseconds = (minutes) => minutes * 60000;
