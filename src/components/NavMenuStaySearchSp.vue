<template>
  <div class="c-nav-menu-stay-search-sp c-card__content">
    <div class="c-nav-menu-stay-search-sp__nav">
      <div
        class="list__item"
        @click="stayNavChange(1)"
        :class="{ 'is-active': stayIsActive === 1 }"
      >
        国内宿泊施設
      </div>
      <div
        class="list__item"
        @click="stayNavChange(2)"
        :class="{ 'is-active': stayIsActive === 2 }"
      >
        公共の宿
      </div>
      <div class="list__item">
        <a
          :href="getLinkSSO('stayUrl')"
          target="_blank"
        >
          海外旅行<i
            ><img
              src="@/assets/images/icon/arrow-up-right-from-square-solid.svg"
              alt=""
          /></i>
        </a>
      </div>
      <div class="list__item">
        <a
        :href="getLinkSSO('orderStayURL')"
        target="_blank"
        >
          パッケージツアー・旅行代理店、航空券・交通・その他旅行関連<i
            ><img
              src="@/assets/images/icon/arrow-up-right-from-square-solid.svg"
              alt=""
          /></i>
        </a>
      </div>
    </div>

    <div class="c-nav-menu-stay-search-sp__main c-card__inner3">
      <template v-if="stayIsActive === 1">
        <div class="c-nav-menu-stay-search-sp__main__row">
           <div class="c-nav-menu-stay-search-sp__main__areaSelector">
            <div class="c-select">
              <select
                class="c-select__control"
                v-model="areaMidClassCd"
                @change="onChangeMidArea($event)"
                :disabled="areaMidClasses.length === 0"
              >
                <option selected value="" class="default">大エリア</option>
                <option
                  v-for="(mid, i) in areaMidClasses"
                  :key="`mid-${i}`"
                  :value="mid.areaMidClassCd"
                >{{ mid.areaMidClassNm }}</option>
              </select>
            </div>
            <div class="c-select">
              <select
                class="c-select__control"
                v-model="areaSmlClassCd"
                @change="onChangeSmlArea($event)"
                :disabled="areaMidClassCd === '' || areaSmlClasses.length === 0"
              >
                <option selected value="" class="default">中エリア</option>
                <option
                  v-for="(sml, i) in areaSmlClasses"
                  :key="`sml-${i}`"
                  :value="sml.areaSmlClassCd"
                >{{ sml.areaSmlClassNm }}</option>
              </select>
            </div>
            <div class="c-select">
              <select
                class="c-select__control"
                v-model="areaDtlClassCd"
                :disabled="areaMidClassCd === '' || areaDtlClasses.length === 0"
              >
                <option selected value="" class="default">小エリア</option>
                <option
                  v-for="(small, i) in areaDtlClasses"
                  :key="`small-${i}`"
                  :value="small.areaDtlClassCd"
                >{{ small.areaDtlClassNm }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="c-nav-menu-stay-search-sp__main__row">
          <div class="c-input c-input--group">
            <input
              type="text"
              name="input_text"
              placeholder="施設名、メニューNo、地名などを入力（例：東京　温泉）"
              @keypress.enter="onDomesticStaySearch()"
              autocomplete="on"
              class="c-stay-search-input"
              @input="domesticInput"
              :class="{
                'c-input__background': true,
                'c-input__background--error': error.keywordError
              }"
            />
          </div>
        </div>
        <div  class="c-nav-menu-stay-search-sp__main__category">
          <span >期間</span>
        </div>
        <div class="c-nav-menu-stay-search-sp__main__row">
          <div class="c-nav-menu-stay-search-sp__main__dateSelector">
              <div class="datePicker__wrap">
                <date-picker
                  class="datePicker__input stay-search-datepicker"
                  placeholder="YYYY/MM/DD"
                  :language="$root.Datepicker.language.ja"
                  :disabled-dates="pickerOption.disabledDates"
                  :format="pickerOption.displayFormat"
                  v-model="checkInDate"
                  clear-button
                  clear-button-icon="fa fa-times-circle"
                />
                <icon name="top_calendar" height="18" width="18" />
              </div>
            <div class="stayNight__select">
                <span>から</span>
              <div class="c-nav-menu-stay-search-sp__select__control">
                <div
                  @click="stayDecrement"
                  :class="{ disabled: stayNights < 2 }"
                  class="c-button-counter c-button-counter__left"
                >
                  <Icon
                    name="action_circle_minus_fill"
                    width="26"
                    height="26"
                  />
                </div>
                <select v-model="stayNights" class="c-nav-menu-stay-search-sp__select__control__webkit">
                  <template v-for="n in 6">
                    <option :value="n" :key="`stay-night-${n}`"
                      >{{ n }}泊</option
                    >
                  </template>
                </select>
                <div
                  @click="stayIncrement"
                  :class="{ disabled: stayNights > 5 }"
                  class="c-button-counter c-button-counter__right"
                >
                  <Icon name="action_circle_plus_fill" width="26" height="26" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div  class="c-nav-menu-stay-search-sp__main__category">
          <span >部屋数</span>
        </div>
        <div class="c-nav-menu-stay-search-sp__main__row">
          <div class="c-nav-menu-stay-search-sp__main__stayConditions">
            <div class="c-nav-menu-stay-search-sp__select__control">
              <div
                @click="roomDecrement"
                :class="{ disabled: rooms < 2 }"
                class="c-button-counter c-button-counter__left"
              >
                <Icon name="action_circle_minus_fill" width="26" height="26" />
              </div>
              <select v-model="rooms" class="c-nav-menu-stay-search-sp__select__control__webkit">
                <template v-for="n in 10">
                  <option :value="n" :key="`room-${n}`">{{ n }}</option>
                </template>
              </select>
              <div
                @click="roomIncrement"
                :class="{ disabled: rooms > 9 }"
                class="c-button-counter c-button-counter__right"
              >
                <Icon name="action_circle_plus_fill" width="26" height="26" />
              </div>
            </div>
            <span>1部屋ご利用人数</span>
            <div class="c-nav-menu-stay-search-sp__select__control">

              <div
                @click="adultDecrement"
                :class="{ disabled: adult < 2 }"
                class="c-button-counter c-button-counter__left"
              >
                └<span class="control-label">大人</span>
                <Icon name="action_circle_minus_fill" width="26" height="26" />
              </div>
              <select v-model="adult" @change="peoples" class="c-nav-menu-stay-search-sp__select__control__webkit">
                <template v-for="n in 10">
                  <option :value="n" :key="`adult-${n}`">{{ n }}人</option>
                </template>
              </select>
              <div
                @click="adultIncrement"
                :class="{ disabled: adult > 9 }"
                class="c-button-counter c-button-counter__right"
              >
                <Icon name="action_circle_plus_fill" width="26" height="26" />
              </div>

              <span class="control-label">/子ども</span>
                <VDropdown>
                  <input
                    class="c-input-dropdown"
                    type="text"
                    :value="child | humanUnit"
                    @change="peoples"
                  />
                  <template #popper>
                    <StaySearchChildrenPicker
                      :rooms="rooms"
                      v-model="child"
                      @changeChildrenQuantity="onChangeChildrenQuantity"
                    />
                  </template>
                </VDropdown>
            </div>
          </div>
        </div>
        <div  class="c-nav-menu-stay-search-sp__main__category">
          <span >部屋タイプ</span>
        </div>
        <div class="c-nav-menu-stay-search-sp__main__row">
          <div class="c-nav-menu-stay-search-sp__accordion">
            <div>
              <div>
                <div class="c-nav-menu-stay-search-sp__accordion__content">
                  <div class="other_conditions">
                    <div class="c-checkbox">
                      <label class="c-checkbox__inner">
                        <input
                          type="checkbox"
                          value="isNonSmokingRoom"
                          v-model="roomCondition"
                        />
                        <span class="c-checkbox__box" />
                        <span class="c-checkbox__label">禁煙</span>
                      </label>
                    </div>
                    <div class="c-checkbox">
                      <label class="c-checkbox__inner">
                        <input
                          type="checkbox"
                          value="isSmokingRoom"
                          v-model="roomCondition"
                        />
                        <span class="c-checkbox__box" />
                        <span class="c-checkbox__label">喫煙</span>
                      </label>
                    </div>
                    <div class="c-checkbox">
                      <label class="c-checkbox__inner">
                        <input
                          type="checkbox"
                          name="smok_random_flag"
                          v-model="smok_random_flag"
                        />
                        <span class="c-checkbox__box" />
                        <span class="c-checkbox__label">おまかせ</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div  class="c-nav-menu-stay-search-sp__main__category">
          <span >こだわり条件</span>
        </div>
        <div class="c-nav-menu-stay-search-sp__main__row">
          <div class="c-nav-menu-stay-search-sp__accordion">
            <div>
              <div>
                <div class="c-nav-menu-stay-search-sp__accordion__content">
                  <div class="other_conditions">
                    <div class="c-checkbox">
                      <label class="c-checkbox__inner">
                         <input
                          type="checkbox"
                          value="isNotRakuten"
                          v-model="planByCompany"
                        />
                        <span class="c-checkbox__box" />
                        <span class="c-checkbox__label">
                          <img
                            src="@/assets/images/top/bene-log.png"
                            alt="Beneオリジナル"
                        /></span>
                      </label>
                      <label class="c-checkbox__inner">
                        <input
                          type="checkbox"
                          value="isRakuten"
                          v-model="planByCompany"
                        />
                        <span class="c-checkbox__box" />
                        <span class="c-checkbox__label">
                          <img
                            src="@/assets/images/top/recomment-rakuten.png"
                            alt="BeneRakutentravel"
                          />
                        </span>
                      </label>                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="stayIsActive === 2">
        <div class="c-nav-menu-stay-search-sp__main__row">
          <div class="c-nav-menu-stay-search-sp__main__areaSelector">
            <div class="c-select">
              <select
                class="c-select__control"
                v-model="areaMidClassCd"
                @change="onChangeMidArea($event)"
                :disabled="areaMidClasses.length === 0"
              >
                <option selected value="" class="default">大エリア</option>
                <option
                  v-for="(mid, i) in areaMidClasses"
                  :key="`mid-${i}`"
                  :value="mid.areaMidClassCd"
                >{{ mid.areaMidClassNm }}</option>
              </select>
            </div>
            <div class="c-select">
              <select
                class="c-select__control"
                v-model="areaSmlClassCd"
                @change="onChangeSmlArea($event)"
                :disabled="areaMidClassCd === '' || areaSmlClasses.length === 0"
              >
                <option selected value="" class="default">{{ 中エリア }}</option>
                <option
                  v-for="(sml, i) in areaSmlClasses"
                  :key="`sml-${i}`"
                  :value="sml.areaSmlClassCd"
                >{{ sml.areaSmlClassNm }}</option>
              </select>
            </div>
            <div class="c-select">
              <select
                class="c-select__control"
                v-model="areaDtlClassCd"
                :disabled="areaMidClassCd === '' || areaDtlClasses.length === 0"
              >
                <option selected value="" class="default">小エリア</option>
                <option
                  v-for="(small, i) in areaDtlClasses"
                  :key="`small-${i}`"
                  :value="small.areaDtlClassCd"
                >{{ small.areaDtlClassNm }}</option>
              </select>
            </div>
          </div>
          <div class="c-input c-input--group">
            <input
              type="text"
              name="input_text"
              placeholder="施設名、メニューNo、地名などを入力（例：東京　温泉）"
              @keypress.enter="onDomesticStaySearch()"
              autocomplete="on"
              class="c-stay-search-input"
              :class="{
                        'c-input__background': true,
                        'c-input__background--error': error.keywordError
                      }"
              @input="publicInput"
            />
          </div>
        </div>
      </template>
    </div>
    <div
      v-if="error.keywordError"
      class="p-toppage__search__main__input--error"
    >
      <span>
        <Icon name="alert" color="#CC0621" />
      </span>
      {{ error.keywordError }}
    </div>
    <div class="search-buttons">
      <button
        type="submit"
        class="search-button"
        @click="
        stayIsActive === 1
        ? onDomesticStaySearch()
        : stayIsActive === 2
        ? onPublicStaySearch()
        : null
        "
      >
        <icon name="action_search" />
        <span>検索</span>
      </button>
    </div>
  </div>
