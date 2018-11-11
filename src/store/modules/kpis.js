
const fb = require('../../firebaseConfig.js')

export default {
    namespaced: true,

    state: {
        kpis: []
    },
    getters: {
      kpis: (state) => state.kpis
    },
    actions: {
        fetchKpis({ commit, state }) {
            fb.kpisCollection.get().then(res => {
                commit('setKpis', res.docs)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mutations: {
        setKpis(state, val) {
            state.kpis = val ? val.map(d => d.data()) : [];
        }
    }
};
