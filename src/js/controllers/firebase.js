'use strict';

import { firebaseConfig } from '../apiKeys';

const firebase = require('firebase').initializeApp(firebaseConfig);

module.exports = firebase;
