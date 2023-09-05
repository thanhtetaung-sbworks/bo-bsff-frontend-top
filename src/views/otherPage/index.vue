<template>
  <main class="l-main l-main--has-side">
    <div class="p-specialPage">
      <div class="p-specialPage__main">
        <div class="p-specialPage__inner">
          <CMS
            contents_type="other_page"
            view_type="detail"
            @catchTitle="setTitle"
          />
        </div>

        <div class="p-information-detail__button">
          <TextButton
              position="left"
              size="sm"
              :color="$colors.brand.red"
              class="p-information-detail__toHome"
              :to="{name: 'Top'}"
          >
            Topに戻る
            <Icon name="arrow_left" :color="$colors.brand.red" />
          </TextButton>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  computed: {
  },
  methods: {
    setTitle(obj) {
      this.title = obj;
      this.$meta.setDocumentTitle(this.title);
    },

    /**
     * パンくずリスト作成
     */
    // setBreadcrumb() {
    //   this.$page.setBreadcrumb(
    //       this.$page.formatBreadcrumb(this.title)
    //   );
    // },
    //
    /**
     * 一つ前のページへ戻る
     */
    backPage(path) {
      // 実行中のAPIは中止する
      // this.request.cancel();
      // this.$router.push(path);
    }
  },
  async mounted() {
    // this.$loading.startProcessing();
    // await this.getList();
    // this.$meta.setDocumentTitle(this.title);
    // this.$page.isPageHeader = true;
    this.$page.isTitle = false;
  },
  watch: {
    $route() {
      // this.$meta.setDocumentTitle(this.title);
    },
  },
};
</script>

<style lang="scss" scoped>
.p-specialPage {
  width: 100%;
}
</style>
