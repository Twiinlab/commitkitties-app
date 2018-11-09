const fb = require('../../firebaseConfig.js');
import { LOADER } from './loader';
import store from '../../store';


export default {
    namespaced: true,

    state: {
        kitties: [],
        onSaleKitties: [],
        myKitties: [],
        selectedKitty: {}
    },

    getters: {
        kitties: (state) => state.kitties,
        onSaleKitties: (state) => state.onSaleKitties,
        myKitties: (state) => state.myKitties,
        selectedKitty: (state) => state.selectedKitty
    },

    actions: {
        clearData({ commit }) {
            commit('setKitties', null)
        },
        clearSelectedKitty({ commit }) {
            commit('setKitties', null)
        },
        fetchKitties({ commit, state }) {
            fb.kittiesCollection.get().then(res => {
                commit('setKitties', res.docs)
            }).catch(err => {
                console.log(err)
            })
        },
        fetchKittyById({ commit, state }, data) {
            fb.kittiesCollection.where("id","==",data).get().then(res => {
                commit('setSelectedKitty', res.docs[0]);
            }).catch(err => {
                console.log(err)
            })
        },
        fetchOnSaleKitties({ commit, state }, data) {
            fb.kittiesCollection.where("generation","==",data).get().then(res => {
                commit('setOnSaleKitties', res.docs)
            }).catch(err => {
                console.log(err)
            })
        },
        fetchMyKitties({ commit, state }, data) {
            store.dispatch(`loader/${LOADER.TOGGLE}`, true, { root: true });
            try {
                fb.kittiesCollection.where("owner.userId","==",data).get().then( res => {
                    commit('setMyKitties', res.docs);
                }).catch(error => {
                    console.log(error)
                }).then(() =>{
                    store.dispatch(`loader/${LOADER.TOGGLE}`, false, { root: true });
                });
            } finally{
                store.dispatch(`loader/${LOADER.TOGGLE}`, false, { root: true });
            }
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
                state.kitties = []
            }
        },
        setOnSaleKitties(state, val) {
            if (val) {
                state.onSaleKitties = val.map(d => d.data());
            } else {
                state.onSaleKitties = []
            }
        },
        setSelectedKitty(state, val) {
            if (val) {
                state.selectedKitty = val.data();
            } else {
                state.selectedKitty = {}
            }
        },
        setMyKitties(state, val) {
            if (val) {
                state.myKitties = val.map(d => d.data());
            } else {
                state.myKitties = {}
            }
        }
    }
};
