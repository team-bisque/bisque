const firebase = require('firebase');
const firebaseConfig = require('./src/js/apiKeys').firebaseConfig;
const firebaseApp = firebase.initializeApp(firebaseConfig);
const axios = require('axios');

const userId = '';

let promises = [];
let date = '02-05-2017';

for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 50; j++) {
        let wpm = Math.random(Math.floor()) * 80;
        const newDbUpload = new Promise((resolve, reject) => {
            firebaseApp.database()
                       .ref('/users/' + userId + '/history/' + date + '/' + i)
                       .update({[j]: {wpm: wpm}})
            .then(result => resolve(result))
            .catch(err => console.error(err));
        })
        promises.push(newDbUpload);
    }
}

axios.all(promises)
     .then(results => results) 
     .catch(err => console.error(err));