<template>
  <div class="mb-10">
    <TopNav
    @click-life="switchTab(0)"
    @click-eat="switchTab(1)"
    @click-shop="switchTab(2)"
    @click-shopping="clickLinkShopSSO()"
    :activeId="currentId" />

    <div class="panel-section" v-if="currentId === 0">

      <div class="inner-box" :class="[{'life-panel': currentId === 0, 'life-inner-box': form.lifeIsActive === 1, 'eat-inner-box': form.lifeIsActive === 2}]">

        <LifeServiceNav
          @click-live-play="lifeNavChange(1)"
          @click-eat="lifeNavChange(2)"
          :activeId="form.lifeIsActive"
          />

          <div v-if="form.lifeIsActive === 1" class="category-fields-wrapper flex-row sm:flex-column flex">
              <div class="c-select large-category-select">
                <SelectBox first-option="すべてのジャンル" :options="largeCategoryListSelectBoxData" v-model="form.catLrgClassCd" @changed="onChangeLargeCat($event)" />
              </div>
              <div class="c-select medium-category-select">
                <SelectBox first-option="さらに絞り込む" :options="middleCategoryListSelectBoxData" v-model="form.catMidClassCd" @changed="onChangeMidCat($event)" :disabled="form.catLrgClassCd === '' || !middleCategoryList" />
              </div>
              <div class="c-select small-category-select">
                <SelectBox first-option="さらに絞り込む" wrapper-class="opacity-100" :options="smallCategoryListSelectBoxData" v-model="form.catSmlClassCd" @changed="onChangeSmallCat($event)" :disabled="form.catMidClassCd === '' || !smallCategoryList" />
              </div>
          </div>

          <div v-if="form.lifeIsActive === 2" class="category-fields-wrapper flex-row">

            <div class="c-select">
              <SelectBox first-option="都道府県" :options="areaMidClassesSelectBoxData" v-model="form.areaMidClassCd" @changed="onChangeMidArea($event)" :disabled="areaMidClasses.length === 0" />
            </div>
            <div class="c-select">
              <SelectBox first-option="市区町村" wrapper-class="opacity-100" :options="areaSmlClassesSelectBoxData" v-model="form.areaSmlClassCd" @changed="onChangeSmlArea($event)" :disabled="form.areaMidClassCd === '' || areaSmlClasses.length === 0" />
            </div>
            <div class="c-select">
              <SelectBox first-option="エリア" wrapper-class="opacity-100" :options="areaDtlClassesSelectBoxData" v-model="form.areaDtlClassCd" @changed="onChangeDtlArea($event)" :disabled="form.areaMidClassCd === '' || areaDtlClasses.length === 0" />
            </div>

            </div>

            <div v-if="form.lifeIsActive === 2" class="category-fields-wrapper genre-wrapper" :class="{'no-genre': lifeGenreTags.length === 0}">

                <div class="c-select w-30">
                  <select
                    class="c-select__control opacity-100 content_select text-pc-base text-sp-base"
                    @change="lifeGenreChanged"
                    :disabled="!categoryList"
                    v-model="lifeGenre"
                  >
                    <option selected value="" class="default" disabled>
                      ジャンル
                    </option>
                    <option
                      v-for="(cat, i) in categoryList"
                      :key="`large-${i}`"
                      :value="
                        cat.catClassCd + ',' + cat.name + ',' + cat.level
                      "
                    >
                      {{ cat.name }}
                    </option>
                  </select>
                </div>

              <div class="genreTagsList">
                <div
                  v-for="(item, index) in lifeGenreTags"
                  class="genreTag"
                  v-bind:key="index"
                >
                <span class="text">{{ item.name }}</span>
                    <button class="delete-btn" v-on:click="deleteLifeGenreTags(index)">×</button>
                </div>
              </div>
              
                  

            </div>          

            <FormsKeywordSearch
              :placeholder="
                form.lifeIsActive === 1
                  ? '施設名、メニューNo、都道府県など'
                  : '店名、メニューNo、キーワードなど'
              "
              @input="input"
              @onSearch="onSearch()"
              :background="true"
              :error="form.keywordError != ''"
            />          
            <div
              v-if="form.keywordError"
              class="p-toppage__search__main__input--error"
            >
              <span>
                <Icon name="alert" color="#CC0621" />
              </span>
              {{ form.keywordError }}
            </div>


      </div>

      <a href="/map" class="map-link">
        <Icon name="solid_map" width="18" height="18" />
        <span class="text">地図・エリアから検索</span>
        <Icon name="right_angle" width="20" height="40" />
      </a>      

    </div>
    
    <StaySearch v-if="currentId === 1"/>

    <template v-if="currentId === 2">
      <ShopBeneOnlineShop class="panel-section" :boCode="boCode" />
    </template>
    
  </div>
