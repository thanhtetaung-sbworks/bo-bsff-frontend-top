<template>
  <div class="p-information-detail">
    <div class="p-information-detail__inner">
      <header class="title">
        <h1>お知らせ詳細</h1>
        <div class="divider divider-title" />
        <div class="back">
          <Icon class="arrow_left" name="arrow_left" />
          <a class="text-black" @click="backPage('/information')">
            お知らせ一覧 に戻る
          </a>
        </div>
      </header>

      <div class="p-information-detail__detail">
        <CMS
            contents_type="news"
            view_type="detail"
            @catchTitle="setTitle"
        />
      </div>

      <div class="back_btn">
        <button
          class="back_btn__c-btn btn-grey"
          @click="backPage('/information')"
        >
          <span>お知らせ一覧に戻る</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsItem: {},
      title: "",
    };
  },
  computed: {},
  methods: {
    setTitle(obj) {
      this.title = obj;
      this.$meta.setDocumentTitle(this.title);
    },

    /**
     * パンくずリスト作成
     */
    setBreadcrumb() {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("お知らせ", "/information")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb(this.title)
      );
    },

    /**
     * 一つ前のページへ戻る
     */
    backPage(path) {
      // 実行中のAPIは中止する
      this.$router.push(path);
    },
  },
  async mounted() {
    this.$loading.startProcessing();
  },
  watch: {
    $route() {
      this.setBreadcrumb();
    }
  }
};
</script>

<style lang="scss" scoped></style>
