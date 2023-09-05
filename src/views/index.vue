<template>
  <main class="l-main">
    <div class="p-toppage l-main__content">
      <div class="p-toppage__bg" />
      <div class="p-toppage__inner">
        <div
          v-if="importantNews.length"
          class="p-toppage__important-notice"
          :class="{ 'p-toppage__important-notice-login': $auth.loggedIn }"
        >
          <div class="p-toppage__important-notice__wrap">
            <CMS
                contents_type="news"
                view_type="TopNewsImportant"
                :item_list="importantNews"
            />
          </div>
        </div>

        <CmsHeaderSearch :currentId="currentId" :switchTab="switchTab" :boCode="boCode" />

        <section>
          <template v-if="currentId === 0">
            <!-- 特大バナー -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP_dekabanner"
                @sendComplete="catchComplete"
            />

            <CMS
                contents_type="special_page"
                view_type="carousel"
                page_limit="15"
                view_area="top"
            />

            <!-- リステットコースエリア01 〜 リステットコースエリア03 -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP_LC01"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP_LC02"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP_LC03"
            />

            <!-- 企業専用エリア（営業）01　〜 企業専用エリア（営業）05 -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-01"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-02"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-03"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-04"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-05"
            />

            <!-- 企業専用エリア（PM）01 〜 企業専用エリア（PM）05 -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-PM01"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-PM02"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-PM03"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-PM04"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_001-TOP-PM05"
            />

            <!-- 仕事に役立つメニュー -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_002-TOP_menu"
            />
            <!-- 仕事に役立つメニューもっと見るボタン -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_003-TOP_menu_more"
            />

            <!-- おすすめメニュー -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_004-TOP_menu2"
            />
            <!-- おすすめメニューもっと見るボタン -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_005-TOP_menu2_more"
            />

            <!-- アクセスランキング（中身） -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_006-TOP_ranking"
            />

            <!-- 制度バナー -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_007-TOP_seido"
            />
            <!-- 制度バナーもっと見るボタン -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_008-TOP_seido_more"
            />
          </template>
        </section>

        <section>
          <template v-if="currentId === 1">
            <!-- 宿泊01 〜 宿泊16 -->
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_001"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_002"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_003"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_004"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_005"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_006"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_007"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_008"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_009"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_010"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_011"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_012"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_013"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_014"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_015"
            />
            <CMS
                contents_type="block_contents"
                location_code="BS_STAY_TOP_01_016"
            />
          </template>
        </section>

        <template v-if="currentId === 0">
          <!-- デジタルカタログ -->
          <CMS
              contents_type="block_contents"
              location_code="BS_TOP_01_009-TOP_digicat"
          />
          <!-- FOCUSバナー -->
          <CMS
              contents_type="block_contents"
              location_code="BS_TOP_01_010-TOP_focus"
          />

          <section class="p-toppage__info">
            <div class="p-toppage__info__wrap">
              <div v-if="normalNews.length">
                <h2 class="c-title">お知らせ</h2>
                <div class="c-card">
                  <div class="c-card__content">
                    <div class="c-card__inner">
                      <template v-if="isLoading.newsTop">
                        <LoadingContent />
                      </template>
                      <template v-else-if="this.normalNews != null">
                        <CMS
                            contents_type="news"
                            view_type="TopNewsNormal"
                            :item_list="normalNews"
                        />
                      </template>
                      <template v-else>
                        お知らせを取得できませんでした
                      </template>
                    </div>
                  </div>
                </div>
                <!-- /.c-card -->
                <div class="p-toppage__info__detail">
                  <TextButton to="/information" position="right"
                    >お知らせ一覧を見る<Icon
                      name="arrow_right"
                      :color="$colors.brand.red"
                    />
                  </TextButton>
                </div>
              </div>
            </div>
          </section>

          <section class="p-toppage__banner">
            <!-- バナー告知エリア -->
            <CMS
                contents_type="block_contents"
                location_code="BS_TOP_01_011-TOP_banner"
            />
          </section>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
