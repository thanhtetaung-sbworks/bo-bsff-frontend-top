<template>
  <div class="p-information">
    <div class="p-information__main">
      <div class="p-information__inner">
        <div
          class="p-information__paginator p-information__paginator--separate p-information__paginator_sp-none"
        >
          <div class="p-information__back__button p-information__button__none">
            <TextButton
              position="left"
              size="sm"
              color="$Red"
              to="/information"
              :class="{
                'p-information__button__disabled':
                  isDisabledPrev || isDisabledBtn
              }"
              class="p-information-detail__toHome"
              @click.native="decrementPage"
            >
              前へ
              <Icon name="arrow_left" :color="$colors.brand.red" />
            </TextButton>
          </div>
          <div class="p-information__next__button p-information__button__none">
            <TextButton
              position="right"
              size="sm"
              color="$Red"
              to="/information"
              :class="{
                'p-information__button__disabled':
                  isDisabledNext || isDisabledBtn
              }"
              class="p-information-detail__toHome"
              @click.native="incrementPage"
            >
              次へ
              <Icon name="arrow_right" :color="$colors.brand.red" />
            </TextButton>
          </div>
        </div>

        <LoadingContent v-if="isLoading" />
        <div v-if="!isLoading">
          <CMS
              contents_type="news"
              view_type="NewsList"
              :item_list="infoList"
          />
        </div>

        <div
          class="p-information__paginator p-information__paginator_sp-padding"
        >
          <div class="p-information__back__button">
            <TextButton
              position="left"
              size="sm"
              color="$Red"
              to="/information"
              :class="{
                'p-information__button__disabled':
                  isDisabledPrev || isDisabledBtn
              }"
              class="p-information-detail__toHome"
              @click.native="decrementPage"
            >
              前へ
              <Icon name="arrow_left" :color="$colors.brand.red" />
            </TextButton>
          </div>
          <div class="p-information__next__button">
            <TextButton
              position="right"
              size="sm"
              color="$Red"
              to="/information"
              :class="{
                'p-information__button__disabled':
                  isDisabledNext || isDisabledBtn
              }"
              class="p-information-detail__toHome"
              @click.native="incrementPage"
            >
              次へ
              <Icon name="arrow_right" :color="$colors.brand.red" />
            </TextButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      infoList: [],
      categoryWord: "",
      newsTypeId: "",
      year: "",
      controlPagination: {},
      isDisabledBtn: false,
      isLoading: false
    };
  },
  computed: {
    changeStoreCategory() {
      return (
        this.$store.state.information.categoryName ||
        this.$store.state.information.categoryYear
      );
    },
    isDisabledPrev() {
      return !this.controlPagination.prev;
    },
    isDisabledNext() {
      return !this.controlPagination.next;
    }
  },
  methods: {
    async getList() {
      this.isLoading = true;
      this.infoList = [];
      let params = {
        newsTypeId: this.newsTypeId,
        year: this.year,
        currentPage: this.currentPage,
        subscriptionId: await this.$store.getters['preview/getSubscriptionId'],
        courseId: await this.$store.getters['preview/getCourseId'],
        courseParentId: await this.$store.getters['preview/getCourseParentId'],
        previewDate: await this.$store.getters['preview/getPreviewDate'],
      };
      const res = await this.$repositories("cms").getNews({ params: params });
      if(res.isError){
        return this.isLoading = false;
      } else {
        this.dataMaker(res);
        this.controlPagination = res.data.links;
      }
    },
    dataMaker(obj) {
      const lists = obj.data.data;
      const newsTypeNames = obj.data.included;
      if (lists != null) {
        lists.forEach((item) => {
          const newsTypeName = newsTypeNames.find(
              (el) => el.id === item.relationships.news_type.data.id
          );
          this.infoList.push({
            pub_date: item.attributes.pub_date,
            news_type_name: newsTypeName.attributes.name,
            display_title: item.attributes.display_title,
            id: item.id
          });
        });
        this.isLoading = false;
      }
      else  {
        this.isLoading = false;
      }
    },
    incrementPage() {
      this.isDisabledBtn = true;
      this.currentPage++;
      this.getList().then(() => {
        this.isDisabledBtn = false;
      });
    },
    decrementPage() {
      this.isDisabledBtn = true;
      this.currentPage--;
      this.getList().then(() => {
        this.isDisabledBtn = false;
      });
    },
    saveCurrentPageToStore(currentPage) {
      this.$store.commit("information/currentPage", currentPage);
    },
    setCategoryInfo() {
      if (this.$store.state.information.categoryYear) {
        // ストアにページ情報があるときはそれを利用
        this.year = this.$store.state.information.categoryYear;
      } else {
        this.year = "";
      }
      if (this.$store.state.information.categoryName) {
        // ストアにページ情報があるときはそれを利用
        this.newsTypeId = this.$store.state.information.categoryName;
      } else {
        this.newsTypeId = "";
      }
    },
    /**
     * パンくずリスト作成
     */
    setBreadcrumb() {
      this.$page.setBreadcrumb(this.$page.formatBreadcrumb("お知らせ"));
    }
  },
  async mounted() {
    this.$meta.setDocumentTitle("お知らせ一覧");
    this.setBreadcrumb();
    this.$page.isPageHeader = true;
    if (this.$store.state.information.currentPage) {
      // ストアにページ情報があるときはそれを利用
      this.currentPage = this.$store.state.information.currentPage;
    } else {
      this.currentPage = 1;
    }
    this.setCategoryInfo();

    await this.getList();
  },
  watch: {
    $route() {
      this.$meta.setDocumentTitle("お知らせ一覧");
      this.setBreadcrumb();
      this.setCategoryInfo();
      this.getList();
    },
    changeStoreCategory() {
      this.currentPage = 1;
      this.setCategoryInfo();
      this.getList();
    },
    currentPage() {
      this.saveCurrentPageToStore(this.currentPage);
    }
  }
};
</script>

<style lang="scss" scoped></style>
