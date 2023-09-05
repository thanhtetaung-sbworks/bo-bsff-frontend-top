import "@/assets/css/style.scss";
import "@/main.components";
import App from "@/App.vue";
import Vue from "vue";
import plugins from "@/plugins";
import router from "@/router";
import store from "@/store";
import VueHead from "vue-head";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueNotifications from "vue-notification";
import "swiper/css/swiper.css";
import "wicg-inert";
import VueGtag from "vue-gtag";
// import FloatingVue from "floating-vue";
// import "floating-vue/dist/style.css";
import Const from "@/mixins/const/setMixins";
import jQuery from 'jquery';
import 'slick-carousel';
import VueLazyload from 'vue-lazyload'
import BoBsffFrontendCommon from 'common';
import Repository from './repositories/repository';


global.jquery = jQuery;
global.$ = jQuery;
window.$ = window.jQuery = require('jquery');

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GOOGLE_CODE }
});

Vue.config.productionTip = false;

const context = {
  router,
  store
};

for (const plugin of plugins) {
  function inject(name, value) {
    const prop = "$" + name.replace(/^\$+/g, "");
    Vue.prototype[prop] = Vue.observable(value);
    context[prop] = Vue.prototype[prop];
  }
  Vue.use({
    install(Vue, options) {
      plugin(context, inject);
    }
  });
}
Vue.use(VueHead);
Vue.use(VueAwesomeSwiper);
Vue.use(VueNotifications);
// Vue.use(FloatingVue);

Vue.prototype.$Repository = Repository;
Vue.use(BoBsffFrontendCommon, { 
  store, 
  router, 
  Repository, 
  config : {
    staySearchDomain: process.env.VUE_APP_SEARCH_STAY_DOMAIN,
    shopSearchDomain: process.env.VUE_APP_SHOP_DOMAIN,
    lifeSearchDomain: process.env.VUE_APP_LIFE_DOMAIN,
    internalStayUrlSso: process.env.VUE_APP_INTERNAL_STAY_URL_SSO,
    internalOtherStayUrlSso: process.env.VUE_APP_INTERNAL_OTHER_STAY_URL_SSO,
  },
  installedPlugins: []
});
//'floating-vue', 'vuejs-datepicker'
/**
 * vue-lazyloadの初期設定
 */
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})

Vue.mixin(Const);

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    context.$route = this.$route;
  },
  mixins: []
}).$mount("#app");
