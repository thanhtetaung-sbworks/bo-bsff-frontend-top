export default {
  state() {
    return {
      couponDetail: null,
      importantPoints: null
    }
  },
  getters: {
    get(state) {
      return state;
    }
  },
  mutations: {
    couponDetail(state, value) {
      state.couponDetail = value;
    },
    importantPoints(state, value) {
      state.importantPoints = value;
    }
  }
}
