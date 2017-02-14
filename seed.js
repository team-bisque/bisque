const firebase = require('firebase');
const firebaseConfig = require('./src/js/apiKeys').firebaseConfig;
const firebaseApp = firebase.initializeApp(firebaseConfig);
const axios = require('axios');

const userId = ''; // INSERT YOUR FIREBASE ID HERE

let promises = [];


for (let k = 5; k < 14; k++) {
    let day = k < 10 ? k = '0' + k : k;
    let date = '02-' + day + '-2017';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 10; j++) {
            let cpm = 250 + Math.random(Math.floor()) * 75;
            const newDbUpload = new Promise((resolve, reject) => {
                // firebaseApp.database().ref('/users/' + userId + '/history/' + date + '/' + i).remove()
                // .then(() => {
                    firebaseApp.database()
                            .ref('/users/' + userId + '/history/' + date + '/' + i)
                            .update({[j]: {
                                cpm,
                                characters: cpm,
                                url: 'www.mysite.com',
                                isGreyList: 4,
                                wpm: cpm/4,

                            }})
                // })
                .then(result => resolve(result))
                .catch(err => console.error(err));
            })
            promises.push(newDbUpload);
        }
    }
}

axios.all(promises)
     .then(() => console.log('Finished uploading seed data'))
     .then(() => process.exit())
     .catch(err => console.error(err));
