<template>
  <div v-if="isShow" class="p-user-menus">
    <div class="p-user-menus__overlay" @click.stop="$emit('hide')"></div>
    <div class="p-user-menus__inner">
      <ul class="p-user-menus__list">
        <li class="p-user-menus__head">
          会員ID：{{ userData.ssoCustomerNo }}<br>
          店頭番号：{{ userData.ssoMembrNo }}
        </li>
        <li class="p-user-menus__item">
          <a
            :href="domainMypage + '/mypage'"
            class="p-user-menus__item__link"
          >
            <span>マイページ</span>
            <div class="p-user-menus__arrow p-user-menus__arrow--right"></div>
          </a>
        </li>
        <li class="p-user-menus__item">
          <a
            :href="domainMypage + '/mypage/orders'"
            class="p-user-menus__item__link"
          >
            <span>申込履歴</span>
            <div class="p-user-menus__arrow p-user-menus__arrow--right"></div>
          </a>
        </li>
        <li class="p-user-menus__item">
          <a
            :href="domainMypage + '/mypage/visits'"
            class="p-user-menus__item__link"
          >
            <span>閲覧履歴</span>
            <div class="p-user-menus__arrow p-user-menus__arrow--right"></div>
          </a>
        </li>
        <li class="p-user-menus__item">
          <a
            class="p-user-menus__item__link"
            :href="domainMypage + '/mypage/setting'"
          >
            <span>会員設定</span>
            <div class="p-user-menus__arrow p-user-menus__arrow--right"></div>
          </a>
        </li>
        <li class="p-user-menus__item">
          <router-link
            to="/"
            class="p-user-menus__item__link"
            @click.native="$auth.remove"
          >
            <span>ログアウト</span>
            <div class="p-user-menus__arrow p-user-menus__arrow--right"></div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    domainMypage() {
      return process.env.VUE_APP_MYPAGE_DOMAIN;
    },
    userData() {
      if (!this.$auth || !this.$auth.user) return {};
      return this.$auth.user;
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
