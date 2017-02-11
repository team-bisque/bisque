'use strict';
import { firebaseConfig } from '../apiKeys';
import firebase from 'firebase';

firebase.initializeApp(firebaseConfig);
export default firebase;

const rootRef = firebase.database().ref();

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();


export const usersRef = rootRef.child('users');
export const settingsRef = rootRef.child('uesrs_settings');
export const greylistRef = settingsRef.child('greylist');
export const historyRef = rootRef.child('uesrs_history');
