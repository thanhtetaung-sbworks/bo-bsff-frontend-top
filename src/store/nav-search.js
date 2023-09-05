export default {
  state() {
    return {
      isOpen: false,
    }
  },
  getters: {
      isOpen: (state) => {
        return state.notify;
      }
  },
  mutations: {
    openSearchModel(state) {
      state.isOpen = true;
    },
    closeSearchModel(state, value) {
      state.isOpen = false;
    }
  }
}
