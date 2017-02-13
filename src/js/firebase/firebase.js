'use strict';
import { firebaseConfig } from '../apiKeys';
import firebase from 'firebase';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
export const GoogleAuthProvider = firebaseApp.auth.GoogleAuthProvider;

