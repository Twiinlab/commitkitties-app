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
        fb.usersCollection.doc(user.uid).onSnapshot( async doc => {
            if(doc.exists){
                let userData = doc.data();
                if (userData.wallet) {
                    contracts.watchUserEvents(userData.wallet.address);
                    await store.dispatch('kitties/fetchMyKitties', userData.wallet.address);
                }
                await store.commit('users/setUserProfile', doc.data())
                await store.dispatch('users/updateBalanceProfile');
            }
            else {
                // create user obj
                fb.usersCollection.doc(user.uid).set({
                    userId: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }).then((result) => {
                    axios.post(`${config.api.endpoint+config.api.base}/users`, { id: user.uid }).then( userResult => {
                        store.commit('users/setUserProfile', userResult.data)
                        store.dispatch('users/updateBalanceProfile');
                        console.log('userData: ', userResult.data);
                        // store.dispatch('users/fetchUserProfile')
                    })
                }).catch(err => {
                    console.log(err)
                    this.errorMsg = err.message
                })
            }
            
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