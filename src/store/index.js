import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import users from './modules/users'
import kitties from './modules/kitties'
import * as contracts from './modules/contracts'


const fb = require('../firebaseConfig.js')



Vue.use(Vuex);

// handle page reload
fb.auth.onAuthStateChanged(user => {
    if (user) {
        // store.commit('users/setCurrentUser', user)
        // store.dispatch('users/fetchUserProfile')

        
        fb.usersCollection.doc(user.uid).onSnapshot(doc => {
            if(doc.exists){
                let userData = doc.data();
                if (!userData.wallet) {
                    // create user wallet
                    axios.post(`http://localhost:8080/api/users`, { id: user.uid, data: userData }).then(result => {
                        console.log(result);
                    })
                }
            }
            else{
                // create user obj
                fb.usersCollection.doc(user.uid).set({
                    userId: user.uid,
                    displayName: user.displayName,
                    email: user.email
                }).then(() => {
                    this.$store.dispatch('users/fetchUserProfile')
                }).catch(err => {
                    console.log(err)
                    this.errorMsg = err.message
                })
            }
            store.commit('users/setUserProfile', doc.data())

            
        })

        // realtime updates from our posts collection
        fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
            // check if created by currentUser
            let createdByCurrentUser
            if (querySnapshot.docs.length && store.getters['users/currentUser']) {
                createdByCurrentUser = store.getters['users/currentUser'].uid == querySnapshot.docChanges[0].doc.data().userId ? true : false
            }

            // add new posts to hiddenPosts array after initial load
            if (querySnapshot.docChanges.length !== querySnapshot.docs.length
                && querySnapshot.docChanges[0].type == 'added' && !createdByCurrentUser) {

                let post = querySnapshot.docChanges[0].doc.data()
                post.id = querySnapshot.docChanges[0].doc.id

                store.commit('users/setHiddenPosts', post)
            } else {
                let postsArray = []

                querySnapshot.forEach(doc => {
                    let post = doc.data()
                    post.id = doc.id
                    postsArray.push(post)
                })

                store.commit('users/setPosts', postsArray)
            }
        })
    }
})

const store = new Vuex.Store({
  modules: {
    users,
    kitties
  }
})

export default store;