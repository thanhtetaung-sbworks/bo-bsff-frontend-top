export default {
  state() {
    return {
      digiticketNoPayValue: null,
      digiticketPostValue: null,
      digiticketPageData: null,
      orderInfo: null,
      orderPostValue: null
    };
  },
  getters: {
    get(state) {
      return state;
    }
  },
  mutations: {
    digiticketNoPayValue(state, value) {
      state.digiticketNoPayValue = value;
    },
    digiticketPostValue(state, value) {
      state.digiticketPostValue = value;
    },
    digiticketPageData(state, value) {
      state.digiticketPageData = value;
    },
    orderInfo(state, value) {
      state.orderInfo = value;
    },
    orderPostValue(state, value) {
      state.orderPostValue = value;
    }
  }
};
