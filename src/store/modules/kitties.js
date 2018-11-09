const fb = require('../../firebaseConfig.js');

export default {
    namespaced: true,

    state: {
        sampleKitties: [],
        onSaleKitties: [],
        myKitties: [],
        selectedKitty: {},
        sampleLimit: 25
    },

    getters: {
        sampleKitties: (state) => state.sampleKitties,
        onSaleKitties: (state) => state.onSaleKitties,
        myKitties: (state) => state.myKitties,
        selectedKitty: (state) => state.selectedKitty
    },

    actions: {
        clearData({ commit }) {
            commit('setMyKitties', null)
        },
        fetchSampleKitties({ commit, state }) {
            fb.kittiesCollection.limit(state.sampleLimit).get().then(res => {
                commit('setSampleKitties', res.docs)
            }).catch(err => {
                console.log(err)
            })
        },
        fetchKittyById({ commit, state }, data) {
            fb.kittiesCollection.where("id","==",data).get().then(res => {
                commit('setSalectedKitty', res.docs[0]);
            }).catch(err => {
                console.log(err)
            })
        },
        fetchOnSaleKitties({ commit, state }) {
            fb.kittiesCollection.where("auction.price",">","0").get().then(res => {
                commit('setOnSaleKitties', res.docs)
            }).catch(err => {
                console.log(err)
            })
        },
        fetchMyKitties({ commit, state }, data) {
            fb.kittiesCollection.where("owner.address","==",data).get().then(res => {
                commit('setMyKitties', res.docs)
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
        setSampleKitties(state, val) {
            if (val) {
                state.sampleKitties = val.map(d => d.data());
            } else {
                state.sampleKitties = []
            }
        },
        setOnSaleKitties(state, val) {
            if (val) {
                state.onSaleKitties = val.map(d => d.data());
            } else {
                state.onSaleKitties = []
            }
        },
        setSalectedKitty(state, val) {
            if (val) {
                state.selectedKitty = val.data();
            } else {
                state.selectedKitty = {}
            }
        },
        setMyKitties(state, val) {
            state.myKitties = val ? val.map(d => d.data()) : [];
        }
    }
};
