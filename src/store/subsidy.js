import CONST_DATA from "@/mixins/const/constData";

export default {
  state() {
    return {
      availableDataList: null
    };
  },
  getters: {
    get(state) {
      return Array.isArray(state.availableDataList)
        ? state.availableDataList
        : [];
    }
  },
  mutations: {
    set(state, value) {
      state.availableDataList = value;
    },
    setSubsidy(state, value) {
      state.availableDataList = value.availableDataList;
      localStorage.subsidy = JSON.stringify(value.availableDataList);
    },
    remove(state) {
      state.availableDataList = null;
      delete localStorage.subsidy;
    }
  },
  actions: {
    async getSubsidy(context) {
      console.log("getSubsidy actions start");
      if (context.state.availableDataList) {
        console.log("exists availableDataList");
        // 既に保持している場合は何もしない
        return;
      }
    }
  }
};
