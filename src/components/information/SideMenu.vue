<template>
  <nav class="c-side-info">
    <div class="c-side-info__wrap">
      <div class="c-side-info__lists">
        <CMS
          contents_type="news"
          view_type="newsMenu"
        />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    // ページを離れるときにストアのページ情報を削除
    resetCurrentPageInStore() {
      this.$store.commit("information/currentPage", 1);
    },
  },
  beforeDestroy() {
    this.saveCategoryToStore("", "all");
    this.resetCurrentPageInStore();
  },
};
</script>
