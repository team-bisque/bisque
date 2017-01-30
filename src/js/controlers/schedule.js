'use strict';
class ScheduleNode {
  constructor(props) {
    this.startTime = 0;
    this.endTime = 0;
    this.duration = 0;
    this.type = '';
    this.next = {};
  }

  set startTime (dateTime){
    this.startTime = dateTime;
  }

  get startTime () {
  	return this.startTime;
  }

  set endTime (dateTime){
    this.endTime = dateTime;
  }

  get endTime () {
  	return this.endTime;
  }

  set type (type) {
  	this.type = type;
  }

  get type () {
  	return this.type
  }
}

// create schedule linked list 
let userConfiguration = {
	workStartTime: '09:00',
	workEndTime: '06:30',
	numberOfBreaks: 5,
	nthOfLunch: 3
}


function parseTime (str) {
	/*
	 *	input = 09:00
	 * ------------------
	 *	outout = {
	 *		hour: '09',
	 *		minute: '00'
	 *	}
	*/
  let obj = {};
  let arr = str.split(':');
  
  obj['hour'] = arr[0];
  obj['minute'] = arr[1];
  return obj;
};

const generateSchedule = (startTime, endTime, numberOfBreaks, nthOfLunch) => {
	var today = new Date(),
			year = today.getYear(),
			month = today.getMonth(),
			day = today.getDate();

	var scheduleStart = new Date(year, month, day, parseTime(startTime).hour, parseTime(startTime).minute),
			scheduleEnd = new Date(year, month, day, parseTime(endTime).hour, parseTime(endTime).minute),
			scheduleOffset = scheduleEnd - scheduleStart

			console.log('scheduleOffset', scheduleOffset)

}

generateSchedule(userConfiguration.workStartTime, userConfiguration.workEndTime, userConfiguration.numberOfBreaks, userConfiguration.nthOfLunch)

// var time = new Date().toTimeString()

// console.log(time)

// year, month, day, hours, minutes, seconds, milliseconds


const workStartTime = '09:00'
const workEndTime = '18:30'





console.log(today, year, month, day)

var startTime = new Date(year, month, day, parseHHMM(workStartTime).hour, parseHHMM(workStartTime).minutes).toTimeString()

console.log(startTime)

var endTime = new Date(year, month, day, parseHHMM(workEndTime).hour, parseHHMM(workEndTime).minutes).toTimeString()

console.log(endTime)
