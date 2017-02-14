const firebase = require('firebase');
const firebaseConfig = require('./src/js/apiKeys').firebaseConfig;
const firebaseApp = firebase.initializeApp(firebaseConfig);
const axios = require('axios');

const userId = '4qXFsbJ1RzTl3LXaHh03ZvE7NR73'; // INSERT YOUR FIREBASE ID HERE

let promises = [];


for (let k = 5; k < 14; k++) {
    let day = k < 10 ? k = '0' + k : k;
    let date = '02-' + day + '-2017';
    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 50; j++) {
            let cpm = Math.random(Math.floor()) * 250;
            const newDbUpload = new Promise((resolve, reject) => {
                // firebaseApp.database().ref('/users/' + userId + '/history/' + date + '/' + i).remove()
                // .then(() => {
                    firebaseApp.database()
                            .ref('/users/' + userId + '/history/' + date + '/' + i)
                            .set({[j]: {
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
     .then(results => results) 
     .catch(err => console.error(err));