<template>
  <div
    class="p-drawer-menu-sp"
    :class="{ 'p-drawer-menu-sp--hide': hideSideMenu }"
  >
    <div
      v-if="isShow"
      class="p-drawer-menu-sp__overlay"
      @click.stop="$emit('hide')"
    ></div>
    <div
      class="p-drawer-menu-sp__inner"
      :class="{ 'p-drawer-menu-sp__inner--open': isShow }"
    >
      <div class="p-drawer-menu-sp__list p-drawer-menu-sp__list--loggedIn">
        <template v-if="$auth.loggedIn">
          <div class="p-drawer-menu-sp__head">
            <template
              v-if="userData.familyName || userData.firstName"
              wovn-ignore
            >
              <div class="p-drawer-menu-sp__head__wrapper">
                <span class="p-drawer-menu-sp__head--userName">{{ userName }}様 </span>
                <div v-if="userData.ssoPrincipalFlg == 1" class="l-header__menu__item__label--self">
                  本人
                </div>
                <div v-if="userData.ssoPrincipalFlg == 0" class="l-header__menu__item__label--family">
                  家族
                </div>
              </div>
              <span class="p-drawer-menu-sp__head--userInfo">
                会員ID：{{ userData.ssoCustomerNo }}<br />
                店頭番号：{{ userData.ssoMembrNo }}
              </span>
            </template>
            <span v-else wovn-ignore>氏名未設定</span>
          </div>
          <a :href="domainMypage + '/mypage/benepo?currentID=0'">
            <div class="p-drawer-menu-sp__item--benepo">
              <div class="p-drawer-menu-sp__benepo">
                <p class="p-drawer-menu-sp__benepo--title">保有ベネポ</p>
                <p class="p-drawer-menu-sp__benepo--point">
                  {{ userData.totalPoint }}<span>ベネポ</span>
                </p>
              </div>
              <div
                class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
              ></div>
            </div>
          </a>
        </template>
        <template v-else>
          <div class="p-drawer-menu-sp__head">
            <div class="p-drawer-menu-sp__login">
              <a :href="redirectUrl">ログイン</a>
            </div>
          </div>
        </template>
        <div class="p-drawer-menu-sp__section">クーポン</div>
        <a :href="domainMypage + '/mypage/coupon?sort=displayFrom'">
          <div
            class="p-drawer-menu-sp__item"
            :class="{ 'p-drawer-menu-sp__bottom-none': (isLogin && isShowSupplementaryCoupon) }"
          >
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>マイクーポン</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <a v-if="isLogin && isShowSupplementaryCoupon" :href="domainMypage + '/mypage/coupons'">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>補助クーポン</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <div class="p-drawer-menu-sp__section" v-if="isLogin && isShowCafeteriaPoint">カフェ</div>
        <a v-if="isLogin && isShowCafeteriaPoint" :href="domainCafe" target="_blank">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>カフェ</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <div class="p-drawer-menu-sp__section">お気に入り</div>
        <a :href="domainMypage + '/mypage/favorites'">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>お気に入り</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>

        <div class="p-drawer-menu-sp__section">閲覧履歴</div>
        <a :href="domainMypage + '/mypage/visits'">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>閲覧履歴</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>



        <div class="p-drawer-menu-sp__section">申込履歴</div>
        <a :href="domainMypage +'/mypage/orders'">
          <div class="p-drawer-menu-sp__item p-drawer-menu-sp__bottom-none items-start">
            <div class="p-drawer-menu-sp__subitem"></div>
            <div class="flex flex-col">
              <span>ライフサービス・国内の宿</span>
              <span>（Bene楽天・公共の宿はこちら）</span>
            </div>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a> 


        <a target="_blank" :href="ssoStayUrl">
          <div class="p-drawer-menu-sp__item p-drawer-menu-sp__bottom-none items-start justify-between">
            <div class="flex">
              <div class="p-drawer-menu-sp__subitem"></div>
              <div class="flex flex-col">
                <span>海外旅行・その他旅行関連</span>
                <span>（パッケージツアー、航空券・交通はこちら）</span>
              </div>
            </div>
            <div class="">
              <img
                  src="@/assets/images/icon/arrow-up-right-from-square-solid.svg"
                  alt="arrow-up-right-from-square-solid_icon"
                  width="13" height="13"
                />
            </div>
          </div>
        </a>

        <!-- TODO:次回フェーズで使用する可能性があるため、コメントアウト -->
        <!-- <a target="_blank" :href="ssoShopUrl" class="external-link">
          <div class="p-drawer-menu-sp__item p-drawer-menu-sp__bottom-none items-start justify-between">
            <div class="flex">
              <div class="p-drawer-menu-sp__subitem"></div>
              <div class="flex flex-col">
                <span>ベネ通販</span>
              </div>
            </div>
            <div class="">
              <img
                  src="@/assets/images/icon/arrow-up-right-from-square-solid.svg"
                  alt="arrow-up-right-from-square-solid_icon"
                  width="13" height="13"
                />
            </div>
          </div>
        </a> -->
        
        
        <a target="_blank" :href="`${ isKyutokuMember ? qtokPaymentUrl : 'https://bs.benefit-one.inc/otherPage?other_id=kyuutoku_mypage' }`">
          <div class="p-drawer-menu-sp__item p-drawer-menu-sp__bottom-none items-start">
            <div class="p-drawer-menu-sp__subitem"></div>
            <div class="flex flex-col">
              <span>給トク払い</span>
            </div>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>            

        <div class="p-drawer-menu-sp__section">会員設定</div>
        <a :href="domainMypage + '/mypage/setting'">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>会員設定</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <div class="p-drawer-menu-sp__section">ご利用ガイド</div>
        <a :href="domainTop + '/otherPage?other_id=goriyou'">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>ご利用ガイド</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <div class="p-drawer-menu-sp__section">お知らせ</div>
        <a :href="domainTop + '/information'">
          <div class="p-drawer-menu-sp__item">
            <div class="p-drawer-menu-sp__subitem"></div>
            <span>お知らせ</span>
            <div
              class="p-drawer-menu-sp__arrow p-drawer-menu-sp__arrow--right"
            ></div>
          </div>
        </a>
        <div v-if="$auth.loggedIn" class="p-drawer-menu-sp__logout">
          <router-link to="/" @click.native="loggedOut">
            ログアウト
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    isShowSupplementaryCoupon: {
      type: Boolean,
      default: false
    },
    isLogin: {
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
      hideSideMenu: false,
      resizeFlag: "",
      contractInfo: []
    };
  },
  computed: {
    ssoStayUrl() {
      return process.env.VUE_APP_INTERNAL_OTHER_STAY_URL_SSO;
    },
    ssoShopUrl() {
      return process.env.VUE_APP_SHOP_URL_SSO;
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
     * ログインページからのリダイレクトするためのURLを生成して返却する
     * @return {string} - ログインページからのリダイレクトするためのURLテキスト
     */
     redirectUrl() {
      return (
        process.env.VUE_APP_AUTHORIZATION + "/v1/top/login"
      );
    },
    /**
     * 「給トク払い」リンクの条件分岐フラグ
     * @param { void }
     * @return { boolean } boServiceCodeが「SD」の場合、給トクありのアカウント
     */
     isKyutokuMember() {
      let kyutokuFlg = false
      let containFlgs = []
      if (!this.contractInfo || this.contractInfo?.length === 0) return kyutokuFlg

      this.contractInfo.map(obj => {
        const filteredArr = obj.subscriptions.filter(obj => obj.boServiceCode === "SD")
        if (filteredArr.length > 0) return containFlgs.push(true)
        containFlgs.push(false)
      })
      
      if (containFlgs.includes(true)) kyutokuFlg = true
      return kyutokuFlg
    },
    /**
     * 給トクメンバーの場合、「給トク払い」リンク
     * @param { void }
     * @return { string }
     */
    qtokPaymentUrl() {
      return process.env.VUE_APP_WITH_QTOK_PAYMENT_URL
    },
  },
  methods: {
    /**
     * ログアウトの処理を行う
     */
    loggedOut() {
      this.$auth.remove();
      this.$nextTick(() => {
        this.$router.push("/");
        this.$emit("hide");
      });
    },
    /**
     * モーダル表示時にスクロールを固定する
     */
    fixScroll() {
      if (this.isShow) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "visible";
      }
    },
    /**
     *  画面のリサイズ中はプルダウンメニューを非表示にする
     */
    async hideSideMenuDuringResize() {
      this.hideSideMenu = true;
      if (this.resizeFlag !== false) {
        clearTimeout(this.resizeFlg);
      }
      const self = this;
      this.resizeFlg = await setTimeout(() => {
        self.hideSideMenu = false;
      }, 500);
    },
    // アカウント情報の取得
    async getContractInfo() {
      await this.$repositories("user").contractInfo()
        .then((res) => {
          this.contractInfo = res.data.contractInfo
        })
    },
  },
  mounted() {
    this.fixScroll();
    this.getContractInfo()
    window.addEventListener("resize", this.hideSideMenuDuringResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.hideSideMenuDuringResize);
  },
  watch: {
    isShow() {
      this.fixScroll();
    }
  }
};
</script>

<style lang="scss" scoped></style>
