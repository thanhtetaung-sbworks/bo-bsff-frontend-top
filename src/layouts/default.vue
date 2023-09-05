<template>
  <div
    class="l-default l-default__container"
    :class="{ 'l-default__container--maintenance': isMaintenance }"
  >
    <div class="l-default__content" id="capture">
      <Header
        class="l-default l-default__header"
        :class="{ 'l-default__header--map': $route.path === '/map' }"
        :isShowSupplementaryCoupon="isShowSupplementaryCoupon"
        :isShowCafeteriaPoint="isShowCafeteriaPoint"
        v-if="isHeader"
      />
      <div
        class="l-default__header--bottom"
        :class="isBorderBottom"
        v-if="isHeader"
      >
        <div class="l-default__header--bottom__inner">
          <PageHeader
            :class="{ 'c-page-header--map': $route.path === '/map' }"
          />
        </div>
      </div>

      <router-view  :boCode="isBoCode"/>

      <Footer-link />
      <div class="c-pageTop" v-if="isPageTop">
        <div class="c-pageTop__button" @click="scrollToTop">
          <Icon
            class="pageTop__button__icon"
            name="arrow_up"
            width="40px"
            height="40px"
          />
        </div>
      </div>
      <Footer
        class="l-default__footer"
        :class="{ 'l-default__footer--map': $route.path === '/map' }"
      />

      <mobile-navigation-bar :items="navItems" :isBoCode="isBoCode" />

    </div>
    <Debug v-if="isDebug" />
    <Notify ref="notify" />
    <CommonModal />
    <!-- <TokenTimer v-if="isLogin" /> -->
    <LoadingProcess />
  </div>
</template>

<script>
import get from 'lodash/get';
export default {
  data() {
    return {
      scroll: 0,
      isHeader: true,
      isFooter: true,
      isPageTop: true,
      isMaintenance: false,
      isBoCode: '',
      isShowSupplementaryCoupon: false,
      isShowCafeteriaPoint: false,
      navItems: [
      {
          id: 1,
          icon: "home",
          text: "ホーム",
          link: process.env.VUE_APP_TOP_DOMAIN,
        },
        {
          id: 2,
          icon: "search",
          text: "探す",
          link: '',
          commit: 'navSearch/openSearchModel'
        },
        {
          id: 3,
          icon: "my_coupon",
          text: "マイクーポン",
          link: `${process.env.VUE_APP_MYPAGE_DOMAIN}/mypage/coupon?sort=displayFrom`
        },
        {
          id: 4,
          icon: "mypage",
          text: "マイページ",
          link: `${process.env.VUE_APP_MYPAGE_DOMAIN}/mypage`
        },
        {
          id: 5,
          icon: "favorite",
          text: "お気に入り",
          link: `${process.env.VUE_APP_MYPAGE_DOMAIN}/mypage/favorites`
        },
      ]
    };
  },
  async created() {

    // check My Coupon
    const coupons = await this.$repositories("subsidy").getSubsidyAvailableLogin();
    const cafe = await this.$repositories('cafe').checkCafeAvailable();

    const availableDataList = get(coupons, "data.availableDataList", []) || [];
    const avaialbleCafe = cafe.data;
    
    if (availableDataList?.length > 0) {
      this.isShowSupplementaryCoupon = true;
    }

    if (avaialbleCafe && avaialbleCafe === 'OK') {
      this.isShowCafeteriaPoint = true;
    }
  },
  mounted() {
    console.log('this.isDebug',this.isDebug);
    this.isTitle = this.$page.isTitle;
    this.$nextTick(() => {
      this.getIsBoCode();
      this.getHeaderFlg();
      this.getPageTopFlg();
      this.getMaintenanceFlg();
    });
  },
  computed: {
    isBorderBottom() {
      if (this.$page.isBreadcrumb && !this.$page.isTitle) return "";
      return "l-default__header--bottom-border";
    },
    isLogin() {
      if (this.$auth.loggedIn) return true;
      return false;
    },
    isDebug() {
      return process.env.VUE_APP_DEV_MODE === this.CONST.ENV.LOCAL;
      // return process.env.VUE_APP_DEV_MODE === 'local' || process.env.VUE_APP_DEV_MODE === 'development';
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    getHeaderFlg() {
      this.isHeader = this.$page.isHeader;
    },
    getPageTopFlg() {
      this.isPageTop = this.$page.isPageTop;
    },
    getMaintenanceFlg() {
      this.isMaintenance = this.$page.isMaintenance;
    },
    async getIsBoCode() {
      const result = await this.$repositories("user").contractInfo();
      this.isBoCode = result?.data?.contractInfo?.[0]?.subscriptions?.[0]?.boServiceCode || '';
    }
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.getHeaderFlg();
        this.getPageTopFlg();
        this.getMaintenanceFlg();
      });
    },
  },
  errorCaptured(error, vm, info) {
    // let errorNotifyOptions = {
    //   group: "error",
    //   type: "error",
    //   title: info,
    //   text: error,
    //   duration: 10000,
    // };
    // this.$refs.notify.show(errorNotifyOptions);
    this.$log.error(info);
  },
};
</script>
