<template>
  <main class="l-main">
    <div class="l-error c-card">
      <div class="l-error__inner-red">
        <div class="l-error__message l-error__message--red">
          <span
            ><Icon name="alert" color="#CC0621" width="31" height="28"
          /></span>
          <p>
            エラーが発生しました。
            <br />
            お手数ですが、時間をおいてからお試しください。
            <template v-if="showExternalError">
              <br />
              エラーの詳細 : {{ errorDetail }}
            </template>
          </p>
        </div>

        <div class="l-error__btn">
          <div class="c-buttonWrap4">
            <ButtonLink to="/" style-type="primary" color="color2">
              トップページへ
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
    <!--    <TokenTimer v-if="isLogin" />-->
  </main>
</template>

<script>
export default {
  props: ["error"],
  computed: {
    /**
     * Cookie userInfoが存在しない場合、store auth.userを削除する
     * ※ログイン有効期間を過ぎたため、ログアウトとする
     */
    isLogin() {
      if (this.$auth.loggedIn) return true;
      return false;
    },
    showExternalError() {
      const showList = [
        "/v1/life/order/confirm/pay",
        "/v1/life/order/confirm/paper/pay",
        "/v1/life/order/confirm/paper/no_payment",
        "/v1/life/order/confirm/life1/pay",
        "/v1/life/order/confirm/no_payment"
      ];

      let isErrorAPI = false;

      showList.forEach((item) => {
        if (this.$error.url.includes(item)) isErrorAPI = true;
      });

      const lotteryInfo = JSON.parse(localStorage.getItem("orderInfo"))
        ?.planInfo?.lotteryInfo;
      return isErrorAPI && Boolean(lotteryInfo);
    },
    errorDetail() {
      const message = this.$error.data?.error?.message;
      const errorDetail = message
        ?.substring(message.lastIndexOf('\\"errorDetail\\"'))
        .replaceAll(/\\|"|}/g, "")
        ?.split(":")[1];
      return errorDetail;
    }
  },
  methods: {},
  beforeCreate() {},
  mounted() {
    this.$meta.setDocumentTitle("エラーが発生しました。");
    this.$page.isBreadcrumb = false;
    this.$page.isPageHeader = false;
    this.$page.isPageTop = false;
    this.$page.isSubHeader = true;
    this.$page.showFooterMenu = false;
    this.$page.isFooterText = false;
  },
  watch: {
    $route() {
      this.$meta.setDocumentTitle("エラーが発生しました。");
      this.$page.isBreadcrumb = false;
      this.$page.isPageHeader = false;
      this.$page.isPageTop = false;
      this.$page.isSubHeader = true;
      this.$page.showFooterMenu = false;
      this.$page.isFooterText = false;
    }
  }
};
</script>

<style lang="scss"></style>
