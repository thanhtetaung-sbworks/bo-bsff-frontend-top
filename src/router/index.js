import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import routesConfig from "@/router/routes";
import VueGtag from "vue-gtag";
import CONST_DATA from "@/mixins/const/constData";
import UserRepository from '@/repositories/repository-user'
import UserRepositoryMock from '@/repositories/mock/repository-user'

Vue.use(Router);

const NO_AUTHENTICATION_URL = [
  '/authorization/cb',
  '/session-time-out'
]
const UserRepo = process.env.VUE_APP_DEV_MODE === CONST_DATA.ENV.LOCAL ? UserRepositoryMock : UserRepository

const routes = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    if (from.path !== to.path) {
      return { x: 0, y: 0 };
    }
    return false;
  },
  routes: routesConfig
});

routes.beforeEach(async(to, from, next) => {
  // 動的に追加されている場合のmetaタグの初期化
  Vue.prototype.$meta.deleteDocumentMetaData();
  // ドキュメントタイトルの初期化
  Vue.prototype.$meta.setDocumentTitle();
  // ディスクリプションの初期化
  Vue.prototype.$meta.setDocumentDesctiption();
  // inert属性を無効にする
  Vue.prototype.$modal.inert = false;

  if(!NO_AUTHENTICATION_URL.includes(to.path) && !store.getters['auth/get'].user) {
    const postUserResult = await UserRepo.postUser();
    if(postUserResult && !postUserResult.isError && postUserResult.data) {
      store.commit("auth/set", {user: postUserResult.data});
    }
  }
  if (
    process.env.VUE_APP_DEV_MODE !== CONST_DATA.ENV.LOCAL &&
    to.matched.some((page) => page.meta.isAuthenticate) &&
    !store.getters["auth/get"].user &&
    from.path != "/auth" &&
    from.path != "/authorization/cb" &&
    to.path != "/"
  ) {
    store.commit("auth/set", { authenticate: true });
    next({
      path: from.path + "?back_uri=" + to.fullPath
    });

// Remove logic authenticationLevel
//     // authenticationLevelが１で下記ページにアクセスした場合は再ログイン処理を実行する
//     // 申込ページ or マイページ
//   } else if (
//     process.env.VUE_APP_DEV_MODE !== "local" &&
//     store.getters["auth/get"].user &&
//     store.getters["auth/get"].user.authenticationLevel !== 1 &&
//     new RegExp(/^\/(mypage)|(orders)\/.*/).test(to.path)
//   ) {
//     store.commit("auth/set", { authenticate: true });
//     next({
//       path: from.path + "?back_uri=" + to.fullPath
//     });
   } else {
    const route = to.matched.map((matched) => ({
      name: (matched.meta.page || {}).name,
      path: matched.path
    }));

    // トップページ以外はチャットボットを非表示にする
    if (to.path == "/") {
      document.body.classList.add('is_top')
      document.body.classList.remove('is_not_top')
    } else {
      document.body.classList.remove('is_top')
      document.body.classList.add('is_not_top')
    }
    
    store.commit("page/set", { routes: [] });
    store.commit("page/isPageHeader", true);
    store.commit("page/isBreadcrumb", true);
    store.commit("page/isTitle", true);
    store.commit("page/showFooterMenu", true);
    store.commit("page/isFooterText", false);
    next();
  }
});

Vue.use(
  VueGtag,
  {
    config: { id: process.env.VUE_APP_GOOGLE_CODE }
  },
  routes
);

export default routes;
