<template>
  <div>

    <div class="panel-section">

      <div class="inner-box">
        <StayNav
          @click-accommodation="stayNavChange(1)"
          @click-public="stayNavChange(2)"
          @click-stay="clickStayUrl"
          @click-order="clickOrderUrl"
          :activeId="stayIsActive"
        />

          <div class="c-stay-search c-card__content">

            <!-- 検索部 -->
            <div class="c-stay-search__main searchContent">
              <!-- 「国内宿泊施設」選択時 -->
              <template v-if="stayIsActive === 1">

                <div class="c-input c-input--group  mb-4  block sm:hidden">
                  <input
                    type="text"
                    name="input_text"
                    :placeholder="
                      !$utils.isSmartPhone()
                        ? '施設名、メニューNo、キーワードなど'
                        : '施設名、メニューNo、キーワードなど'
                    "
                    @keypress.enter="onDomesticStaySearch()"
                    @input="domesticInput"
                    autocomplete="on"
                    class="c-stay-search-input c-input__background text-pc-base text-sp-base"
                    :class="{
                      'c-input__background--error': error.keywordError
                    }"
                  />   
                </div>

                <div class="category-fields-wrapper flex-row flex">
                  <div class="c-select">
                    <SelectBox first-option="都道府県" :options="areaMidClassesSelectBoxData" v-model="areaMidClassCd" @changed="onChangeMidArea($event)" :disabled="areaMidClasses.length === 0" />
                  </div>
                  <div class="c-select">
                    <SelectBox first-option="市区町村" wrapper-class="opacity-100" :options="areaSmlClassesSelectBoxData" v-model="areaSmlClassCd" @changed="onChangeSmlArea($event)" :disabled="areaMidClassCd === '' || areaSmlClasses.length === 0" />
                  </div>
                  <div class="c-select">
                    <SelectBox first-option="エリア" wrapper-class="opacity-100" :options="areaDtlClassesSelectBoxData" v-model="areaDtlClassCd" @changed="onChangeDtlArea($event)" :disabled="areaMidClassCd === '' || areaDtlClasses.length === 0" />
                  </div>
                </div>

                <div class="c-input c-input--group search-text-group mb-4 hidden sm:block">
                  <input
                    type="text"
                    name="input_text"
                    :placeholder="
                      !$utils.isSmartPhone()
                        ? '施設名、メニューNo、キーワードなど'
                        : '施設名、メニューNo、キーワードなど'
                    "
                    @keypress.enter="onDomesticStaySearch()"
                    @input="domesticInput"
                    autocomplete="on"
                    class="c-stay-search-input c-input__background px-2 text-pc-base text-sp-base"
                    :class="{
                      'c-input__background--error': error.keywordError
                    }"
                  />   
                </div>                

                <!-- PC表示時：期間 -->
                <template v-if="innerWidth > 640">
                  <div class="c-stay-search__main__row">
                    <div class="c-stay-search__main__dateSelector">
                      <div class="control-label">期間</div>
                      <div class="datePicker__wrap">
                        <date-picker
                          class="datePicker__input stay-search-datepicker"
                          name="datepickerPC"
                          :language="$root.Datepicker.language.ja"
                          :disabled-dates="pickerOption.disabledDates"
                          :format="pickerOption.displayFormat"
                          v-model="checkInDate"
                          clear-button
                          clear-button-icon="fa fa-times-circle"
                        />
                        <Icon
                        name="top_calendar"
                        width="17"
                        height="17"
                        />
                      </div>
                      <div class="c-stay-search__select__control">
                        <div class="c-stay-search__select__control__right">から</div>
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
                        <select v-model="stayNights">
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
                </template>

                <!-- SP表示時：期間 -->
                <template v-if="innerWidth <= 640">
                  <!-- タイトル -->
                  <h3 class="searchContent_date_title">期間</h3>
                  <!-- コンテンツ -->
                  <div class="searchContent_date">
                    <!-- 日付ピッカー -->
                    <div class="searchContent_date_picker_wrapper">
                      <date-picker
                        name="searchContent_date_picker__SP"
                        :language="$root.Datepicker.language.ja"
                        :disabled-dates="pickerOption.disabledDates"
                        :format="pickerOption.displayFormat"
                        v-model="checkInDate"
                        class="searchContent_date_picker"
                        input-class="search_datepicker__SP"
                      />
                      <Icon
                        class="searchContent_date_picker_icon"
                        name="top_calendar"
                      />
                    </div>

                    <!-- 宿泊数選択 -->
                    <div class="searchContent_date_stays">
                      <span class="searchContent_date_stays__span">から</span>
                      <!-- マイナスアイコン -->
                      <div
                        @click="stayDecrement"
                        :class="{ disabled: stayNights < 2 }"
                        class="searchContent_date_stays__minus"
                      >
                        <Icon
                          name="action_circle_minus_fill"
                          width="24"
                          height="24"
                        />
                      </div>
                      <!-- セレクトメニュー -->
                      <select 
                        v-model="stayNights" 
                        class="searchContent_date_stays__select"
                      >
                        <template v-for="n in 6" >
                          <option :value="n" :key="`stay-night-${n}`"
                            >{{ n }}泊</option
                          >
                        </template>
                      </select>
                      <!-- プラスアイコン -->
                      <div
                        @click="stayIncrement"
                        :class="{ disabled: stayNights > 5 }"
                        class="searchContent_date_stays__plus"
                      >
                        <Icon name="action_circle_plus_fill" width="26" height="26" />
                      </div>
                    </div>
                  </div>
                </template>

                <!-- PC表示時：部屋数 -->
                <template v-if="innerWidth > 640">
                  <div class="c-stay-search__main__row">
                    <div class="c-stay-search__main__stayConditions">
                      <div class="control-label">部屋数</div>
                      <div class="c-stay-search__select__control">
                        <div
                          @click="roomDecrement"
                          :class="{ disabled: rooms < 2 }"
                          class="c-button-counter c-button-counter__left"
                        >
                          <Icon name="action_circle_minus_fill" width="26" height="26" />
                        </div>
                        <select v-model="rooms">
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
                    <div class="tip-display">
                        <div class="c-stay-search__select__control">
                          <div class="c-stay-search__select__control__left">1部屋ご利用人数</div>
                          <span>大人</span>
                          <div
                            @click="adultDecrement"
                            :class="{ disabled: adult < 2 }"
                            class="c-button-counter c-button-counter__left"
                          >
                            <Icon name="action_circle_minus_fill" width="26" height="26" />
                          </div>
                          <select v-model="adult" @change="peoples">
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
                          <span>/子ども</span>
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
                  </div>
                </template>

                <!-- SP表示時：部屋数 -->
                <template v-if="innerWidth <= 640">
                  
                  <!-- タイトル -->
                  <h3 class="searchContent_room_title">部屋数</h3>
                  <div class="searchContent_room">

                    <!-- 部屋数選択 -->
                    <div class="searchContent_room_num">
                      <!-- マイナスアイコン -->
                      <div
                        @click="roomDecrement"
                        :class="{ disabled: rooms < 2 }"
                        class="searchContent_room_num__minus"
                      >
                        <Icon name="action_circle_minus_fill" width="24" height="24" />
                      </div>

                      <!-- セレクトボタン -->
                      <select 
                        v-model="rooms" 
                        class="searchContent_room_num__select"
                      >
                        <template v-for="n in 10">
                          <option :value="n" :key="`room-${n}`">{{ n }}</option>
                        </template>
                      </select>

                      <!-- プラスアイコン -->
                      <div
                        @click="roomIncrement"
                        :class="{ disabled: rooms > 9 }"
                        class="searchContent_room_num__plus"
                      >
                        <Icon name="action_circle_plus_fill" width="24" height="24" />
                      </div>
                    </div>

                    <!-- サブタイトル：1部屋ご利用人数 -->
                    <p class="searchContent_room_subTitle">1部屋ご利用人数</p>

                    <!-- 人数選択：大人・子ども -->
                    <div class="searchContent_room_detail">
                      <!-- 大人 -->
                      <div class="searchContent_room_detail_adult">
                        <p>大人</p>
                        <!-- マイナスアイコン -->
                        <div
                          @click="adultDecrement"
                          :class="{ disabled: adult < 2 }"
                          class="searchContent_room_detail_adult__minus"
                        >
                          <Icon name="action_circle_minus_fill" width="24" height="24" />
                        </div>

                        <!-- セレクトメニュー -->
                        <select 
                          v-model="adult" 
                          @change="peoples"
                          class="searchContent_room_detail_adult__select"
                        >
                          <template v-for="n in 10">
                            <option :value="n" :key="`adult-${n}`">{{ n }}人</option>
                          </template>
                        </select>

                        <!-- プラスアイコン -->
                        <div
                          @click="adultIncrement"
                          :class="{ disabled: adult > 9 }"
                          class="searchContent_room_detail_adult__plus"
                        >
                          <Icon name="action_circle_plus_fill" width="24" height="24" />
                        </div>
                      </div>

                      <!-- 子ども -->
                      <div class="searchContent_room_detail_child">
                        <p>/子ども</p>
                        <VDropdown>
                          <div class="searchContent_room_detail_child__select">
                            <input
                              class="c-input-dropdown"
                              type="text"
                              :value="child | humanUnit"
                              @change="peoples"
                            />
                          </div>
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
                </template>

                <!-- PC表示時：部屋タイプ -->
                <template v-if="innerWidth > 640">
                  <div class="c-stay-search__main__row c-stay-search__accordion">
                    <div class="control-label">部屋タイプ</div>
                    <div>
                      <div class="c-stay-search__accordion__content">
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
                                value="isSmokRandomFlag"
                                v-model="roomCondition"
                              />
                              <span class="c-checkbox__box" />
                              <span class="c-checkbox__label">おまかせ</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- SP表示時：部屋タイプ -->
                <template v-if="innerWidth <= 640">
                  <h3 class="searchContent_type_title">部屋タイプ</h3>
                  <div class="searchContent_type">

                    <!-- 禁煙 -->
                    <label class="searchContent_type_item searchContent_checkbox__label">
                      <input
                        type="checkbox"
                        value="isNonSmokingRoom"
                        v-model="roomCondition"
                      />
                      <span class="searchContent_checkbox__box" :class="roomCondition.includes('isNonSmokingRoom') ? 'isActive': ''" />
                      <span class="searchContent_checkbox__text">禁煙</span>
                    </label>

                    <!-- 喫煙 -->
                    <label class="searchContent_type_item searchContent_checkbox__label">
                      <input
                        type="checkbox"
                        value="isSmokingRoom"
                        v-model="roomCondition"
                      />
                      <span class="searchContent_checkbox__box" :class="roomCondition.includes('isSmokingRoom') ? 'isActive': ''" />
                      <span class="searchContent_checkbox__text">喫煙</span>
                    </label>

                    <!-- おまかせ -->
                    <label class="searchContent_type_item searchContent_checkbox__label">
                      <input
                        type="checkbox"
                        value="isSmokRandomFlag"
                        v-model="roomCondition"
                      />
                      <span class="searchContent_checkbox__box" :class="roomCondition.includes('isSmokRandomFlag') ? 'isActive': ''" />
                      <span class="searchContent_checkbox__text">おまかせ</span>
                    </label>
                  </div>
                </template>

                <!-- PC表示時：こだわり条件 -->
                <template v-if="innerWidth > 640">
                  <div class="c-stay-search__main__row c-stay-search__accordion">
                    <div class="control-label">こだわり条件</div>
                    <div class="c-stay-search__accordion">
                      <div>
                        <div>
                          <div class="c-stay-search__accordion__content">
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

                <!-- SP表示時：こだわり条件 -->
                <template v-if="innerWidth <= 640">
                  <h3 class="searchContent_more_title">こだわり条件</h3>
                  <div class="searchContent_more">

                    <!-- <label class="searchContent_more_item searchContent_checkbox__label">
                      <input
                        type="checkbox"
                        value="hasOpenAirBath"
                        v-model="roomCondition"
                      />
                      <span class="searchContent_checkbox__box" :class="roomCondition.includes('hasOpenAirBath') ? 'isActive': ''"/>
                      <span class="searchContent_checkbox__text">露天風呂付き</span>
                    </label>

                    <label class="searchContent_more_item searchContent_checkbox__label">
                      <input
                        type="checkbox"
                        value="isPetOk"
                        v-model="roomCondition"
                      />
                      <span class="searchContent_checkbox__box" :class="roomCondition.includes('isPetOk') ? 'isActive': ''"/>
                      <span class="searchContent_checkbox__text">ペットOK</span>
                    </label> -->

                    <label class="searchContent_more_item searchContent_checkbox__label">
                      <input
                        type="checkbox"
                        value="isNotRakuten"
                        v-model="planByCompany"
                      />
                      <span class="searchContent_checkbox__box" :class="planByCompany.includes('isNotRakuten') ? 'isActive': ''"/>
                      <span class="searchContent_checkbox__img">
                        <img
                          src="@/assets/images/top/bene-log.png"
                          alt="Beneオリジナル"
                      /></span>
                    </label>

                    <label class="searchContent_more_item searchContent_checkbox__label">
                      <input
                        type="checkbox"
                        value="isRakuten"
                        v-model="planByCompany"
                      />
                      <span class="searchContent_checkbox__box" :class="planByCompany.includes('isRakuten') ? 'isActive': ''"/>
                      <span class="searchContent_checkbox__img">
                        <img
                          src="@/assets/images/top/recomment-rakuten.png"
                          alt="BeneRakutentravel"
                        />
                      </span>
                    </label>
                  </div>
                </template>
              </template>

              <!-- 「公共の宿」選択時 -->
              <template v-else-if="stayIsActive === 2">
                <!-- カテゴリ検索欄 -->
                <div class="stayPublic_cat">
                  <!-- 大カテゴリ -->
                  <div class="stayPublic_cat_item">
                    <div class="stayPublic_cat_item_outer">
                      <select
                        class="stayPublic_cat_item_select"
                        v-model="areaMidClassCd"
                        @change="onChangeMidArea($event)"
                        :disabled="areaMidClasses.length === 0"
                      >
                        <option selected value="" class="default">都道府県</option>
                        <option
                          v-for="(mid, i) in areaMidClasses"
                          :key="`mid-${i}`"
                          :value="mid.areaMidClassCd"
                        >
                          {{ mid.areaMidClassNm }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <!-- 中カテゴリ -->
                  <div class="stayPublic_cat_item">
                    <div class="stayPublic_cat_item_outer">
                      <select
                        class="stayPublic_cat_item_select"
                        v-model="areaSmlClassCd"
                        @change="onChangeSmlArea($event)"
                        :disabled="areaMidClassCd === '' || areaSmlClasses.length === 0"
                      >
                        <option selected value="" class="default">市区町村</option>
                        <option
                          v-for="(sml, i) in areaSmlClasses"
                          :key="`sml-${i}`"
                          :value="sml.areaSmlClassCd"
                        >
                          {{ sml.areaSmlClassNm }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <!-- 小カテゴリ -->
                  <div class="stayPublic_cat_item">
                    <div class="stayPublic_cat_item_outer">
                      <select
                        class="stayPublic_cat_item_select"
                        v-model="areaDtlClassCd"
                        :disabled="areaMidClassCd === '' || areaDtlClasses.length === 0"
                      >
                        <option selected value="" class="default">エリア</option>
                        <option
                          v-for="(small, i) in areaDtlClasses"
                          :key="`small-${i}`"
                          :value="small.areaDtlClassCd"
                        >
                          {{ small.areaDtlClassNm }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- フリー検索欄 -->
                <div class="stayPublic_free">
                  <FormsKeywordSearchPublic
                    class="stayPublic_free_cont"
                    :placeholder="
                      !$utils.isSmartPhone()
                        ? '施設名、メニューNo、キーワードなど'
                        : '施設名、メニューNo、キーワードなど'
                    "
                    @input="publicInput"
                    @onSearch="onPublicStaySearch()"
                    :background="false"
                    :error="error.keywordError != ''"
                  />
                </div>
                <!-- 初期実装段階では非表示のためコメントアウト -->
                <!-- <div class="c-stay-search__main__map">
                  <TextButton
                    to="/map"
                    position="left"
                    class="c-stay-search__main__map-search"
                  >
                    地図検索<Icon name="status_map" />
                  </TextButton>
                </div> -->
              </template>

              <!-- エラー表示 -->
              <div
                v-if="error.keywordError"
                class="p-toppage__search__main__input--error"
              >
                <span>
                  <Icon name="alert" color="#CC0621" />
                </span>
                {{ error.keywordError }}
              </div>

              <!-- 検索ボタン(国内宿泊施設のみ表示) -->
              <div
                class="c-stay-search__buttons searchButton"
                v-if="stayIsActive === 1"
              >
                <button
                  type="submit"
                  class="c-stay-search__submit-button content_button"
                  @click="onDomesticStaySearch()"
                >
                    <icon name="search_solid" width="22" height="22" />
                    <span class="text-pc-base">検索</span>
                </button>
                <!-- 初期実装段階では非表示のためコメントアウト -->
                <!-- <div v-if="stayIsActive === 1" class="c-stay-search__map-button">
                  <TextButton to="/map">
                    <Icon name="status_map" />地図検索
                  </TextButton>
                </div> -->
              </div>
            </div>
            </div> 

      </div>

    </div>

  </div>
</template>

<script>
import StaySearchChildrenPicker from "@/components/StaySearchChildrenPicker.vue";
import StayNav from "./StayNav.vue";
import SelectBox from './SelectBox.vue';
export default {
  components: {
    StaySearchChildrenPicker,
    StayNav,
    SelectBox
  },
  filters: {
    humanUnit(value) {
      return `${value}人`;
    }
  },
  data() {
    return {
      stayIsActive: 1,
      domesticKeyword: "",
      publicKeyword: "",
      pickerOption: {
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
      innerWidth: window.innerWidth
    };
  },
  computed: {
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
    },
  },
  methods: {
    clickStayUrl() {
      window.open(process.env.VUE_APP_INTERNAL_STAY_URL_SSO, '_blank')
    },
    clickOrderUrl() {
      window.open(process.env.VUE_APP_INTERNAL_OTHER_STAY_URL_SSO, '_blank')
    },
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
    publicInput(args) {
      this.publicKeyword = args;
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
        this.error.keywordError = "キーワードを入力するかエリアを選択してください。";
        return;
      }
      const uri = `${process.env.VUE_APP_STAY_DOMAIN}/search/menu`;
      const params = {
        category: this.stayIsActive === 2 ? "publicStay" : "stay",
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
      // バリデーション：フリー検索欄が空白、且つ大エリアが選択されていない場合はエラーを出力
      if (
        !this.publicKeyword && !this.areaMidClassCd
      ) {
        this.error.keywordError = "キーワードを入力するかエリアを選択してください。";
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
    onChangeDtlArea(event) {
      this.areaDtlClassCd = event.target.value;
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
select {
  color: #1F2021;
  &:disabled {
    color: #b5b5b5 !important;
  }
}

input {
  color: #1F2021;
  &::placeholder {
    color: #b5b5b5 !important;
  }
}

.stay-search-datepicker::v-deep {
  .vdp-datepicker__clear-button {
    position: absolute;
    left: 10px;
    font-size: 23px;
  }
}
.tip {
  padding-left: 40px;
  font-size: 10px;
}
.tip-display {
  display: flex;
  flex-direction: column;
}
.search_tab {
  display: flex;
  flex-wrap: nowrap !important;
  overflow-x: auto;
  scrollbar-width: none;
  /*IE(Internet Explorer)・Microsoft Edgeへの対応*/
  -ms-overflow-style: none;
  /*Firefoxへの対応*/
  scrollbar-width: none;
  /*Google Chrome、Safariへの対応*/
  &::-webkit-scrollbar {
    display: none;
  }
  &_item {
    white-space: nowrap;
  }
}

// 公共の宿
.stayPublic {
  &_cat {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 16px;
    &_item {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 14px;
        transform: translate(-50%, -50%) rotate(45deg);
        display: block;
        width: 7px;
        height: 7px;
        border-right: 2px solid #1F2021;
        border-bottom: 2px solid #1F2021;
      }
      &:has(.stayPublic_cat_item_select:disabled)::after {
        border-right: 2px solid #ccc;
        border-bottom: 2px solid #ccc;
      }
      &_outer {
        border: 1px solid #CACCCF;
        border-radius: 4px;
        box-sizing: border-box;
        overflow: hidden;
        outline: none;
        &:has( > .stayPublic_cat_item_select:focus) {
          border: 2px solid #e60021;
        }
      }
      &_select {
        width: 100%;
        padding: 8px 30px 8px 14px;
        font-size: 16px;
        text-indent: 0.01px;
        border: none;
        outline: none;
        cursor: pointer;
        background: transparent;
        background-image: none;
        box-shadow: none;
        -webkit-appearance: none;
        appearance: none;
        opacity: 1;
        &::-ms-expand {
          display: none;
        }
        &:disabled {
          color: #73767A;
        }
      }
    }
  }
}

// 日付ピッカーのボーダー
::v-deep .searchContent_date_picker {
  &:has(input:focus) {
    border: 2px solid #E60021;
  }
}

.text-pc-base {
  font-size: 15px !important;
}

.c-select:after {
  top: 17px;
  width: 7px !important;
  height: 7px !important;
}

@media only screen and (max-width: 639px) {
  .text-sp-base {
    font-size: 13px !important;
  }

  .disabled {
    opacity: .5;
    pointer-events: none;
  }

  .search_tab {
    display: flex;
    overflow-x: scroll;
    background-color: #E7E7E7;
    border-radius: 6px 6px 0 0;

    &_item {
      padding: 0 !important;
      white-space: nowrap;
      flex-shrink: 0;
      padding: 14px 13px 12px 13px !important;
      font-size: 10px !important;
    }
  }

  // 国内宿泊施設
  .searchContent {
    /**
      エリア選択 
      */
    &_area {
      display: grid;
      gap: 6px;
      grid-template-columns: 1fr 1fr 1fr;
      margin-bottom: 10px;
      padding: 0 10px;
      &_item {
        position: relative;
        border: 1px solid #CACCCF;
        border-radius: 3px;
        background-color: white !important;
        &:has(> select:focus) {
          border: 2px solid #E60021;
        }
        select {
          width: 100%;
          font-size: 13px;
          padding: 10px 16px 8px 10px;
          background-color: white !important;
          outline: none;
        }
        &:before {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          right: 3px;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 4.5px;
          height: 4.5px;
          background-color: white;
          border-right: 1px solid #1F2021;
          border-bottom: 1px solid #1F2021;
        }
      }
    }
    /**
      フリー検索欄
     */
    &_free {
      width: 100%;
      margin-bottom: 10px;
      padding: 0 10px;
      &_wrap {
        border-radius: 3px;
        border: 1px solid #CACCCF;
        box-sizing: border-box;
        &:has(> input:focus) {
          border: 2px solid #e60021;
        }
      }
      &__input {
        width: 100%;
        border-radius: 3px;
        padding: 9px 10px;
        outline: none;
        &:focus {
          background-color: #FFF7F7;
        }
        &::placeholder {
          color: #73767A;
        }
      }
    }
    /**
      期間
     */
    &_date {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      padding: 8px 0 0;
      &_title {
        background-color: #E7E7E7;
        font-size: 10px;
        padding: 4px 10px;
        margin-left: -10px;
        margin-right: -10px;
      }
      &_picker {
        display: flex;
        align-items: center;
        margin-right: 10px;
        border: 1px solid #CACCCF;
        border-radius: 3px;
        height: 100%;
        &_wrapper {
          position: relative;
        }
        &_icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 17px;
          height: 17px;
          min-height: 17px;
          min-width: 17px;
        }
      }
      &_stays {
        display: flex;
        align-items: center;
        &__span {
          font-size: 13px;
          margin-right: 10px;
        }
        &__minus {
          margin-right: 8px;
          display: flex;
          align-items: center;
        }
        &__select {
          margin-right: 8px;
          padding: 10px 15px 7px;
          border: 1px solid #CACCCF;
          border-radius: 3px;
          font-size: 13px;
          background-color: white !important;
        }
        &__plus {
          display: flex;
          align-items: center;
        }
      }
    }
    /**
      部屋数
     */
    &_room {
      margin-bottom: 8px;
      padding: 8px 0 0;
      &_title {
        background-color: #E7E7E7;
        font-size: 10px;
        padding: 4px 10px;
        margin-left: -10px;
        margin-right: -10px;
      }
      &_num {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        &__minus {
          margin-right: 8px;
          display: flex;
          align-items: center;
        } 
        &__select {
          padding: 10px 15px 7px;
          margin-right: 8px;
          border: 1px solid #CACCCF;
          border-radius: 3px;
          font-size: 13px;
          background-color: white !important;
          outline: none;
          &:focus {
            border: 2px solid #E60021;
          }
        }
        &__plus {
          display: flex;
          align-items: center;
        }
      }
      &_subTitle {
        margin-bottom: 4px;
        font-size: 10px;
      }
      &_detail {
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 18px;
        &::before {
          content: '';
          position: absolute;
          height: 8px;
          width: 8px;
          top: 50%;
          left: 5px;
          border-bottom: 1px solid #73767A;
          border-left: 1px solid #73767A;
          transform: translate(-50%, -50%);
        }
        &_adult {
          display: flex;
          align-items: center;
          margin-right: 10px;
          p {
            font-size: 10px;
            font-weight: bold;
            margin-right: 8px;
            white-space: nowrap;
          }
          &__minus {
            margin-right: 8px;
            display: flex;
            align-items: center;
          } 
          &__select {
            padding: 10px 15px 7px;
            margin-right: 8px;
            border: 1px solid #CACCCF;
            border-radius: 3px;
            font-size: 13px;
            background-color: white !important;
          }
          &__plus {
            display: flex;
            align-items: center;
          }
        }
        &_child {
          display: flex;
          align-items: center;
          p {
            font-size: 10px;
            font-weight: bold;
            margin-right: 8px;
            white-space: nowrap;
          }
          &__select {
            border: 1px solid #CACCCF;
            border-radius: 3px;
            margin-right: 8px;
            &:has(input:focus) {
              border: 2px solid #E60021;
            }
            input {
              outline: none;
              border: none;
              padding: 10px 15px 7px;
              font-size: 13px;
            }
          }
        }
      }
    }
    /**
      部屋タイプ
     */
    &_type {
      display: flex;
      margin-bottom: 8px;
      padding: 8px 0 0;
      &_title {
        background-color: #E7E7E7;
        font-size: 10px;
        padding: 4px 10px;
        margin-left: -10px;
        margin-right: -10px;
      }
      &_item:not(:last-child) {
          margin-right: 32px;
      }
    }
    /**
      こだわり条件
     */
    &_more {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 6px;
      align-items: center;
      margin-bottom: 12px;
      padding: 8px 0 0;
      &_title {
        background-color: #E7E7E7;
        font-size: 10px;
        padding: 4px 10px;
        margin-left: -10px;
        margin-right: -10px;
      }
    }
    /**
      チェックボックス（共有：部屋タイプ・こだわり条件）
     */
    &_checkbox {
      &__label {
        display: flex;
        align-items: center;
      }
      &__box {
        position: relative;
        display: block;
        width: 20px;
        height: 20px;
        margin-right: 8px;
        border: 1px solid #CACCCF;
        border-radius: 3px;
        &::before {
          content: '';
          position: absolute;
          display: block;
          width: 13px;
          height: 9px;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          border-bottom: 2.5px solid #E60021;
          border-left: 2.5px solid #E60021;
          border-radius: 1.5px;
          opacity: 0;
        }
        &.isActive::before {
          opacity: 1;
        }
      }
      &__text {
        font-size: 13px;
      }
      &__img {
        display: flex;
        align-items: center;
      }
    }
  }

  .searchButton {
    margin: 0;
    padding: 0;
    border: none;
    button {
      width: 100% !important;
      text-align: center;
      padding-top: 9px;
      padding-bottom: 9px;
      border-radius: 3px;
      height: 37px;
      background-color: #E60021;
      div {
        margin: 0 auto;
        font-size: 13px;
        height: 13px;
      }
      svg {
        width: 13px;
        height: 13px;
      }
      span {
        line-height: 13px;
      }
    }
  }

  // 公共の宿
  .stayPublic {
    &_cat {
      gap: 6px;
      margin-bottom: 10px;
      &_item {
        &::after {
          top: 16px;
          right: 7px;
        }
        &_outer {
          border-radius: 3px;
        }
        &_select {
          width: 100%;
          padding: 9px 10px;
          font-size: 13px;
          text-overflow: clip;
          border-radius: 3px;
        }
      }
    }
  }

  .text-sp-base {
    font-size: 13px !important;
  }

  .search-text-group {
    margin-bottom: 10px;
    input {
      &.c-stay-search-input {
        max-height: 37px;
      }
    }
  }
  .c-input.c-input--group.search-text-group.stayPublic_free_cont {
      margin-bottom: 0;
  }

  .content {
    &_button {
      svg {
        width: 22px !important;
        height: 22px !important;
      }
    }
  }

  .text-sp-base {
    font-size: 13px !important;
  }

  .px-2 {
    padding-right: 9px !important;
    padding-left: 9px !important;
  }
}
</style>
