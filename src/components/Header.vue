<template>
  <header class="l-header" :inert="$modal.inert">
    <div class="l-header__top" :class="{ 'l-header__sub': isSubHeader }">
      <section class="l-header__top__inner">
        <div class="l-header__top__logo">
          <CMS
              contents_type="block_contents"
              location_code="BS_TOP_01_001-TOP_LOGO"
          />
        </div>
        <div v-if="showHeaderContent" class="l-header__top__menu">
          <ul class="l-header__menu__list l-header__menu__list--lg">
            <li class="l-header__menu__item">
              <a
                :href="domainMypage + '/mypage/coupon?sort=displayFrom'"
                class="l-header__menu__item__link"
              >
                <div>
                  <Icon name="mycoupon" />
                </div>
                <p>マイクーポン</p>
              </a>
            </li>
            <li v-if="isLogin && isShowSupplementaryCoupon" class="l-header__menu__item">
              <a
                :href="domainMypage + '/mypage/coupons'"
                class="l-header__menu__item__link"
              >
              <div>
                <Icon name="auxiliarycoupon" />
              </div>
              <p>補助クーポン</p>
              </a>
            </li>
            <li v-if="isLogin && showCafe" class="l-header__menu__item">
              <a
                :href="domainCafe"
                class="l-header__menu__item__link"
                target="_blank"
              >
                <div>
                  <Icon name="cafe" />
                </div>
                <p>カフェ</p>
              </a>
            </li>
            <li class="l-header__menu__item">
              <a
                :href="domainMypage + '/mypage/favorites'"
                class="l-header__menu__item__link"
              >
              <div>
                <Icon name="favorite_border" />
              </div>
              <p>お気に入り</p>
              </a>
            </li>
            <li class="l-header__menu__item" v-if="isLogin">
              <a
                :href="domainMypage + '/mypage/benepo?currentID=0'"
                class="l-header__menu__item__link"
              >
              <p><span class="l-header__menu__item__benepo">{{ userData.totalPoint }}</span> ベネポ</p>
              </a>
            </li>
            <li
              v-if="isLogin"
              class="l-header__menu__item"
              tabindex="0"
              @click="isUserInfoMenus = true"
              @keyup.enter="isUserInfoMenus = !isUserInfoMenus"
            >
              <div v-if="userData.ssoPrincipalFlg == 1" class="l-header__menu__item__label--self">
                本人
              </div>
              <div v-if="userData.ssoPrincipalFlg == 0" class="l-header__menu__item__label--family">
                家族
              </div>
              <p
                v-if="userData.familyName || userData.firstName"
                class="l-header__menu__list__text"
                wovn-ignore
              >
                <span>{{ userName }}</span>様
              </p>
              <p v-else class="l-header__menu__list__text" wovn-ignore>
                氏名未設定
              </p>
              <UserMenus
                :isShow="isUserInfoMenus"
                @hide="isUserInfoMenus = false"
              />
            </li>
            <li v-if="!isLogin && !isPreview">
              <a class="c-button__login" :href="redirectUrl">ログイン</a>
            </li>
          </ul>
          <div class="l-header__menu__list l-header__menu__list--bottom">
            <!-- SP未ログイン時に表示 -->
            <div class="l-header__menu__list--sm">
              <a
                :href="redirectUrl"
                class="l-header__menu__item__link"
              >
                <div class=" display--none">
                  <template v-if="!isLogin && !isPreview">
                    <Icon
                      name="login"
                    />
                    <p>ログイン</p>
                  </template>
                </div>
              </a>
            </div>
            <!-- ハンバーガメニュー -->
            <div class="l-header__menu__list--sm">
              <a
                tabindex="0"
                @keyup.enter="toggleDrawerMenu"
                @click="toggleDrawerMenu"
              >
                <div>
                  <template v-if="isDrawerMenus">
                    <Icon
                      name="navigation_close"
                      width="24px"
                      height="24px"
                      style="vertical-align: middle"
                    />
                    <p>閉じる</p>
                  </template>
                  <template v-else>
                    <Icon
                      name="navigation_hamburger"
                      width="24px"
                      height="24px"
                      style="vertical-align: middle"
                    />
                    <p>メニュー</p>
                  </template>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- SPドロワーメニュー -->
    <DrawerMenuSp
      :isShow="isDrawerMenus"
      @hide="isDrawerMenus = false"
      :isShowSupplementaryCoupon="isShowSupplementaryCoupon"
      :isLogin="isLogin"
      :isShowCafeteriaPoint="isShowCafeteriaPoint"
    />
  </header>
