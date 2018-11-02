import { web3Connection } from '../../plugins/contracts.js';
import { METHODS } from 'http';
const fb = require('../../firebaseConfig.js')

export default {
    namespaced: true,

    state: {
        currentUser: null,
        userProfile: {},
        userBalance: 0,
        posts: [],
        hiddenPosts: []
    },

    getters: {
      currentUser: (state) => state.currentUser,
      userProfile: (state) => state.userProfile,
      userBalance: (state) => state.userBalance,
      posts: (state) => state.posts,
      hiddenPosts: (state) => state.hiddenPosts
    },
    actions: {
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
            commit('setPosts', null)
            commit('setHiddenPosts', null)
        },
        fetchUserProfile({ commit, state }) {
            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data())
                
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
        }
    },
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setUserBalance(state, val) {
            state.userBalance = val
        },
        setPosts(state, val) {
            if (val) {
                state.posts = val
            } else {
                state.posts = []
            }
        },
        setHiddenPosts(state, val) {
            if (val) {
                // make sure not to add duplicates
                if (!state.hiddenPosts.some(x => x.id === val.id)) {
                    state.hiddenPosts.unshift(val)
                }
            } else {
                state.hiddenPosts = []
            }
        }
    }
};
