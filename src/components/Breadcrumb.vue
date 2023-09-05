<template>
  <nav v-if="isShow && breadcrumbs.length > 1">
    <ol class="c-breadcrumb">
      <li class="c-breadcrumb__item" v-for="(item, i) in breadcrumbs" :key="i">
        <template v-if="item.path != ''">
          <a :href="item.path" class="c-breadcrumb__item__link">
            <Icon class="c-breadcrumb__item__icon" name="arrow_right" />
            {{ item.name }}
          </a>
        </template>
        <template v-else>
          <span class="c-breadcrumb__item__link">
            <Icon class="c-breadcrumb__item__icon" name="arrow_right" />
            {{ item.name }}
          </span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      breadcrumbDefault: [{ name: "トップ", path: process.env.VUE_APP_TOP_DOMAIN }] // default
    };
  },
  computed: {
    breadcrumbs() {
      return this.breadcrumbDefault.concat(
        this.$page.routes.filter((x) => x.name)
      );
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
