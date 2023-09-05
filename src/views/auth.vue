<template>
  <main class="l-main">
    <h1>認証ファサード (ダミー)</h1>
    <form class="login" @submit.prevent="submit">
      <input v-model="id" type="text" placeholder="IDを入力">
      <input v-model="password" type="password" placeholder="パスワードを入力">
      <button type="submit">ログイン</button>
    </form>
  </main>
</template>

<script>

export default {
  data() {
    return {
      id: undefined,
      password: undefined
    }
  },
  computed: {
    payload() {
      return {
        id: this.id,
        password: this.password
      }
    }
  },
  methods: {
    async submit() {
      try {
        const user = await this.$repositories('user').postUser();
        this.$auth.init(user.data);

        // 利用可能補助金の取得
        this.$store.commit("subsidy/remove");
        this.$store.dispatch("subsidy/getSubsidy");

        this.$router.push("/mypage");
      } catch (e) {
        console.error(e)
      } finally {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  min-height: 75vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.login {
  width: 320px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  > * {
    width: 100%;
    display: block;
    margin: .5em;
    padding: .5em;
  }
}
</style>
