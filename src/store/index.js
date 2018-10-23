import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import kitties from './modules/kitties'

const fb = require('../firebaseConfig.js')


Vue.use(Vuex);

// handle page reload
fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('users/setCurrentUser', user)
        store.dispatch('users/fetchUserProfile')

        fb.usersCollection.doc(user.uid).onSnapshot(doc => {
            store.commit('users/setUserProfile', doc.data())
        })

        // realtime updates from our posts collection
        fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
            // check if created by currentUser
            let createdByCurrentUser
            if (querySnapshot.docs.length) {
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