</template>
<script>
import { isMobile } from "@/utils/userAgent";
import uniqBy from "lodash/uniqBy";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";

import ShopBeneOnlineShop from "@/components/shop/BeneOnlineShop.vue";
import TopNav from './sections/TopNav/index.vue';
import LifeServiceNav from './sections/LifeServiceNav/index.vue';
import LivePlayPanel from './sections/LivePlayPanel/index.vue';
import LargeCategoryButtonList from './elements/LargeCategoryButtonList.vue';
import SelectBox from "../SelectBox.vue";

export default {
  components: {
    ShopBeneOnlineShop,
    TopNav,
    LifeServiceNav,
    LivePlayPanel,
    LargeCategoryButtonList,
    SelectBox
  },
  props: {
    boCode: {
      type: String,
    },
    currentId: {
      type: Number,
      default: 0,
    },
    switchTab: {
      type: Function,
    },
  },
  data() {
    return {
      lifeGenre: '',
      lifeGenreTags: [],
      categories: [],
      areaMidClasses: [],
      areaSmlClasses: [],
      areaDtlClasses: [],
      form: {
        lifeIsActive: 1,
        keyword: "",
        keywordError: "",
        areaLrgClassCd: "",
        areaMidClassCd: "",
        areaSmlClassCd: "",
        areaDtlClassCd: "",
        catLrgClassCd: "",
        catMidClassCd: "",
        catSmlClassCd: "",
      },
      // ダミーのデータ（後でmockを作成すること！） ここから
      uses: [
        { id: 1, label: "給与天引きで支払可", value: 0 },
        { id: 2, label: "会員証・クーポン提示利用可", value: 0 },
        { id: 3, label: "ベネポが使えるプラン", value: 0 },
        { id: 4, label: "ベネポが貯まるプラン", value: 0 },
      ],
    };
  },
  async mounted() {
    this.$page.isTitle = false;
    this.$page.isPageHeader = false;
    this.switchTab(this.currentId);
    this.getMidCodesArea();
    const res = await this.$repositories("search").getLargeCategories();
    if (res) {
      this.categories = res.data.categories || [];
    }
  },
  computed: {
    largeCategoryList() {
      if (this.categories.length) {
        const listFilter = filter(
          this.categories,
          (item) =>
            item.level === 1 &&
            ((+item.catClassCd >= 102 && +item.catClassCd <= 114) ||
              (+item.catClassCd >= 116 && +item.catClassCd <= 119))
        );
        return uniqBy(listFilter, "catClassCd");
      }
    },
    largeCategoryListSelectBoxData() {
      const collection = this.largeCategoryList?.map(obj => {
        return {
          id: obj.catClassCd,
          label: obj.name
        };
      });
      return collection && collection.length ? collection : [];
    },
    middleCategoryList() {
      if (this.categories.length) {
        const listFilter = filter(this.categories, (item) => {
          if (
            item.level === 2 &&
            item.catLrgClassCd === this.form.catLrgClassCd
          ) {
            if (
              (item.catLrgClassCd === "011" || item.catLrgClassCd === "113") &&
              item.name !== "飲食店"
            ) {
              return item;
            }
            if (item.catLrgClassCd === "119" && item.name !== "お問合せ") {
              return item;
            }
            if (
              item.catLrgClassCd !== "119" &&
              item.catLrgClassCd !== "113" &&
              item.catLrgClassCd !== "011"
            ) {
              return item;
            }
          }
        });
        return uniqBy(listFilter, "catClassCd");
      }
    },
    middleCategoryListSelectBoxData() {
      const collection = this.middleCategoryList?.map(obj => {
        return {
          id: obj.catClassCd,
          label: obj.name
        };
      });
      return collection && collection.length ? collection : [];
    },
    smallCategoryList() {
      if (this.categories.length) {
        const listFilter = filter(
          this.categories,
          (item) =>
            item.level === 3 &&
            item.catLrgClassCd === this.form.catLrgClassCd &&
            item.catMidClassCd === this.form.catMidClassCd
        );
        return uniqBy(listFilter, "catClassCd");
      }
    },
    smallCategoryListSelectBoxData() {
      const collection = this.smallCategoryList?.map(obj => {
        return {
          id: obj.catClassCd,
          label: obj.name
        };
      });
      return collection && collection.length ? collection : [];
    },
    categoryList() {
      if (this.categories.length) {
        const listFilter = filter(this.categories, (item) => {
          if (
            !this.lifeGenreTags.find((o) => o.catClassCd === item.catClassCd)
          ) {
            if (
              item.level === 3 &&
              item.catLrgClassCd === "113" &&
              item.catMidClassCd === "201"
            ) {
              return item;
            }
          }
        });
        return uniqBy(listFilter, "catClassCd");
      }
    },
    categoryListSelectBoxData() {
      const collection = this.categoryList?.map(obj => {
        return {
          id: obj.catClassCd + ',' + obj.name + ',' + obj.level,
          label: obj.name
        };
      });
      return collection && collection.length ? collection : [];
    },
    linkShopSSO(){
      return process.env.VUE_APP_SHOP_URL_SSO;
    },
    areaMidClassesSelectBoxData() {
      const collection = this.areaMidClasses?.map(obj => {
        return {
          id: obj.areaMidClassCd,
          label: obj.areaMidClassNm
        };
      });
      return collection && collection.length ? collection : [];
    },
    areaSmlClassesSelectBoxData() {
      const collection = this.areaSmlClasses?.map(obj => {
        return {
          id: obj.areaSmlClassCd,
          label: obj.areaSmlClassNm
        };
      });
      return collection && collection.length ? collection : [];
    },
    areaDtlClassesSelectBoxData() {
      const collection = this.areaDtlClasses?.map(obj => {
        return {
          id: obj.areaDtlClassCd,
          label: obj.areaDtlClassNm
        };
      });
      return collection && collection.length ? collection : [];
    }
  },
  methods: {
    clickLinkShopSSO() {
      window.open(this.linkShopSSO, 'open')
    },
    async getMidCodesArea() {
      const res = await this.$repositories("search").getLargeCodesArea();
      if (res) {
        this.areaMidClasses = res.data || [];
      }
    },
    async getSmlCodesArea(index) {
      const data = this.areaMidClasses[index - 1];
      const res = await this.$repositories("search").getCodesArea({
        areaLrgClassCd: data.areaLrgClassCd,
        areaMidClassCd: data.areaMidClassCd,
      });
      if (res) {
        this.form.areaLrgClassCd = data.areaLrgClassCd;
        this.form.areaMidClassCd = data.areaMidClassCd;
        this.areaSmlClasses =
          res?.data?.areaLrgClasses?.[0]?.areaMidClasses?.[0]?.areaSmlClasses ||
          [];
      }
    },
    async getDtlCodesArea(index) {
      const data = this.areaSmlClasses[index - 1];
      const res = await this.$repositories("search").getCodesArea({
        areaLrgClassCd: this.form.areaLrgClassCd,
        areaMidClassCd: this.form.areaMidClassCd,
        areaSmlClassCd: data.areaSmlClassCd,
      });
      if (res) {
        this.areaDtlClasses =
          res?.data?.areaLrgClasses?.[0]?.areaMidClasses?.[0]
            ?.areaSmlClasses?.[0]?.areaDtlClasses || [];
      }
    },
    lifeNavChange(num) {
      this.form.lifeIsActive = num;
      this.form.catLrgClassCd = "";
      this.form.catMidClassCd = "";
      this.form.catSmlClassCd = "";
      this.form.areaLrgClassCd = "";
      this.form.areaMidClassCd = "";
      this.form.areaSmlClassCd = "";
      this.form.areaDtlClassCd = "";
      this.form.keywordError = "";
      this.lifeGenreTags = [];
    },
    lifeGenreChanged(e) {
      const category = e.target.value.split(",");
      this.lifeGenre = '';
      if ( category.length !== 3 ) {
        return;
      }
      this.lifeGenreTags.push({
        catClassCd: category[0],
        name: category[1],
        level: category[2],
      });
    },
    deleteLifeGenreTags(index) {
      this.$delete(this.lifeGenreTags, index);
    },
    input(args) {
      this.form.keyword = args;
    },
    getQueryString(categoryId = "") {
      let list = this.uses.filter((x) => x.value == 1);
      let usageMap = {};
      if (list.length) {
        usageMap = { "useage[]": list.map((x) => x.id) };
      }
      this.$page.isPageHeader = false;
      const query = {};
      switch (this.form.lifeIsActive) {
        case 1:
          query.type = 1;
          if (this.form.catLrgClassCd) {
            query.catLrgClassCd = this.form.catLrgClassCd;
          }
          if (this.form.catMidClassCd) {
            query.catMidClassCd = this.form.catMidClassCd;
          }
          if (this.form.catSmlClassCd) {
            query.catSmlClassCd = this.form.catSmlClassCd;
          }
          break;
        case 2:
          query.type = 2;
          if (this.form.areaMidClassCd) {
            query.areaMidClassCd = this.form.areaMidClassCd;
          }
          if (this.form.areaSmlClassCd) {
            query.areaSmlClassCd = this.form.areaSmlClassCd;
          }
          if (this.form.areaDtlClassCd) {
            query.areaDtlClassCd = this.form.areaDtlClassCd;
          }
          if (this.lifeGenreTags.length) {
            const tags = this.lifeGenreTags.map((x) => x.catClassCd);
            query.lifeGenreTags = tags;
          }
          break;
        default:
          break;
      }
      if (!categoryId && !this.form.keyword) {
        return {
          ...usageMap,
          ...query,
        };
      }
      if (categoryId) {
        var category = {
          category: categoryId,
        };
      }
      if (this.form.keyword) {
        var keyword = {
          keyword: this.form.keyword,
        };
      }
      if (!this.form.keyword) {
        return {
          ...category,
          ...usageMap,
          ...query,
        };
      }
      if (!categoryId) {
        return {
          ...keyword,
          ...usageMap,
          ...query,
        };
      }
      return {
        ...category,
        ...keyword,
        ...usageMap,
        ...query,
      };
    },
    onSearch(currentId) {
      this.form.keywordError = "";
      if (this.form.lifeIsActive === 1) {
        if (
          !this.form.keyword &&
          !this.form.catLrgClassCd &&
          !this.form.catMidClassCd &&
          !this.form.catSmlClassCd
        ) {
          this.form.keywordError =
            "カテゴリを選択するかキーワードを入力してください。";
          return;
        }
      }
      if (this.form.lifeIsActive === 2) {
        if (
          !this.form.keyword &&
          !this.form.areaMidClassCd &&
          !this.form.areaSmlClassCd &&
          !this.form.areaDtlClassCd &&
          isEmpty(this.lifeGenreTags)
        ) {
          this.form.keywordError =
            "カテゴリを選択するかキーワードを入力してください。";
          return;
        }
      }
      const params = new URLSearchParams(this.getQueryString(currentId));
      const url = process.env.VUE_APP_LIFE_DOMAIN + "/menus?" + params;
      window.open(url, "_self");
    },
    onChangeMidArea(event) {
      if (event.target.value === "") {
        this.form.areaMidClassCd = "";
        this.form.areaSmlClassCd = "";
        this.form.areaDtlClassCd = "";
        this.areaSmlClasses = [];
        this.areaDtlClasses = [];
      } else if (event.target.value !== "") {
        this.form.areaMidClassCd = event.target.value;
        this.form.areaSmlClassCd = "";
        this.form.areaDtlClassCd = "";
        this.areaSmlClasses = [];
        this.areaDtlClasses = [];
        this.getSmlCodesArea(event.target.selectedIndex);
      }
    },
    onChangeSmlArea(event) {
      if (event.target.value === "") {
        this.form.areaSmlClassCd = "";
        this.form.areaDtlClassCd = "";
        this.areaDtlClasses = [];
      } else if (event.target.value !== "") {
        this.form.areaSmlClassCd = event.target.value;
        this.form.areaDtlClassCd = "";
        this.areaDtlClasses = [];
        this.getDtlCodesArea(event.target.selectedIndex);
      }
    },
    onChangeDtlArea(event) {
      this.form.areaDtlClassCd = event.target.value;
    },
    onChangeLargeCat(event) {
      if (event.target.value === "") {
        this.form.catLrgClassCd = "";
        this.form.catMidClassCd = "";
        this.form.catSmlClassCd = "";
      } else if (event.target.value !== "") {
        this.form.catSmlClassCd = "";
        this.form.catLrgClassCd = event.target.value;
        this.form.catMidClassCd = "";
      }
    },
    onChangeMidCat(event) {
      if (event.target.value === "") {
        this.form.catMidClassCd = "";
        this.form.catSmlClassCd = "";
      } else if (event.target.value !== "") {
        this.form.catMidClassCd = event.target.value;
        this.form.catSmlClassCd = "";
      }
    },
    onChangeSmallCat(event) {
      this.form.catSmlClassCd = event.target.value;
    }
  },
  watch: {
    $route() {
      this.$page.isTitle = false;
      this.$page.isPageHeader = false;
    },
  },
};
</script>
<style scoped lang="scss">
.l-main {
  margin-top: 0;
}
.cookieTest {
  padding: 4px;
  cursor: pointer;
}

select {
  color: #000;
  &:disabled {
    color: lightgray;
  }
}

.c-select:after {
  top: 17px;
  width: 7px !important;
  height: 7px !important;
}

.text-pc-base {
  font-size: 15px !important;
}

@media only screen and (max-width: 640px) {
  .p-toppage__cassette__wrap {
    gap: 10px;
  }
  .sp_tabTitle {
    font-size: 13px;
    white-space: nowrap;
    &.is-active,
    &.is-active > a {
      color: #DD0000;
    }
  }

  .category-fields-wrapper {
    .large-category-select, .medium-category-select, .small-category-select {
      display: none;
    }
    .large-category-select {
      display: block;
    }
  }

  .text-sp-base {
    font-size: 13px !important;
  }

  .content {
    &_select {
      height: auto;
      padding: 9px 10px;
    }
  }
}

</style>
