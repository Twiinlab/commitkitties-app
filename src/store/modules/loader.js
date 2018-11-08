    export const LOADER = {
        TOGGLE: 'LOADER_TOGGLE',  
    }
  
  export default {
    namespaced: true,

    state: {
      show: false,
    },
  
    getters: {
      showLoader: (state) => state.show
    },
  
    mutations: {
      toggleLoader(state, show) {
        state.show = show
      }
    },
  
    actions: {
      [LOADER.TOGGLE]({ commit }, toggleTo) { 
        commit('toggleLoader', toggleTo)
      },
    }
  }