import { createSetCookie } from "@/utils/cookie";
import * as Cookies from 'js-cookie'

export default (context, inject) => {
  const auth = {
    async init(user, subscriptions) {
      if (user) {
        // emailがデータに含まれる場合は、Cookieに入れないように削除する
        if (user.email) {
          delete user.email;
        }
        auth.user = user;
      }
      if (subscriptions) {
        context.store.commit("auth/set", { subscriptions: subscriptions });
      }
    },
    get user() {
      if (!context.store.state.auth.user) return {};
      const clone = JSON.parse(JSON.stringify(context.store.state.auth.user));
      return clone;
    },
    set user(value) {
      context.store.commit("auth/set", { user: value });
    },
    get loggedIn() {
      return context.store.getters["auth/isLoggedIn"];
    },
    get authLevelTimer() {
      return context.store.state.auth.authLevelTimer;
    },
    get subscriptions() {
      return context.store.state.auth.subscriptions;
    },
    removeUser() {
      context.store.commit("auth/removeUser");
      context.store.commit["subsidy/remove"];
    },
    async remove(isPreviewMode) {
      context.store.commit("auth/remove");
      document.cookie = createSetCookie("refresh_token", "", new Date(0));
      context.store.commit["subsidy/remove"];

      // ThemiStruct ログアウト
      const sdk = new IPSDK("https", process.env.VUE_APP_OAUTH2_FQDN, "443");
      try {
          sdk.signout("POST");
      } catch (e) {
          console.log(e);
      }

      Cookies.remove(process.env.VUE_APP_COOKIE_NAME);

      // ログアウト
      await context.$repositories("login").getLogout()
        .catch((e) => {
          console.log(e);
        });

      // プレビュー状態ではTOPに遷移しない
      if (isPreviewMode) {
        return;
      } else {
        // TOP ページへ戻る
          location.href = process.env.VUE_APP_TOP_DOMAIN;
        }
    },
    setLastUserOperationDate() {
      const date = new Date();
      let now = date.getTime();
      context.store.commit("auth/setLastUserOperationDate", now);
    },
    checkLastOperation() {
      const lastTime = context.store.state.auth.lastUserOperationDate;
      if (!lastTime) return false;
      let date = new Date();
      const nowTime = date.getTime();
      const diff = nowTime - lastTime;
      const debug1 = new Date(lastTime);
      const debug2 = new Date(lastTime + 60 * 60 * 1000);
      return diff >= 60 * 60 * 1000;
    },
    get points() {
      return _.get(context.store.getters["auth/get"].user, "totalPoint", "0");
    },
    set points(value) {
      const userInfo = _.cloneDeep(context.store.getters["auth/get"].user);
      userInfo.totalPoint = value;
      return context.store.commit("auth/set", { user: userInfo });
    }
  };

  inject("auth", auth);
};
