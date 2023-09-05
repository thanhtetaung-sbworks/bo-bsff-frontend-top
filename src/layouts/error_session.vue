<template>
  <main class="l-main">
    <div class="l-error c-card">
      <div class="l-error__inner-red">
        <div class="l-error__message l-error__message--red">
          <span
            ><Icon name="alert" color="#CC0621" width="31" height="28"
          /></span>
          <p>
            セッションタイムアウトになりました。
            <br />
            お手数ですが、再度ログインしてください。
          </p>
        </div>

        <div class="l-error__btn">
          <div class="c-buttonWrap4">
            <ButtonLink tag="a" :href="redirectUrl" style-type="primary" color="color2">
              ログイン
            </ButtonLink>
            <br />
            <Button @click.native="$auth.remove" style-type="primary" color="color2">
            ログアウト
            </Button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  props: ["error"],
  computed: {
    redirectUrl() {
      // 戻り先 url の設定が必要
      return (
        process.env.VUE_APP_AUTH_FACADE +
        "?callback_authorization_start_uri=" +
        process.env.VUE_APP_API_DOMAIN +
        "/v1/top/auth-start"
      );
    },
  },
  methods: {
    // ログアウト処理実行
    async logout() {
      this.$auth.remove();
    }
  },
  methods: {},
  mounted() {
    this.$meta.setDocumentTitle("セッションタイムアウトになりました。");
    this.$page.isBreadcrumb = false;
    this.$page.isPageHeader = false;
    this.$page.isPageTop = false;
    this.$page.isSubHeader = true;
    this.$page.showFooterMenu = false;
    // Remove logic authenticationLevel
    // if(this.$route.query.authenticationLevel != 1){
    //   this.logout();
    // }
  },
  watch: {
    $route() {
      this.$meta.setDocumentTitle("セッションタイムアウトになりました。");
      this.$page.isBreadcrumb = false;
      this.$page.isPageHeader = false;
      this.$page.isPageTop = false;
      this.$page.isSubHeader = true;
      this.$page.showFooterMenu = false;
      // Remove logic authenticationLevel
      //   if(this.$route.query.authenticationLevel != 1){
      //     this.logout();
      //   }
    },
  },
};
</script>

<style lang="scss"></style>
