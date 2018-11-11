import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import users from './modules/users'
import kpis from './modules/kpis'
import kitties from './modules/kitties'
import loader from './modules/loader'

import * as contracts from '../plugins/contracts'
import config from '@/config';

const fb = require('../firebaseConfig.js')


Vue.use(Vuex);

// handle page reload
fb.auth.onAuthStateChanged(user => {
    if (user) {
        // store.commit('users/setCurrentUser', user)
        // store.dispatch('users/fetchUserProfile')

        fb.usersCollection.doc(user.uid).onSnapshot( async doc => {
            if(doc.exists){
                let userData = doc.data();
                if (!userData.wallet) {
                    // create user wallet
                    // await axios.post(`http://localhost:8080/api/users`, { id: user.uid, data: userData });
                    await axios.post(`${config.api.endpoint+config.api.base}/users`, { id: user.uid, data: userData });
                    
                    
                } else {
                    contracts.watchUserEvents(userData.wallet.address);
                    await store.dispatch('kitties/fetchMyKitties', userData.wallet.address);
                }
            }
            else {
                // create user obj
                fb.usersCollection.doc(user.uid).set({
                    userId: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }).then(() => {
                    this.$store.dispatch('users/fetchUserProfile')
                }).catch(err => {
                    console.log(err)
                    this.errorMsg = err.message
                })
            }
            await store.commit('users/setUserProfile', doc.data())
            await store.dispatch('users/updateBalanceProfile');
            
        })

    }
})

const store = new Vuex.Store({
  modules: {
    users,
    kpis,
    kitties,
    loader
  }
})

export default store;