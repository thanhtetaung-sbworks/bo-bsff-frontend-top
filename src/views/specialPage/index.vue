<template>
  <div class="p-specialPage">
    <div class="p-specialPage__inner">
      <div class="cms__specialPageColumn cms__specialPageColumn--2col">
        <CMS
            contents_type="special_page"
            view_type="column"
            page_limit="20"
            view_area="list"
        />
      </div>
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
</template>

<script>
export default {
  components: {
  },
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    /**
     * パンくずリスト作成
     */
    setBreadcrumb() {
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("特集一覧"));
    }
  },
  async mounted() {
    this.$meta.setDocumentTitle("特集一覧");
    this.setBreadcrumb();
    this.$page.isPageHeader = true;
  },
  watch: {
    $route() {
      this.$meta.setDocumentTitle("特集一覧");
      this.setBreadcrumb();
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped></style>
