'use strict';
import { setTimeRemaining, togglePause } from '../action-creators/status';
import { fetchWeather } from '../action-creators/weather';
import { receiveUser } from '../action-creators/auth';
import { receiveHistory } from '../action-creators/history';
import { receiveSettings } from '../action-creators/status';
import { receiveGreylist } from '../action-creators/greylist';
import { fetchTasks } from '../action-creators/tasks';
import { setRoute } from '../action-creators/route';
import store from '../store';

const Tabs = require('./tabs'),
		  WebRequest = require('./webRequest'),
		  Notifications = require('./notifications'),
		  Idle = require('./idle');

const { firebaseAuth } = require('../firebase');

class Core {
  constructor() {
    // this.tabs = new Tabs();
    this.notifications = new Notifications();
    this.idle = new Idle();
  }

  _init() {
    store.dispatch(fetchWeather()); // Initial weather check
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        store.dispatch(receiveUser(user));
        store.dispatch(receiveHistory());
        store.dispatch(receiveSettings());
        store.dispatch(receiveGreylist());
        store.dispatch(fetchTasks());
        store.dispatch(setRoute(null));        
        Tabs._init(); // <-- begins keylogger
        this.idle._init(); // <-- detects whether user is idle
      } else {
        store.dispatch(receiveUser(null))
        store.dispatch(setRoute('signin'))
      }
    });

    // Auth.onAuthStateChanged()// <-- firebase authentication listener
    this.notifications.welcome(); // <-- sends welcome notification
    this.watchMinute();


    WebRequest.visitCounter();
    WebRequest.blockGreylist();
  }

  watchMinute() {
    const { dispatch, getState } = store;
    const minute = 60 * 1000;

    setInterval(() => { // Update weather every 20 minutes
      dispatch(fetchWeather());
    }, 20 * minute);

    setInterval(() => {
      let status = getState().status;

      if (!status.isPaused) {
        // Deduct 1 minute from the clock and update the store
        const newTime = getState().status.timeRemaining - minute;
        dispatch(setTimeRemaining(newTime));

        // If applicable, fire a chrome notification
        if (newTime === 5 * minute) {
          this.notifications.warning();
        } else if (newTime === 0) {
          this.notifications.statusChange();
          
        } else if (newTime === -10 * minute) {
          this.notifications.whereAreYou();
          dispatch(togglePause());
        }

        
      } else {
        // When paused, interval keeps running -- but does nothing
        console.log('We are paused');
      }
    }, 3000); // Interval runs at 20x speed for dev purposes
  }
}

module.exports = Core;
