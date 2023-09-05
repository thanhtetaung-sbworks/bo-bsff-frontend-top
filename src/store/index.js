import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import page from "./page";
import meta from "./meta";
import demo from "./demo";
import information from "./information";
import modal from "./modal";
import mypage from "./mypage";
import orders from "./orders";
import error from "./error";
import notify from "./notify";
import loading from "./loading";
import wovn from "./wovn";
import subsidy from "./subsidy";
// import navSearch from "./nav-search";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from 'js-cookie'
import preview from "./preview";

const modules = {
  auth,
  page,
  meta,
  demo,
  information,
  modal,
  mypage,
  orders,
  error,
  notify,
  loading,
  wovn,
  subsidy,
  // navSearch,
  preview
};

Vue.use(Vuex);

export default new Vuex.Store({
  modules: Object.keys(modules).reduce((acc, k) => {
    acc[k] = {
      ...modules[k],
      namespaced: true
    };
    return acc;
  }, {}),

// vuex-persistedstate設定
plugins: [createPersistedState(
  {
    key: 'vuex',
    paths: ['preview'], // previewのVuexのみ永続化
    storage: window.sessionStorage  // sessionStorageに保存
  }
)]

});