import chatbot from '../plugins/chatbot';
export default {
  components: {},
  props: {
    boCode: {
      type: String
    },
  },
  data() {
    return {
      cmsDataList: [],
      isUserInfoMenus: false,
      isLoading: {
        newsTop: true
      },
      // ダミーのデータ（後でmockを作成すること！） ここから
      currentId: 0,
      cartsNumber: "3",
      categoryList: [],
      categories: [
        { id: 0, icon: "top_all" },
        { id: 1, icon: "top_gourmet" },
        { id: 2, icon: "top_entertainment" },
        { id: 3, icon: "top_study" },
        { id: 4, icon: "top_care" },
        { id: 5, icon: "top_other" }
      ],
      snsGroup: [
        {
          id: 1,
          image: "/logo_twitter01.png",
          alt: "Twitter",
          linkpath: "top/sns_twitter",
          text: "人気公演のチケット情報等をタイムリーにお届け"
        },
        {
          id: 2,
          image: "/logo_facebook01.png",
          alt: "Facebook",
          linkpath: "top/sns_facebook",
          text: "無料セミナー情報など、社会人に嬉しい情報をご紹介"
        },
        {
          id: 3,
          image: "/logo_instagram01.png",
          alt: "Instagram",
          linkpath: "top/sns_instagram",
          text: "社会人に役立つライフハック術を配信中"
        },
        {
          id: 4,
          image: "/logo_tiktok01.png",
          alt: "Tiktok",
          linkpath: "top/sns_tiktok",
          text: "お得な情報やサービスなどをショート動画でご紹介"
        },
        {
          id: 5,
          image: "/logo_youtube01.png",
          alt: "YouTube",
          linkpath: "top/sns_youtube",
          text: "キャンペーンや利用方法などを動画でご案内"
        }
      ],
      information: [
        {
          id: 1,
          date: "2021年04月21日",
          subtitle: "サービスについて",
          title: "システムメンテナンスに伴うサービス停止のご案内",
          href: ""
        },
        {
          id: 2,
          date: "2021年04月14日",
          subtitle: "サービスについて",
          title: "掲載店舗の営業時間について",
          href: ""
        },
        {
          id: 3,
          date: "2021年04月07日",
          subtitle: "サービスについて",
          title:
            "Famiポートシステムメンテナンスに伴うシステムサービス停止のお知らせ",
          href: ""
        }
      ],
      // ダミーのデータ（後でmockを作成すること！） ここまで
      newsResponse: [],
      importantNews: [],
      normalNews: [],
      newsType: [],

      // 会員IDに表示するメールアドレス
      memberIdEmail: "",
      // プレビューモードフラグ
      previewMode : false,
    };
  },

  computed: {
    domainMypage() {
      return process.env.VUE_APP_MYPAGE_DOMAIN;
    },
    userData() {
      if (!this.$auth || !this.$auth.user) return "";
      return this.$auth.user;
    },
    userName() {
      if (!this.userData) {
        return "";
      } else if (this.userData.familyName && this.userData.firstName) {
        return this.userData.familyName + " " + this.userData.firstName;
      } else {
        return this.userData.familyName || this.userData.firstName;
      }
    },
    isLogin() {
      if (this.$auth.loggedIn) return true;
      return false;
    }
  },
  async mounted() {
    this.$meta.setDocumentTitle("");
    console.log("現在の開発モード", process.env.VUE_APP_DEV_MODE);

    // プレビューモード判定
    const isPreviewMode =
      this.$route.query.subscriptionId &&
      this.$route.query.courseId &&
      this.$route.query.courseParentId &&
      this.$route.query.previewDate &&
      this.$route.query.key &&
      this.$route.query.key === process.env.VUE_APP_PREVIEW_KEY;

    if (isPreviewMode) {
    const { subscriptionId, courseId, courseParentId, previewDate } = this.$route.query;
      this.$store.commit("preview/isSubscriptionId", subscriptionId);
      this.$store.commit("preview/isCourseId", courseId);
      this.$store.commit("preview/isCourseParentId", courseParentId);
      this.$store.commit("preview/isPreviewDate", previewDate);
      this.$store.commit("preview/isPreviewMode", true);

      // すでにログイン状態であれば削除
      if (document.cookie.includes("BSJSESSIONID")) {
        this.$auth.remove(isPreviewMode);
        this.$nextTick(() => {
          this.$router.push("/");
      });
      }
    }

    this.isLoading.newsTop = true;
    this.$page.isTitle = false;
    this.$page.isPageHeader = false;
    !this.isLogin && chatbot()
    await this.setCategory();
 
    // TOP重要なお知らせを取得
    let importantNews = await this.$repositories("cms").getNews({
      params: {
        important_news: 1,
        limit: 3,
        subscriptionId: await this.$store.getters['preview/getSubscriptionId'],
        courseId: await this.$store.getters['preview/getCourseId'],
        courseParentId: await this.$store.getters['preview/getCourseParentId'],
        previewDate: await this.$store.getters['preview/getPreviewDate']
      }
    });
    this.importantNews =  this.newsMaker(importantNews);

    // TOP通常お知らせを最大5件取得
    let normalNews = await this.$repositories("cms").getNews({
      params: {
        limit: 3,
        subscriptionId: await this.$store.getters['preview/getSubscriptionId'],
        courseId: await this.$store.getters['preview/getCourseId'],
        courseParentId: await this.$store.getters['preview/getCourseParentId'],
        previewDate: await this.$store.getters['preview/getPreviewDate']
      }
    });
    this.normalNews = this.newsMaker(normalNews);
    this.isLoading.newsTop = false;

    // 会員IDに表示するメールアドレスを取得する
    let userRes = await this.$repositories("user").postUser();
    if (userRes && userRes.data && userRes.data.email) {
      this.memberIdEmail = userRes.data.email;
    }
  },
  methods: {
    switchTab(id) {
      this.currentId = id;
    },
    newsMaker(obj) {
      const lists = obj.data.data;
      const newsTypeNames = obj.data.included;
      let infoList = [];
      if (lists != null) {
        lists.forEach((item) => {
          const newsTypeName = newsTypeNames.find(
              (el) => el.id === item.relationships.news_type.data.id
          );
          infoList.push({
            pub_date: item.attributes.pub_date,
            news_name: newsTypeName.attributes.name,
            display_title: item.attributes.display_title,
            id: item.id
          });
        });
        return infoList;
      }
      else  {
        return infoList;
      }
    },

    async setCategory() {
      this.categoryList = [];
      // ログイン済み時はAPIからメニューを取得する
      // 2022-01-09: Remove below comments after coding v1/search
      //   if (this.isLogin) {
      //     const res = await this.$repositories("search").getSearchInit();
      //     if (res) {
      //       const filterList = res.data.moreLargeCategoryList.filter((x) => {
      //         return this.categories.some((c) => c.id == x.id);
      //       });
      //       this.categoryList = filterList.map((x) => {
      //         const target = this.categories.filter((y) => y.id == x.id);
      //         return {
      //           ...target[0],
      //           ...x
      //         };
      //       });
      //       this.categoryList.unshift({
      //         id: 0,
      //         name: "すべて",
      //         icon: "top_all"
      //       });
      //     }
      //   }
      if (this.categoryList.length == 0) {
        // 未ログイン時は静的なメニューを設定する
        const res = [
          { id: 0, name: "ライフサービス" },
          { id: 1, name: "旅行宿泊" }
          // { id: 2, name: "グルメ" }
        ];
        const filterList = res.filter((x) => {
          return this.categories.some((c) => c.id == x.id);
        });
        this.categoryList = filterList.map((x) => {
          const target = this.categories.filter((y) => y.id == x.id);
          return {
            ...target[0],
            ...x
          };
        });
      }
    },
    convertCategoryToString(num) {
      let category_name;
      switch (num) {
        case 0:
          category_name = "";
          break;
        case 1:
          category_name = "gourmet";
          break;
        case 2:
          category_name = "leisure";
          break;
        case 3:
          category_name = "skillup";
          break;
        case 4:
          category_name = "care";
          break;
        case 5:
          category_name = "others";
          break;
        default:
          category_name = "";
      }
      return category_name;
    },
    //================================
    // SP用メニュー表示切替処理
    //================================
    openMobileMenu() {
      if (window.innerWidth > this.$config.responsiveWidth) return false;
      this.isUserInfoMenus = true;
    },

    catchComplete(code) {
      // console.log("block_contents complete", code);
    },
  },
  watch: {
    isLogin() {
      this.setCategory();
    },
    $route() {
      this.$meta.setDocumentTitle("");
      this.$page.isTitle = false;
      this.$page.isPageHeader = false;
    }
  }
};
</script>

<style scoped>
.l-main {
  margin-top: 0;
}
.cookieTest {
  padding: 4px;
  cursor: pointer;
}
</style>