</template>

<script>
import { parseCookie } from "@/utils/cookie";
import _ from "lodash";

export default {
  props: {
    isShowSupplementaryCoupon:{
      type: Boolean,
      default: false
    },
    isShowCafeteriaPoint:{
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isDrawerMenus: false,
      isUserInfoMenus: false,
      isSearch: false,
      isSubHeader: false
    };
  },
  computed: {
    showCafe() {
      return this.isShowCafeteriaPoint;
    },
    domainTop() {
      return process.env.VUE_APP_TOP_DOMAIN;
    },
    domainMypage() {
      return process.env.VUE_APP_MYPAGE_DOMAIN;
    },
    domainCafe() {
      const cafeUrl = process.env.VUE_APP_CAFE_SYS_URL;
      return cafeUrl;
    },
    /**
     * ログインユーザー情報を取得して返却する
     * @return {object} - ログインユーザー情報のオブジェクト
     */
    userData() {
      if (!this.$auth || !this.$auth.user) return "";
      return this.$auth.user;
    },
    /**
     * ログインユーザー名を登録状況ごとに結合して返却する
     * @return {string} - ログインユーザー名のテキスト
     */
    userName() {
      if (!this.userData) {
        return "";
      } else if (this.userData.familyName && this.userData.firstName) {
        return this.userData.familyName + " " + this.userData.firstName;
      } else {
        return this.userData.familyName || this.userData.firstName;
      }
    },
    /**
     * ユーザーがログインしているかどうかを判定する
     * @return {boolean} - ログインしているかどうか
     */
    isLogin() {
      if (this.$auth.loggedIn) return true;
      return false;
    },
    /**
     * ヘッダーメニューの本体部分を表示するかどうかを判定する
     * @return {boolean} - ヘッダーメニューの本体部分を表示するかどうか
     */
    showHeaderContent() {
      if (typeof this.$route.meta.isShowHeaderContent !== "boolean")
        return true;
      this.isShowHeaderContent = this.$route.meta.isShowHeaderContent;
      return this.isShowHeaderContent;
    },
    /**
     * ログインページからのリダイレクトするためのURLを生成して返却する
     * @return {string} - ログインページからのリダイレクトするためのURLテキスト
     */
    redirectUrl() {
      return (
        process.env.VUE_APP_AUTHORIZATION + "/v1/top/login"
      );
    },
    /**
     * 現在のページのpathを取得して返却する
     * @return {string} - 現在のページのpathテキスト
     */
    currentpath() {
      return this.$route.path;
    },
    isPreview() {
      //return this.$store.state.preview.previewMode
      return this.$store.getters['preview/getPreviewDate']
    }
  },
  created() {
    if (this.$store.getters["auth/get"].authenticate) {
      this.$modal.open("LoginGuidanceModal");
      this.$store.commit("auth/set", { authenticate: false });
    }

    // GET POINTS
    if (this.$auth.loggedIn){
    this.$repositories("mypage")
      .getPointHistory({
        commandType: "1,2,3,4"
      })
      .then((response) => {
        const totalPoint = _.get(response, "data.totalPoint") || 0;
        this.$auth.points = totalPoint;
      });
    }
  },
  methods: {
    /**
     * 現在フォーカスしているHTML要素からフォーカスを外す
     */
    blur() {
      document.activeElement.blur();
    },
    search() {
      window.alert("Not Implemented");
    },
    /**
     * ハンバーガーメニューの表示非表示を切り替える
     */
    toggleDrawerMenu() {
      if (window.innerWidth > this.$config.responsiveWidth) return false;
      this.isDrawerMenus = !this.isDrawerMenus;
    },
    /**
     * サブヘッダーの表示の有無を判定するフラグをストアから取得する
     */
    getSubHeaderFlg() {
      this.isSubHeader = this.$page.isSubHeader;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getSubHeaderFlg();
    });
  },
  watch: {
    $route() {
      this.isDrawerMenus = false;
      this.isUserInfoMenus = false;
      this.isSearch = false;
      if (this.$store.getters["auth/get"].authenticate) {
        this.$modal.open("LoginGuidanceModal");
        this.$store.commit("auth/set", { authenticate: false });
      }
      this.$nextTick(() => {
        this.getSubHeaderFlg();
      });
    }
  }
};
</script>

<style scoped>
.display--none {
  display: none;
}
@media only screen and (max-width: 820px) {
  .display--none {
    display: block;
    padding: 0.5rem;
  }
}
</style>