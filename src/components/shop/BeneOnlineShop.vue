<!-- TOP ベネ通販タブ -->
<template>
  <div class="c-shop-search c-card__content">
    <div class="c-card__inner content_inner">
      <!-- カテゴリ -->
      <div class="c-shop-search__category c-shop-search__param">
        <div class="c-shop-search__param__label">カテゴリ</div>
        <div class="c-select content_select">
          <select
            class="c-select__control"
            v-model="form.catMidClassCd"
            @change="onChangeMidCat($event)"
            :disabled="middleCategoryList.length === 0"
          >
            <option selected value="" class="default">中カテゴリ</option>
            <option
              v-for="(middle, i) in middleCategoryList"
              :key="`middle-${i}`"
              :value="middle.catClassCd"
            >
              {{ middle.name }}
            </option>
          </select>
        </div>
        <div class="c-select content_select">
          <select
            class="c-select__control"
            v-model="form.catSmlClassCd"
            :disabled="form.catMidClassCd === '' || !smallCategory"
          >
            <option selected value="" class="default">小カテゴリ</option>
            <option
              v-for="(small, i) in smallCategory"
              :key="`small-${i}`"
              :value="small.catClassCd"
            >
              {{ small.name }}
            </option>
          </select>
        </div>
      </div>
      <!-- 価格帯 -->
      <div class="c-shop-search__price c-shop-search__param">
        <div class="c-shop-search__param__label">価格帯</div>
        <div class="c-shop-search__input-wrapper">
          <div class="c-input">
            <input type="number" step="1" v-model="form.priceFrom" class="content_input" />
          </div>
          <span class="c-shop-search__unit">円～</span>
        </div>
        <div class="c-shop-search__input-wrapper">
          <div class="c-input">
            <input type="number" step="1" v-model="form.priceTo" class="content_input" />
          </div>
          <span class="c-shop-search__unit">円</span>
        </div>
      </div>

      <!-- 割引率 -->
      <div class="c-shop-search__discount-rate c-shop-search__param">
        <div class="c-shop-search__param__label">割引率</div>
        <div class="c-shop-search__input-wrapper">
          <div class="c-input">
            <input type="number" step="1" v-model="form.discountFrom" class="content_input" />
          </div>
          <span class="c-shop-search__unit">％～</span>
        </div>
        <div class="c-shop-search__input-wrapper">
          <div class="c-input">
            <input type="number" step="1" v-model="form.discountTo" class="content_input" />
          </div>
          <span class="c-shop-search__unit">％</span>
        </div>
      </div>

      <!-- 検索フォーム -->
      <div class="c-shop-search__keyword p-toppage__search__main__row content_form">
        <!-- フリー検索欄 -->
        <div class="p-toppage__search__main__keyword w-full content_form_free">
          <FormsKeywordSearchShop
            :placeholder="
              !$utils.isSmartPhone()
                ? '商品名・ブランド・メニューNo（例：テレビ　型番）'
                : '商品名・ブランド・メニューNo（例：テレビ　型番）'
            "
            @input="inputKeyword"
            @onSearch="onSearch()"
            :background="true"
          />
        </div>

        <!-- 検索ボタン -->
        <div v-if="formError" class="p-toppage__search__main__input--error">
          <span>
            <Icon name="alert" color="#CC0621" />
          </span>
          {{ formError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uniqBy from "lodash/uniqBy";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";

export default {
  name: "ShopBeneOnlineShop",
  props: {
    boCode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      /**
       * カテゴリ一覧
       */
      categories: [],
      form: {
        keyword: "",
        /**
         * 大カテゴリ
         */
        catLrgClassCd: "115",
        /**
         * 選択中の中カテゴリ
         */
        catMidClassCd: "",
        /**
         * 選択中の小カテゴリ
         */
        catSmlClassCd: "",
        /**
         * 価格帯FROM
         */
        priceFrom: "",
        /**
         * 価格帯TO
         */
        priceTo: "",
        /**
         * 割引率FROM
         */
        discountFrom: "",
        /**
         * 割引率TO
         */
        discountTo: "",
      },
      /**
       * 入力エラー
       */
      formError: "",
    };
  },
  computed: {
    middleCategoryList() {
      /**
       * 中カテゴリ一覧
       */
      if (this.categories.length) {
        const listFilter = filter(this.categories, (item) => {
          if (
            item.level === 2 &&
            item.catLrgClassCd === this.form.catLrgClassCd
          ) {
            return item;
          }
        });
        return uniqBy(listFilter, "catClassCd");
      }
      return [];
    },
    /**
     * 小カテゴリ一覧
     */
    smallCategory() {
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
      return [];
    },
  },
  methods: {
    /**
     * カテゴリー一覧の取得
     */
    async getCategories() {
      const res = await this.$repositories("shop").getLargeCategories();
      if (res) {
        this.categories = res.data.categories || [];
      }
    },
    /**
     * 中カテゴリ変更イベント
     * @param {*} event
     */
    onChangeMidCat(event) {
      if (event.target.value === "") {
        this.form.catMidClassCd = "";
        this.form.catSmlClassCd = "";
      } else if (event.target.value !== "") {
        this.form.catMidClassCd = event.target.value;
        this.form.catSmlClassCd = "";
      }
    },
    /**
     * キーワード変更イベント
     * @param {*} args
     */
    inputKeyword(args) {
      this.form.keyword = args;
    },
    /**
     * 正数値かのチェック
     */
    isNumber(num) {
      if (num) {
        const number = Number(num);
        if (number >= 0) {
          if (!Number.isInteger(number)) {
            return false;
          }
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    /**
     * 入力チェック
     */
    validate() {
      if (
        !this.isNumber(this.form.priceFrom) ||
        !this.isNumber(this.form.priceTo) ||
        !this.isNumber(this.form.discountFrom) ||
        !this.isNumber(this.form.discountTo)
      ) {
        return "価格帯・割引率は正数値で入力してください。";
      }
      return "";
    },
    /**
     * 検索ボタンクリックイベント
     */
    onSearch() {
      this.formError = this.validate();
      if (this.formError) {
        return;
      }
      const paramsKeys = Object.keys(this.form),
        len = paramsKeys.length,
        params = [];

      for (let i = 0; i < len; i++) {
        params.push(`${paramsKeys[i]}=${this.form[paramsKeys[i]]}`);
      }
      params.push(`boCode=${this.boCode}`);

      const url =
        process.env.VUE_APP_SHOP_DOMAIN + "/menus?" + params.join("&");

      window.open(url, "_self");
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/_object/_component/c-shop-search";

.content {
  &_inner {
    padding: 12px 12px 20px;
  }
  &_select {
    select, option {
      &:not(:disabled) {
        color: #1F2021;
      }
    }
  }
  &_input {
    background-color: #f4f5f6 !important;
    outline: none;
    border: 1px solid #cacccf;
    &:focus {
      background-color: #FFF7F7 !important;
      outline: none;
      border: 1px solid #da291c;
    }
  }
  &_form {
    &_free {
      width: 100%;
      padding-right: 0;
    }
  }
}

@media screen and (max-width: 640px) {
  .content {
    &_inner {
      padding: 10px;
    }
    &_form {
      &_free {
        margin-bottom: 0;
      }
    }
  }
}

</style>
