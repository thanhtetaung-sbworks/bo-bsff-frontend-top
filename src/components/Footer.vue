<template>
  <footer
    class="l-footer"
    :class="{ 'l-footer--show': showFooterMenu }"
    :inert="$modal.inert"
  >
    <template v-if="showFooterMenu">
      <div class="wovn-languages">
        <i><img src="https://cms.benefit-one.inc/sites/default/files/2023-02/wovn-icon%402x.png" alt="" width="28" height="28"></i>
        <span class="wovn-switch" data-value="ja">日本語</span>
        <span>|</span>
        <span class="wovn-switch" data-value="en">English</span>
      </div>
      <!-- バナー（下部） -->
      <CMS
          contents_type="block_contents"
          location_code="BS_TOP_01_012-TOP_minibanner"
      />
      <div class="l-footer__menu">
        <div class="l-footer__menu__inner">
          <ul class="l-footer__info__inner__serviceList">
            <template v-if="!isLogin()">
              <li>
                <a @click="linkToHealthPortal">
                  <img src="https://cms.benefit-one.inc/sites/default/files/contents/top/logo_kenkopoint.jpg" alt="健康ポイント">
                </a>
              </li>
              <li>
                <a @click="linkToIncentivepoint">
                  <img src="https://cms.benefit-one.inc/sites/default/files/contents/top/logo_incentivepoint.jpg" alt="IC">
                </a>
              </li>
              <li>
                <a @click="linkToBopf">
                  <img src="https://cms.benefit-one.inc/sites/default/files/contents/top/logo_bpf.jpg" alt="BPF">
                </a>
              </li>
<!--
              <li>
                <a href="https://bff-top.bs.st.benefit-one.inc/v1/sso/healthportal" target="_blank">
                  <img src="https://benefitonecms.prod.acquia-sites.com/sites/default/files/contents/top/logo_bpf.jpg" alt="健康ポータル">
                </a>
              </li>
              <li>
                <div @click="postSsoHappylth">
                  <img src="https://benefitonecms.prod.acquia-sites.com/sites/default/files/contents/top/logo_bpf.jpg" alt="ハピルス検診">
                </div>
              </li>
-->
            </template>
            <template v-else>
              <li v-if="subscriptions.find(el => el.boServiceCode === 'HP')">
                <a @click="linkToHealthPortal">
                  <img src="https://cms.benefit-one.inc/sites/default/files/contents/top/logo_kenkopoint.jpg" alt="健康ポイント">
                </a>
              </li>
              <li v-if="subscriptions.find(el => el.boServiceCode === 'IC')">
                <a @click="linkToIncentivepoint">
                  <img src="https://cms.benefit-one.inc/sites/default/files/contents/top/logo_incentivepoint.jpg" alt="IC">
                </a>
              </li>
              <li>
                <a @click="linkToBopf">
                  <img src="https://cms.benefit-one.inc/sites/default/files/contents/top/logo_bpf.jpg" alt="BPF">
                </a>
              </li>
            </template>
          </ul>
        </div>
      </div>

      <div class="l-footer__menu">
        <div class="l-footer__menu__inner l-footer__menu__inner-bottom">
          <CMS
              contents_type="header_footer"
              view_area="footer"
          />
          <!--
          <div class="l-footer__menu-list">
            <div class="l-footer__menu-list__body">
              <CMS
                  contents_type="header_footer"
                  view_area="footer"
              />
            </div>
          </div>
          <div class="l-footer__menu-banner">
            <ul>
              <li class="l-footer__menu-banner__item">
                <CMS
                    contents_type="block_contents"
                    location_code="BS_TOP_01_013-TOP_form"
                />
              </li>
            </ul>
          </div>
          -->
        </div>
      </div>
    </template>
    <div class="l-footer__copy">
      &copy;{{ $moment().year() }} {{ $config.author }}
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      showFooterMenu: true,
      subscriptions: [],
    };
  },
  methods: {
    linkToHealthPortal(){
      var link = ''
      if(process.env.VUE_APP_DEV_MODE === this.CONST.ENV.PRODUCTION){
        link = 'https://hlpt.benefit-one.inc/'
      }else if(process.env.VUE_APP_DEV_MODE === this.CONST.ENV.STAGING){
        link = 'https://hlpt.st.benefit-one.inc/'
      }else if(process.env.VUE_APP_DEV_MODE === this.CONST.ENV.DEVELOPMENT){
        link = 'https://hlpt.tst.benefit-one.inc/'
      }else{
        link = 'http://localhost:8080/v1/sso/healthportal'
      }
      window.open(link, '_blank')
    },
    linkToIncentivepoint(){
      var link = ''
      if(process.env.VUE_APP_DEV_MODE === this.CONST.ENV.PRODUCTION){
        link = 'https://icpt.benefit-one.inc/'
      }else if(process.env.VUE_APP_DEV_MODE === this.CONST.ENV.STAGING){
        link = 'https://icpt.st.benefit-one.inc/'
      }else if(process.env.VUE_APP_DEV_MODE === this.CONST.ENV.DEVELOPMENT){
        link = 'https://icpt.tst.benefit-one.inc/'
      }else{
        link = 'https://icpt.tst.benefit-one.inc/'
      }
      window.open(link, '_blank')
    },
    linkToBopf(){
      var link = ''
      if(process.env.VUE_APP_DEV_MODE === this.CONST.ENV.PRODUCTION){
        link = 'https://bopf.benefit-one.inc/auth/user/signin'
      }else if(process.env.VUE_APP_DEV_MODE === this.CONST.ENV.STAGING){
        link = 'https://bopf.st.benefit-one.inc/auth/user/signin'
      }else if(process.env.VUE_APP_DEV_MODE === this.CONST.ENV.DEVELOPMENT){
        link = 'https://bopf-web.tst.bopf.benefit-one.inc/auth/user/signin'
      }else{
        link = 'https://bopf-web.tst.bopf.benefit-one.inc/auth/user/signin'
      }
      window.open(link, '_blank')
    },
    /**
     * フッターのメニュー表示の有無を判定するフラグをストアから取得する
     */
    getShowFooterMenuFlg() {
      this.showFooterMenu = this.$page.showFooterMenu;
    },
    getFromSiteCode() {
      return this.$repositories("user").contractInfo()
        .then((res) => {
          // store から、companyCd・customerNo を取得
          const { user } = this.$store.getters['auth/get'];
          const customerNo = user.ssoCustomerNo

          // リクエストから、一致する情報を抽出
          const contractInfo = res.data.contractInfo;
          contractInfo.forEach((info) => {
            if( info.customerNo === customerNo ) {
              this.subscriptions = info.subscriptions;
            }
          });
        })
        .catch(() => {
          // TODO: エラー時の処理
        });
    },
    isLogin() {
      if (this.$auth.loggedIn) return true;
      return false;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getShowFooterMenuFlg();
    });
    console.log('login', this.$auth.loggedIn);
    this.getFromSiteCode();
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.getShowFooterMenuFlg();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wovn-languages {
  color: #73767A;
  display: flex!important;
  gap: 6px;
  justify-content: center;
  margin-bottom: 10px;
}
.wovn-languages i {
  align-self: center;
  display: flex;
}
.wovn-languages img {
  display: inline-block;
  max-width: 14px;
  height: auto;
}
.wovn-languages .wovn-switch {
  cursor: pointer;
}
.wovn-switch:hover {
  color: #da291c;
}
.wovn-switch.selected {
  cursor: unset;
  color: #1F2021;
}
</style>
