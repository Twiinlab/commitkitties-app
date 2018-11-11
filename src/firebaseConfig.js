import firebase from 'firebase'
import 'firebase/firestore'

import config from '@/config'

// firebase init goes here
// const config = {
//     apiKey: "AIzaSyAQxPhK8Hag2-C0HUWS0HSkfSmmsrDMoW8",
//     authDomain: "commitkitties.firebaseapp.com",
//     databaseURL: "https://commitkitties.firebaseio.com",
//     projectId: "commitkitties",
//     storageBucket: "commitkitties.appspot.com",
//     messagingSenderId: "1020750963599"
// }
console.log("config :",config)
firebase.initializeApp(config.firebase);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const kittiesCollection = db.collection('kitties')


export {
    firebase,
    db,
    auth,
    currentUser,
    usersCollection,
    kittiesCollection
}
