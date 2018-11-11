import axios from 'axios'
import { web3Connection } from '../../plugins/contracts.js';
import { METHODS } from 'http';
const fb = require('../../firebaseConfig.js')
import store from '../../store';
import config from '@/config';

export default {
    namespaced: true,

    state: {
        currentUser: null,
        userProfile: {},
        userActivity: [],
        userBalance: 0,
        posts: [],
        hiddenPosts: [],
        ranking: []
    },

    getters: {
      currentUser: (state) => state.currentUser,
      userProfile: (state) => state.userProfile,
      userActivity: (state) => state.userActivity,
      userBalance: (state) => state.userBalance,
      posts: (state) => state.posts,
      hiddenPosts: (state) => state.hiddenPosts,
      ranking: (state) => state.ranking
    },
    actions: {
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
            commit('setUserActivity', null)
            store.dispatch('kitties/clearData')
        },
        fetchUserProfile({ commit, state }) {
            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data())       
            }).catch(err => {
                console.log(err)
            })
        },
        fetchUserActivity({ commit, state }) {
            // axios.get('http://localhost:8080/api/kpis/userid/' + state.currentUser.uid).then(res => {
            axios.get(`${config.api.endpoint+config.api.base}/kpis/userid/` + state.currentUser.uid).then(res => {
                commit('setUserActivity', res)       
            }).catch(err => {
                console.log(err)
            })
        },
        updateProfile({ commit, state }, data) {
            let displayName = data.displayName
            let email = data.email

            fb.usersCollection.doc(state.currentUser.uid).update({ displayName, email }).then(user => {
                // update all posts by user to reflect new name
                fb.postsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
                    docs.forEach(doc => {
                        fb.postsCollection.doc(doc.id).update({
                            userName: displayName
                        })
                    })
                })
                // update all comments by user to reflect new name
                fb.commentsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
                    docs.forEach(doc => {
                        fb.commentsCollection.doc(doc.id).update({
                            userName: displayName
                        })
                    })
                })
            }).catch(err => {
                console.log(err)
            })
        },
        updateBalanceProfile({ commit, state }) {
            if (!state.userProfile || !state.userProfile.wallet) return;
            web3Connection.eth.getBalance(state.userProfile.wallet.address).then((newBalance)=>{
                commit(`setUserBalance`, web3Connection.utils.fromWei(newBalance, 'ether'));
            })
        },
        fetchRanking({ commit, state }) {
            //axios.get(`${config.api.endpoint+config.api.base}/kpis/ranking`).then(res => {
            fb.rankingCollection.get().then(res => {
                commit('setRanking', res.docs)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setUserActivity(state, val) {
            state.userActivity = val ? val.data : {};
        },
        setUserBalance(state, val) {
            state.userBalance = val
        },
        setRanking(state, val) {
            state.ranking = val ? val.map(d => d.data()) : [];
        }
    }
};