</template>

<script>
// import Datepicker from "vuejs-datepicker";
import { ja } from "vuejs-datepicker/dist/locale";
import StaySearchChildrenPicker from "@/components/StaySearchChildrenPicker.vue";
export default {
  components: {
    // Datepicker,
    StaySearchChildrenPicker
  },
  filters: {
    humanUnit(value) {
      return `${value}人`;
    }
  },
  props: {
    boCode: {
      type: String
    },
  },
  data() {
    return {
      stayIsActive: 1,
      domesticKeyword: "",
      publicKeyword: "",
      pickerOption: {
        location: ja,
        displayFormat: "yyyy/MM/dd",
        disabledDates: {
          to: new Date(new Date().setDate(new Date().getDate() - 1))
        }
      },
      planByCompany: [],
      roomCondition: [],
      serviceEquip: [],
      areaMidClasses: [],
      areaSmlClasses: [],
      areaDtlClasses: [],

      areaLrgClassCd: "",
      areaMidClassCd: "",
      areaSmlClassCd: "",
      areaDtlClassCd: "",
      stayNights: "1",
      rooms: "1",
      adult: 2,
      child: 0,
      people: 1,
      chillDetails: {
        exUpperGradesHeadCnt: 0,
        exLowerGradesHeadCnt: 0,
        youjiAHeadCnt: 0,
        youjiBHeadCnt: 0,
        youjiCHeadCnt: 0,
        youjiDHeadCnt: 0
      },
      smok_random_flag: false,
      checkInDate: "",
      error: {
        keywordError: ""
      },
    };
  },
  methods: {
    getISODate(date) {
      return date ? this.$moment(date).format("YYYY-MM-DD") : "";
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
        areaMidClassCd: data.areaMidClassCd
      });
      if (res) {
        this.areaLrgClassCd = data.areaLrgClassCd;
        this.areaMidClassCd = data.areaMidClassCd;
        this.areaSmlClasses =
          res?.data?.areaLrgClasses?.[0]?.areaMidClasses?.[0]?.areaSmlClasses ||
          [];
      }
    },
    async getDtlCodesArea(index) {
      const data = this.areaSmlClasses[index - 1];
      const res = await this.$repositories("search").getCodesArea({
        areaLrgClassCd: this.areaLrgClassCd,
        areaMidClassCd: this.areaMidClassCd,
        areaSmlClassCd: data.areaSmlClassCd
      });
      if (res) {
        this.areaDtlClasses =
          res?.data?.areaLrgClasses?.[0]?.areaMidClasses?.[0]
            ?.areaSmlClasses?.[0]?.areaDtlClasses || [];
      }
    },
    stayNavChange(num) {
      this.stayIsActive = num;
    },
    domesticInput(e) {
      this.domesticKeyword = e.target.value;
    },
    publicInput(e) {
      this.publicKeyword = e.target.value;
    },
    getGroupParams(group) {
      return group?.length ? group.filter(Boolean).toString() : "";
    },
    toQueryString(paramsObject) {
      return Object.keys(paramsObject)
        .filter((item) => paramsObject[item])
        .map((key) => `${key}=${paramsObject[key]}`)
        .join("&");
    },
    onDomesticStaySearch() {
      this.error.keywordError = "";
      if (
        !this.domesticKeyword &&
        !this.areaMidClassCd
      ) {
        this.error.keywordError =
          "キーワードを入力するかエリアを選択してください。";
        return;
      }
      const uri = `${process.env.VUE_APP_STAY_DOMAIN}/search/menu`;
      const params = {
        category: "stay",
        rooms: this.rooms,
        roomCnt: this.rooms,
        numPeople: this.child + this.adult,
        stayNights: this.stayNights,
        keyword: this.domesticKeyword,
        areaLrgClassCd: this.areaLrgClassCd,
        areaMidClassCd: this.areaMidClassCd,
        areaSmlClassCd: this.areaSmlClassCd,
        areaDtlClassCd: this.areaDtlClassCd,
        // smok_random_flag: this.smok_random_flag ? 1 : 0,
        checkInDate: this.getISODate(this.checkInDate),
        roomCondition: this.getGroupParams(this.roomCondition),
        planByCompany: this.getGroupParams(this.planByCompany),
        adultHeadCnt: this.adult,
        exUpperGradesHeadCnt: this.chillDetails.exUpperGradesHeadCnt,
        exLowerGradesHeadCnt: this.chillDetails.exLowerGradesHeadCnt,
        youjiAHeadCnt: this.chillDetails.youjiAHeadCnt,
        youjiBHeadCnt: this.chillDetails.youjiBHeadCnt,
        youjiCHeadCnt: this.chillDetails.youjiCHeadCnt,
        youjiDHeadCnt: this.chillDetails.youjiDHeadCnt
      };
      const queryParams = this.toQueryString(params);
      window.open(`${uri}?${queryParams}`, "_self");
    },
    onPublicStaySearch() {
      this.error.keywordError = "";
      if (
        !this.publicKeyword &&
        !this.areaMidClassCd
      ) {
        this.error.keywordError =
          "キーワードを入力するかエリアを選択してください。";
        return;
      }
      let url = process.env.VUE_APP_SEARCH_STAY_DOMAIN;
      url += `?keyword=${this.publicKeyword}`;
      url +=
        "&areaLrgClassCd=" +
        this.areaLrgClassCd +
        "&areaMidClassCd=" +
        this.areaMidClassCd +
        "&areaSmlClassCd=" +
        this.areaSmlClassCd +
        "&areaDtlClassCd=" +
        this.areaDtlClassCd;
      if (this.stayIsActive === 1) {
        url += "&category=stay";
      } else if (this.stayIsActive === 2) {
        url += "&category=publicStay";
      }
      window.open(url, "_self");
    },
    stayDecrement() {
      if (this.stayNights > 0) {
        this.stayNights--;
      }
    },
    stayIncrement() {
      if (this.stayNights < 6) {
        this.stayNights++;
      }
    },
    roomDecrement() {
      if (this.rooms > 1) {
        this.rooms--;
      }
    },
    roomIncrement() {
      if (this.rooms < 10) {
        this.rooms++;
      }
    },
    adultDecrement() {
      if (this.adult > 1) {
        this.adult--;
        this.peoples();
      }
    },
    adultIncrement() {
      if (this.adult < 10) {
        this.adult++;
        this.peoples();
      }
    },
    childDecrement() {
      if (this.child > 1) {
        this.child--;
        this.peoples();
      }
    },
    childIncrement() {
      if (this.child < 10) {
        this.child++;
        this.peoples();
      }
    },
    peoples() {
      return (this.people = parseInt(this.adult) + parseInt(this.child));
    },
    onChangeMidArea(event) {
      if (event.target.value === "") {
        this.areaMidClassCd = "";
        this.areaSmlClassCd = "";
        this.areaDtlClassCd = "";
        this.areaSmlClasses = [];
        this.areaDtlClasses = [];
      } else if (event.target.value !== "") {
        this.areaMidClassCd = event.target.value;
        this.areaSmlClassCd = "";
        this.areaDtlClassCd = "";
        this.areaSmlClasses = [];
        this.areaDtlClasses = [];
        this.getSmlCodesArea(event.target.selectedIndex);
      }
    },
    onChangeSmlArea(event) {
      if (event.target.value === "") {
        this.areaSmlClassCd = "";
        this.areaDtlClassCd = "";
        this.areaDtlClasses = [];
      } else if (event.target.value !== "") {
        this.areaSmlClassCd = event.target.value;
        this.areaDtlClassCd = "";
        this.areaDtlClasses = [];
        this.getDtlCodesArea(event.target.selectedIndex);
      }
    },
    onChangeChildrenQuantity(childDetails) {
      this.chillDetails = childDetails;
    },
    getLinkSSO(type){
      switch(type){
        case 'stayUrl': return process.env.VUE_APP_INTERNAL_STAY_URL_SSO;
        case 'orderStayURL': return process.env.VUE_APP_INTERNAL_OTHER_STAY_URL_SSO;
        default: return'';
      }
    }
  },
  mounted() {
    this.getMidCodesArea();
  }
};
</script>
<style scoped lang="scss">
.stay-search-datepicker::v-deep {
  .vdp-datepicker__clear-button {
    position: absolute;
    left: 10px;
    top: 7px;
    font-size: 23px;
  }
}
select {
  color: #000;
  &:disabled {
    color: lightgray;
  }
}
_::-webkit-full-page-media, _:future, :root .c-nav-menu-stay-search-sp__select__control__webkit {
  text-indent: 0.9rem;
}
</style>
