import DefaultLayout from "@/layouts/default";
import CONST_DATA from "@/mixins/const/constData";

// モード：mockかどうか
const mode =
  process.env.VUE_APP_DEV_MODE === CONST_DATA.ENV.LOCAL
    ? /*
  process.env.VUE_APP_DEV_MODE === "local" ||
  process.env.VUE_APP_DEV_MODE === "development"
  */
      "mock"
    : "";

/**
 * auth
 */
const auth = {
  path: "/auth",
  name: "Login",
  component: () => import("@/views/auth")
};

/**
 * contents
 */
const contents = {
  path: "/",
  component: DefaultLayout,
  children: [
    {
      path: "/",
      name: "Top",
      // route level code-splitting
      // this generates a separate chunk (top.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "top" */ "@/views/index.vue"),
      meta: {
        page: {
          title: "",
          name: "トップページ"
        }
      }
    },
    // ================================
    // お知らせ一覧
    // ================================
    {
      path: "/information",
      component: () => import("@/views/information"),
      children: [
        {
          path: "",
          name: "InformationTop",
          component: () => import("@/views/information/index"),
          meta: {
            page: {
              title: "お知らせ一覧",
              name: "お知らせ一覧"
            }
          }
        },
        {
          path: ":id",
          name: "InformationDetail",
          component: () => import("@/views/information/_no/index")
          // meta: {
          //   page: {
          //     title: "お知らせ詳細",
          //     name: "お知らせ詳細"
          //   }
          // }
        }
      ]
    },
    // ================================
    // 特集
    // ================================
    {
      path: "/specialPage",
      component: () => import("@/views/specialPage"),
      children: [
        {
          path: "",
          name: "specialPageTop",
          component: () => import("@/views/specialPage/index"),
          meta: {
            page: {
              title: "特集一覧",
              name: "特集一覧"
            }
          }
        },
        {
          path: "/specialPage/detail",
          name: "specialPageDetail",
          component: () => import("@/views/specialPage/detail"),
          meta: {
            page: {
              title: "特集詳細",
              name: "特集詳細"
            }
          }
        }
      ]
    },
    // ================================
    // その他ページ
    // ================================
    {
      path: "/otherPage",
      component: () => import("@/views/otherPage"),
      children: [
        {
          path: "",
          name: "otherPage",
          component: () => import("@/views/otherPage/index"),
          meta: {
            page: {
              title: "その他ページ",
              name: "その他ページ"
            }
          }
        }
      ]
    },
    // ================================
    // map
    // ================================
    {
      path: "/map",
      name: "map",
      component: () => import("@/views/map")
    },

    // ================================
    // callback
    // ================================
    {
      path: "/authorization/cb",
      name: "callback",
      component: () => import("@/views/authorization/cb")
    },

    // ================================
    // error
    // ================================
    {
      path: "/*maintenance",
      name: "maintenance",
      component: () => import("@/layouts/maintenance.vue"),
      meta: {
        page: {
          title: "maintenance",
          name: "maintenance"
        },
        isShowHeaderContent: false
      }
    },
    {
      path: "/404",
      name: "404Error",
      component: () => import("@/layouts/error_404.vue"),
      meta: {
        page: {
          title: "404Error",
          name: "404Error"
        }
      }
    },
    {
      path: "/*error",
      name: "error",
      component: () => import("@/layouts/error.vue"),
      meta: {
        page: {
          title: "errorDefault",
          name: "errorDefault"
        },
        isShowHeaderContent: false
      }
    },
    {
      path: "/*session-time-out",
      name: "sessionTimeOut",
      component: () => import("@/layouts/error_session.vue"),
      meta: {
        page: {
          title: "sessionTimeOut",
          name: "sessionTimeOut"
        },
        isShowHeaderContent: false
      }
    },
    {
      path: "/*",
      // redirect: '/404',
      beforeEnter() {
        window.location = "/404";
      }
    }
  ]
};

// 開発モード(local, development)用ルーティング
let devRoutes = [auth];
if (mode !== "mock") devRoutes = [];

// ルーティングリスト
let routes = [contents];
routes = devRoutes.concat(routes);

export default routes;
