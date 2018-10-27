const fb = require('../../firebaseConfig.js');
const contracts = require('./contracts.js');

export default {
    namespaced: true,

    state: {
        kitties: []
    },

    getters: {
        kitties: (state) => state.kitties
    },

    actions: {
        clearData({ commit }) {
            commit('setKitties', null)
        },
        fetchKitties({ commit, state }) {
            fb.kittiesCollection.get().then(res => {
                commit('setKitties', res.docs)
            }).catch(err => {
                console.log(err)
            })
        },
        fetchKittyById({ commit, state }) {
            contracts.getKittiesById('1').then(res => {
                //debugger;
                commit('setKitties', res.docs)
            }).catch(err => {
                console.log(err)
            })
        },
        updateKittie({ commit, state }, data) {
            console.log('updateKittie');
            // let name = data.name
            // let title = data.title

            // fb.usersCollection.doc(state.currentUser.uid).update({ name, title }).then(user => {
            //     // update all posts by user to reflect new name
            //     fb.postsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
            //         docs.forEach(doc => {
            //             fb.postsCollection.doc(doc.id).update({
            //                 userName: name
            //             })
            //         })
            //     })
            //     // update all comments by user to reflect new name
            //     fb.commentsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
            //         docs.forEach(doc => {
            //             fb.commentsCollection.doc(doc.id).update({
            //                 userName: name
            //             })
            //         })
            //     })
            // }).catch(err => {
            //     console.log(err)
            // })
        }
    },
    mutations: {
        setKitties(state, val) {
            if (val) {
                state.kitties = val.map(d => d.data());
            } else {
                state.posts = []
            }
        }
    }
};
