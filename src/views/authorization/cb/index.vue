<template>
  <div>
    <LoadingPage />
    <AccountModal
      ref="accountModal"
      :accountList="accountList"
      @userSelect="userSelect"
      @hide="hide"
    />
    <FirstLoginModal ref="firstLoginModal" @submit="submit" @hide="hide" />
  </div>
</template>

<script>
import CryptoJS from "crypto-js";

import { createSetCookie, parseCookie } from "@/utils/cookie";

export default {
  data() {
    return {
      verifier: undefined,
      challenge: undefined,
      backUri: undefined,
      accountList: [],
      idToken: undefined,
      subscriptions: []
    };
  },
  async created() {
    const cookie = parseCookie(document.cookie);
    console.log("created cookie", cookie);
    // 有効期限の違いがあるため別途記述
    /*
    if (!cookie["back_uri"]) {
      document.cookie = createSetCookie(
        "back_uri",
        this.$route.query.authorization_back_uri
      );
    } else {
      this.backUri = cookie["back_uri"].replace(/^.*back_uri=/, "");
    }
    */
    this.backUri = this.$route.query.authorization_back_uri;
    console.log("created backUri", backUri);
  },
  async mounted() {
    // 不要なものは非表示に
    this.$page.isHeader = false;
    this.$page.isPageTop = false;
    this.$page.isBreadcrumb = false;
    this.$page.isPageHeader = false;
    this.$page.showFooterMenu = false;

    this.$repositories("user")
      .contractInfo()
      .then((resLogin) => {
        const contractInfo = resLogin.data.contractInfo;
        const contractInfoLen = contractInfo.length;
        // customerNoの数で処理を変更
        if (contractInfoLen > 1) {
          for (let i = 0; i < contractInfoLen; i++) {
            this.accountList.push({
              id: contractInfo[i].customerNo,
              name: contractInfo[i].companyName
            });
          }
          this.$refs.accountModal.show();
        } else {
          this.userConfirm(contractInfo[0].customerNo);
          this.subscriptions = contractInfo[0].subscriptions;
          this.boSrvCd = contractInfo[0].subscriptions[0].boServiceCode;
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("BFF:loginエラー");
        this.erroLogin();
      });
  },
  beforeDestroy() {
    // 不要としたものを表示状態にする
    this.$page.isHeader = true;
    this.$page.isPageTop = true;
    this.$page.isBreadcrumb = true;
    this.$page.isPageHeader = true;
    this.$page.showFooterMenu = true;
  },
  methods: {
    async userConfirm(customerNo) {
      this.$loading.startProcessing();
      const params = new URLSearchParams();
      params.append("customerNo", customerNo);
      /*
      const params = {
        customerNo: customerNo
      };
      */

      const updateUserResult = await this.$repositories("user").updateUser(
        params
      );
      console.log('updateUserResult = ', updateUserResult)
      console.log('updateUserResult.data = ', updateUserResult.data)
      console.log('updateUserResult.data.isCompleteFirstLogin = ', updateUserResult.data.isCompleteFirstLogin)

      if (updateUserResult.isError) {
        console.log("BFF:ユーザー情報更新エラー", updateUserResult);
        this.erroLogin();
        return;
      }

      if (updateUserResult.data.isCompleteFirstLogin) {
        // ユーザー情報取得
        const postUserResult = await this.$repositories("user").postUser();
        if (postUserResult.isError) {
          console.log("/v1/users/my: エラー", postUserResult);
          this.erroLogin();
          return;
        }

        this.finishLogin(postUserResult.data);
      } else {
        // 初回モーダル表示
        this.$refs.firstLoginModal.show();
        this.$loading.finishProcessing();
      }
    },
    async userSelect(customerNo) {
      await this.userConfirm(customerNo);
    },
    async submit(e) {
      this.$loading.startProcessing();
      const params = {
        isSubscribe: e.isSubscribe
      };

      // 初回ログイン完了API実行
      const putCompleteResult = await this.$repositories("login").putComplete(
        params
      );
      if (putCompleteResult.isError) {
        console.log("初回ログイン完了エラー", putCompleteResult);
        this.erroLogin();
        return;
      }

      // ユーザー情報取得
      const postUserResult = await this.$repositories("user").postUser();
      if (postUserResult.isError) {
        console.log(err);
        console.log("/v1/users/my：エラー");
        this.erroLogin();
        return;
      }
      this.finishLogin(postUserResult.data);
    },
    // ログイン関係でエラーが発生した場合の共通処理
    erroLogin() {
      // 戻り先用のクッキー削除
      document.cookie = createSetCookie("back_uri", "", new Date(0));
      this.$loading.finishProcessing();
      // エラー画面へ遷移
      this.$router.push("error");
    },
    // ログインが完了した場合の共通処理
    async finishLogin(data) {
      // 戻り先用のクッキー削除
      document.cookie = createSetCookie("back_uri", "", new Date(0));
      // this.$auth.init("", "", data, this.subscriptions);
      this.$auth.init(data, this.subscriptions);

      // 利用可能補助金の取得
      let params = {};
      const subsidy = await this.$repositories(
        "subsidy"
      ).getSubsidyAvailableLogin(params);
      this.$store.commit("subsidy/setSubsidy", subsidy.data);
      this.$store.commit("subsidy/remove");
      this.$store.dispatch("subsidy/getSubsidy");
      this.$loading.finishProcessing();
      const backUri = this.backUri ? this.backUri : "/";
      console.log("finishLogin backUri", backUri);
      location.href = backUri;
      // this.$router.push({
      //   path: backUri
      // });
    },
    hide() {
      // 戻り先用のクッキー削除
      document.cookie = createSetCookie("back_uri", "", new Date(0));
      this.deleteUserCookie();
      this.$auth.remove();
      this.$loading.finishProcessing();
      const backUri = this.backUri ? this.backUri : "/";
      location.href = backUri;
      // this.$router.push({
      //   path: backUri
      // });
      console.log("hide: backUri >>> ", backUri);
    },
    // ログイン関連のcookieを全部消す。失敗した時用。
    /**
     * 通常のaxiosアクセスをラップ
     * ※非同期をpromise型で返却するよう処理
     */
    async axiosPostWrap(url, params, credentials) {
      return await (() =>
        new Promise((resolve) => {
          this.$axios
            .post(url, params, {
              headers: {
                Authorization: `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then((res) => {
              // this.$axios.get(url).then((res) => {
              resolve(res);
            })
            .catch((error) => {
              resolve({
                ...error,
                isError: true
              });
            });
        }))();
    },
    deleteUserCookie(){
      document.cookie = createSetCookie('userInfo', '', new Date(0))
      document.cookie = createSetCookie("bsBenefitOneInc", "", new Date(0));
      document.cookie = createSetCookie("BSJSESSIONID", "", new Date(0));
    }
  }
};
</script>
