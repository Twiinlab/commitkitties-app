import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyAQxPhK8Hag2-C0HUWS0HSkfSmmsrDMoW8",
    authDomain: "commitkitties.firebaseapp.com",
    databaseURL: "https://commitkitties.firebaseio.com",
    projectId: "commitkitties",
    storageBucket: "commitkitties.appspot.com",
    messagingSenderId: "1020750963599"
}
firebase.initializeApp(config)

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
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')
const kittiesCollection = db.collection('kitties')


export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection,
    kittiesCollection
}
