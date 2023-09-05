<template>
  <div class="component" v-bind:class="sizeSmClass" v-bind:style="styleObject.component()">

    <!-- このエリアで再検索ボタン -->
    <div v-if="isSizeSm" class="reload-by-area-wrapper" v-on:click="$_reloadByArea" v-bind:class="enableReloadByAreaClass"
      v-on:mouseover="iconCurrent.reloadButton = icon.reloadButtonHover"
      v-on:mouseleave="iconCurrent.reloadButton = icon.reloadButton">
      <img class="reload-by-area-wrapper-button" v-bind:src="iconCurrent.reloadButton">
      <p class="reload-by-area-wrapper-text">このエリアで再検索</p>
    </div>

    <!-- 上部コントロール群 -->
    <div class="top-button-wapper">
      <!-- ジオコーディングボタン（PC） -->
      <div class="search-location" v-if="!isSizeSm">
        <search-location
          v-bind:isSizeSm="isSizeSm"
          v-on:map-components-geocode-success="onGeocodeSuccess"
          v-on:map-components-geocode-fail="onGeocodeFail">
        </search-location>
      </div>

      <!-- このエリアで再検索ボタン -->
      <div class="reload-by-area-wrapper" v-on:click="$_reloadByArea" v-bind:class="enableReloadByAreaClass"
        v-on:mouseover="iconCurrent.reloadButton = icon.reloadButtonHover"
        v-on:mouseleave="iconCurrent.reloadButton = icon.reloadButton">
        <img class="reload-by-area-wrapper-button" v-bind:src="iconCurrent.reloadButton">
        <p class="reload-by-area-wrapper-text">このエリアで再検索</p>
      </div>

      <!-- 一覧表示ボタンと地図コントロール -->
      <div class="list-button-and-control-wrapper">
        <!-- 一覧表示ボタン -->
        <div class="list-button-wrapper" v-on:click="$_showMenuList"
          v-on:mouseover="iconCurrent.showListButton = icon.showListButtonHover"
          v-on:mouseleave="iconCurrent.showListButton = icon.showListButton">
          <img class="list-button-wrapper-button" v-bind:src="iconCurrent.showListButton">
          <p class="list-button-wrapper-text">一覧表示</p>
        </div>
        <!-- 地図コントロール -->
        <div class="custom-control-panel" v-bind:style="controlStyleObject">
          <div class="map-control-wrapper">
            <div class="zoom-in-out-wrapper">
              <img class="zoom-in-button"
                v-on:click="$_onClickZoomIn"
                v-on:mouseover="iconCurrent.plusButton = icon.plusButtonHover"
                v-on:mouseleave="iconCurrent.plusButton = icon.plusButton"
                v-bind:src="iconCurrent.plusButton" />
              <div class="devider"></div>
              <img class="zoom-out-button"
                v-on:click="$_onClickZoomOut"
                v-on:mouseover="iconCurrent.minusButton = icon.minusButtonHover"
                v-on:mouseleave="iconCurrent.minusButton = icon.minusButton"
                v-bind:src="iconCurrent.minusButton" />
            </div>
            <img class="current-location-button" v-on:click="$_onClickCurrentLocation"
              v-on:mouseover="iconCurrent.currentLocationButton = icon.currentLocationButtonHover"
              v-on:mouseleave="iconCurrent.currentLocationButton = icon.currentLocationButton"
              v-bind:src="iconCurrent.currentLocationButton" />
          </div>
        </div>
      </div>

    </div><!-- /上部コントロール群 -->

    <!-- 地図 -->
    <div
      v-bind:id="id"
      v-bind:style="styleObject.map()">
    </div>

    <!-- 下部オブジェクトリスト -->
    <slot name="object-list"></slot>
  </div>
</template>


<script type="text/javascript">
import Vue from "vue";
import Const from "@/components/map-components/common/const.js";
import * as common from "@/components/map-components/common/common.js";
import * as api from "@/components/map-components/common/api.js";
import FacilityMenu from "@/components/map-components/model/facilityMenu.js";
import ClusterMarker from "@/components/map-components/model/clusterMarker.js";
import SearchLocation from "@/components/map-components/SearchLocation.vue";

const plusButton = require('@/assets/map-components/plus-button.svg');
const plusButtonHover = require('@/assets/map-components/plus-button-hover.svg');
const minusButton = require('@/assets/map-components/minus-button.svg');
const minusButtonHover = require('@/assets/map-components/minus-button-hover.svg');
const currentLocationButton = require('@/assets/map-components/current-location-button.svg');
const currentLocationButtonHover = require('@/assets/map-components/current-location-button-hover.svg');
const reloadButton = require('@/assets/map-components/reload.svg');
const reloadButtonHover = require('@/assets/map-components/reload-hover.svg');
const showListButton = require('@/assets/map-components/sm-show-list.svg');
const showListButtonHover = require('@/assets/map-components/sm-show-list-hover.svg');
const clusterIcon = require('@/assets/map-components/cluster-icon.png');

export default {
  components: { SearchLocation },
  name: 'BaseMap',
  props: {
    zoomLevel: {
      type: Number,
      default: Const.MAP_DEFAULT_ZOOM,
    },
    mapTypeId: {
      type: String,
      default: "roadmap",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    isSizeSm: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      default: "",
    },
    menuList: {
      type: Array,
      default: function() {
        return [];
      },
    },
    language: {
      type: String,
      default: "ja",
    },
  },
  data: function() {
    return {
      google: null,
      map: null,
      isMapInit: false,
      id: "map-component-base-map",
      latLng: null,
      /** 最後にマーカーを作成した際（or 検索）のcenter */
      lastCenter: null,
      facilityMenuList: [],
      selectedFacilityMenu: null,
      /** 大カテゴリごとのアイコンの格納場所 */
      categoryIconList: [],
      /** クラスターアイコンの格納場所 */
      clusterIcon: {},
      /** アイコンNoごとのアイコンのアンカー位置・画像URLの定義 */
      iconDefinitionList: [],
      /** クラスター対象のリスト */
      clusterMarkerList: [],
      /** 表示中のマーカー */
      markers: [],
      marker: {
        sizePc: {
          normal: {
            width: 40,
            height: 40,
            icon: null,
          },
          selected: {
            width: 56,
            height: 56,
            icon: null,
          },
        },
        sizeSm: {
          normal: {
            width: 56,
            height: 56,
            icon: null,
          },
          selected: {
            width: 80,
            height: 80,
            icon: null,
          },
        }
      },
      iconCurrent: {
        /** 現在のプラスボタン */
        plusButton: plusButton,
        /** 現在のマイナスボタン */
        minusButton: minusButton,
        /** 現在の現在地ボタン */
        currentLocationButton: currentLocationButton,
        /** 現在の再検索ボタン */
        reloadButton: reloadButton,
        /** 現在の一覧表示ボタン */
        showListButton: showListButton,
      },
      /** アイコン保管オブジェクト */
      icon: {
        plusButton: plusButton,
        plusButtonHover: plusButtonHover,
        minusButton: minusButton,
        minusButtonHover: minusButtonHover,
        currentLocationButton: currentLocationButton,
        currentLocationButtonHover: currentLocationButtonHover,
        reloadButton: reloadButton,
        reloadButtonHover: reloadButtonHover,
        showListButton: showListButton,
        showListButtonHover: showListButtonHover,
      },
    };
  },
  computed: {
    styleObject: function() {
      const height = this.height;
      return {
        component: () => {
          return {
            width: "100%",
            height: height,
          }

        },
        map: () => {
          return {
            width: "auto",
            height: height,
          }
        },
      };
    },
    controlStyleObject: function() {
      return {
        //bottom: "20px"
      };
    },
    sizeSmClass: function() {
      return this.isSizeSm ? "size-sm" : "";
    },
    enableReloadByAreaClass: function() {
      if(!this.lastCenter) {
        return "disabled";
      }
      if(!this.map) {
        return "disabled";
      }
      if(this.lastCenter.equals(this.map.getCenter())) {
        return "disabled";
      }
      return "";
    }
  },
  watch: {
    address: async function(val) {
      if(val) {
        const latLng = await common.geocode(this.google, val);
        this.$_onFinishedGeocode(latLng);
      }
    },
    menuList: function(menuList) {
      //再検索されているので選択済みを解除する
      this.selectedFacilityMenu = null;
      this.facilityMenuList = common.menuList2FacilityMenuList(menuList);
      this.$_createMarkers(this.facilityMenuList, true);
    },
    isSizeSm: function() {
      this.$_createMarkers(this.facilityMenuList, true);
    },
    /**
     * 地図言語切り替え
     */
    language: async function(lang) {
      const zoom = this.map.getZoom();
      const center = this.map.getCenter();
      const centerObj = { lat: 1 * center.lat(), lng: 1 * center.lng() };

      window.google = null;
      this.google = await common.initGoogle({
        language: lang,
      });

      this.map = this.$_createMap(centerObj, zoom);
      this.$_createMarkers(this.facilityMenuList, false);
    },
  },
  mounted: async function() {
    let res = await api.getCategoryIcon();
    this.categoryIconList = res.categoryIconList;
    res = await api.getIconDefinition();
    this.iconDefinitionList = res.customIconList;
    this.google = await common.getGoogle();
    if(this.address) {
      const latLng = await common.geocode(this.google, this.address);
      this.$_onFinishedGeocode(latLng);
    } else {
      const currentPositionResult = await common.getCurrentDevicePosition();
      if(!currentPositionResult.success) {
        this.$emit("map-components-get-current-position-fail", currentPositionResult.error);
      }
      this.$_onFinishedGeocode(currentPositionResult);
    }

    await Promise.all(this.$_createIconImage());
    if (this.map == null) {
      this.$nextTick(function() {
        this.$_loadMap();
      });
    }
  },
  methods: {
    /**
     * カテゴリアイコン一覧を取得する
     */
    getCategoryIconList: function() {
      return this.categoryIconList;
    },
    /**
     * デフォルト初期中心点に戻す
     */
    setDefaultCenter: async function() {
      if(!this.google) {
        return;
      }
      const latLng = await common.geocode(this.google, this.address);
      this.$_onFinishedGeocode(latLng);
    },
    /**
     * デフォルトズームレベルに戻す
     */
    setDefaultZoom: function() {
      this.map.setZoom(this.zoomLevel);
    },
    /**
     * 地図中心点の取得
     */
    getCenter: function() {
      if(this.map == null) {
        return;
      }
      const center = this.map.getCenter();
      return { lat: center.lat(), lng: center.lng() };
    },
    /**
     * GoogleMaps初期化
     *
     */
    $_loadMap: function() {
      const center = new this.google.maps.LatLng(this.latLng.lat, this.latLng.lng);

      // googleMap
      this.map = this.$_createMap(center, this.zoomLevel);

      this.isMapInit = true;
      this.$_createMarkers(this.facilityMenuList, true);
      this.$emit("map-components-load-finished");
    },
    $_createMap: function(center, zoom) {
      return new this.google.maps.Map(document.getElementById(this.id), {
        //zoomControl: true,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        center: center,
        scaleControl: false,
        zoom: zoom,
        mapTypeId: this.mapTypeId,
        gestureHandling: "greedy",
        clickableIcons: false,
        keyboardShortcuts: false,
      });
    },
    $_onFinishedGeocode: function(latLng) {
      if(latLng.success) {
        this.latLng = latLng;
        if(this.map) {
          this.onGeocodeSuccess(latLng);
        }
      } else {
        if(!this.latLng || typeof this.latLng.lat === "undefined" || typeof this.latLng.lng === "undefined") {
          //失敗時でかつ初期緯度経度がない場合
          this.latLng = {
            lat: parseFloat(Const.MAP_ERROR_CENTER_LAT),
            lng: parseFloat(Const.MAP_ERROR_CENTER_LNG)
          };
        }
      }
    },
    /**
     * 施設リストから緯度経度範囲を取得
     */
    $_getBoundsByFacilityMenuList: function(facilityMenuList) {
      let bounds = new this.google.maps.LatLngBounds();
      facilityMenuList.forEach((facilityMenu) => {
        bounds.extend({lat: facilityMenu.facility.latitude, lng: facilityMenu.facility.longitude});
      });
      return bounds;
    },
    /**
     * iconイメージの作成Promiseのリストを返却する
     * @return {Promise[]}
     */
    $_createIconImage: function() {
      const promises = [];
      //カテゴリごとにイメージ作成
      this.categoryIconList.forEach((categoryIcon) => {
        categoryIcon.icon = {
          sizeSm: {
            normal: null,
            selected: null,
          },
          sizePc: {
            normal: null,
            selected: null,
          },
        };
        const normalIcondefinition = this.iconDefinitionList.find((iconDefinition) => {
          return categoryIcon.iconNo == iconDefinition.no;
        });
        const selectedIcondefinition = this.iconDefinitionList.find((iconDefinition) => {
          return categoryIcon.selectedIconNo == iconDefinition.no;
        });

        promises.push(this.$_createIconImageByType("normal", true, normalIcondefinition, categoryIcon));
        promises.push(this.$_createIconImageByType("normal", false, normalIcondefinition, categoryIcon));
        promises.push(this.$_createIconImageByType("selected", true, selectedIcondefinition, categoryIcon));
        promises.push(this.$_createIconImageByType("selected", false, selectedIcondefinition, categoryIcon));
      });

      // クラスター用のアイコン作成
      const clusterIconDefinition = {
        anchorX: -20,
        anchorY: -40,
        iconUrl: clusterIcon,
      };
      this.clusterIcon.icon = {
        sizeSm: {
          normal: null,
          selected: null,
        },
        sizePc: {
          normal: null,
          selected: null,
        },
      };
      promises.push(this.$_createIconImageByType("normal", false, clusterIconDefinition, this.clusterIcon));
      promises.push(this.$_createIconImageByType("normal", true, clusterIconDefinition, this.clusterIcon));

      return promises;
    },
    /**
     * タイプ別のiconイメージの作成
     */
    $_createIconImageByType: function(type, isSizeSm, iconDefinition, categoryIcon) {
      const img = new Image();
      return new Promise((resolve) => {
        let width, height;
        let sizeType = isSizeSm ? "sizeSm" : "sizePc"
        img.src = iconDefinition.iconUrl;
        //定義からサイズを取得（PC/スマホ・選択状態により異なる）
        width = this.marker[sizeType][type].width;
        height = this.marker[sizeType][type].height;
        const originOffset = {
          x: iconDefinition.anchorX,
          y: iconDefinition.anchorY,
        };
        img.onload = (event) => {
          //safariの場合はevent.targetを使う
          const imgObj = event.path ? event.path[0] : event.target;
          const originWidth = imgObj.width;
          const originHeight = imgObj.height;
          const anchorX = (originOffset.x + originWidth) * (width / originWidth);
          const anchorY = (originHeight - (originOffset.y + originHeight)) * (height / originHeight);
          //マーカーのサイズを取得
          const icon = {
            url: img.src,
            scaledSize: new this.google.maps.Size(width, height),
            // The origin for this image
            origin: new this.google.maps.Point(0, 0),
            anchor: new this.google.maps.Point(
              //オフセットの調整（オフセット値は左下を0,0として設定されている）
              // (originOffset.x / originWidth) * width,
              // ((originHeight - originOffset.y) / originHeight) * height),
              anchorX,
              anchorY
            ),
            labelOrigin: isSizeSm ? new this.google.maps.Point(anchorX, anchorY/2 - 5) : new this.google.maps.Point(anchorX, anchorY/2 - 3),
          };
          categoryIcon.icon[sizeType][type] = icon;
          resolve();
        };
      });
    },
    /**
     * マーカーの作成
     * @param list Array<FacilityMenu>
     */
    $_createMarkers: function(list, fitBounds) {
      console.log("list, %o", list)
      if(!this.isMapInit) {
        return;
      }
      if(this.markers != null && this.markers.length !== 0) {
        this.markers.forEach(m => {
          m.setMap(null);
        });
      }
      this.markers = [];
      this.clusterMarkerList.forEach((clusterMarker) => {
        clusterMarker.removeAssociated();
        clusterMarker = null;
      });
      this.clusterMarkerList = [];

      if (!list || list.length === 0 ) {
        //作成対象がなければ終了
        return;
      }
      const sizeType = this.isSizeSm ? "sizeSm" : "sizePc";
      list.forEach(item => {
        const facilityMenu = Vue.util.extend({}, item);
        const position = new this.google.maps.LatLng(facilityMenu.facility.latitude, facilityMenu.facility.longitude);
        let selectedStatus = false;
        if(this.selectedFacilityMenu && FacilityMenu.isEquals(this.selectedFacilityMenu, facilityMenu)) {
          selectedStatus = true;
        }
        //メニューの大カテゴリコードからカテゴリ定義を引当て
        const foundCategoryIcon = this.categoryIconList.find((categoryIcon) => {
          return categoryIcon.catLrgClassCd == facilityMenu.menu.categoryInfomation.catLrgClassCd;
        });
        if(!foundCategoryIcon) { return; }
        const icon = foundCategoryIcon.icon[sizeType][selectedStatus ? "selected" : "normal"];

        //マーカーを生成
        const marker = new this.google.maps.Marker({
          map: this.map,
          icon: icon,
          position: position,
        });
        marker.selected = selectedStatus;
        marker.facilityMenu = facilityMenu;
        marker.iconDefinition = foundCategoryIcon;
        marker.originPosition = {
          lat: marker.position.lat(),
          lng: marker.position.lng(),
        };
        marker.originIcon = icon;
        marker.samePositionCount = 0;
        marker.clustered = false;
        marker.breakClusterPolyline = null;
        marker.addListener("click", () => {
          //クリック時のイベント
          this.$_clickMarkerHandler(marker);
        });

        marker.iconDefinition = foundCategoryIcon;
        this.markers.push(marker);
      });

      //近似緯度経度の場合、クラスター化する
      for(let i = 0; i < this.markers.length; i++) {
        const marker = this.markers[i];
        for(let j = i + 1; j < this.markers.length; j++) {
          const otherMarker = this.markers[j];
          //2マーカーの距離算出
          const distance = this.google.maps.geometry.spherical.computeDistanceBetween(
              new this.google.maps.LatLng(marker.facilityMenu.facility.latitude, marker.facilityMenu.facility.longitude),
              new this.google.maps.LatLng(otherMarker.facilityMenu.facility.latitude, otherMarker.facilityMenu.facility.longitude));
          if(distance > Const.MAP_CLUSTER_METER) {
            //クラスター化対象外
            continue;
          }
          let clusterIndex = typeof marker.clusterIndex !== "undefined" ? marker.clusterIndex : otherMarker.clusterIndex;
          if(typeof clusterIndex !== "undefined") {
            this.clusterMarkerList[clusterIndex].addContainedMarker(marker);
            this.clusterMarkerList[clusterIndex].addContainedMarker(otherMarker);
            marker.clusterIndex = clusterIndex;
            otherMarker.clusterIndex = clusterIndex;
          } else {
            const clusterMarker = new ClusterMarker({
              delegate: this,
              google: this.google,
              map: this.map,
              icon: this.clusterIcon.icon[sizeType]["normal"],
            });
            clusterMarker.addContainedMarker(marker);
            clusterMarker.addContainedMarker(otherMarker);
            this.clusterMarkerList.push(clusterMarker);
            marker.clusterIndex = this.clusterMarkerList.length - 1;
            otherMarker.clusterIndex = this.clusterMarkerList.length - 1;
          }
        }
      }

      this.markers.forEach(marker => {
        if(typeof marker.clusterIndex !== "undefined") {
          marker.setVisible(false);
        }
      });

      this.clusterMarkerList.forEach(clusterMarker => {
        clusterMarker.setVisible(true);
      });

      const bounds = this.$_getBoundsByFacilityMenuList(list);
      if(fitBounds) {
        this.map.fitBounds(bounds);
        this.lastCenter = this.map.getCenter();
      }
    },
    /**
     * マーカークリック時のハンドラー
     */
    $_clickMarkerHandler: function(marker) {

      // 選択したマーカーが現在クラスター化解除しているマーカー群に該当しなければ、再クラスター化させる
      this.clusterMarkerList.forEach((clusterMarker) => {
        if(!clusterMarker.markerIsContained(marker)) {
          // 再クラスター化する
          clusterMarker.toClusteredIfNotClusterd();
        }
      });

      // クリックした施設の強調表示
      this.selectedFacilityMenu = marker.facilityMenu;
      this.$_resetAllMarker2NormalIcon();
      this.$_changeMarkerSelectedStatus(marker, !marker.selected, this.isSizeSm ? "sizeSm" : "sizePc");
    },
    /**
     * マーカーの選択状態を切り替える
     */
    $_changeMarkerSelectedStatus: function(marker, toSelected, sizeType) {
      if(toSelected) {
        marker.setIcon(marker.iconDefinition.icon[sizeType].selected);
        this.$emit("map-components-marker-selected", marker.facilityMenu);
      } else {
        marker.setIcon(marker.iconDefinition.icon[sizeType].normal);
        this.$emit("map-components-marker-unSelected");
      }
      marker.selected = toSelected;
    },
    /**
     * 全てのマーカーの選択状態を未選択状態にする
     */
    $_resetAllMarker2NormalIcon: function() {
      this.markers.forEach((marker) => {
        if(marker.selected) {
          this.$_changeMarkerSelectedStatus(marker, false, (this.isSizeSm ? "sizeSm" : "sizePc"));
        }
      });
    },
    /**
     * delegateメソッド
     * 同じ位置にマーカーが存在する場合、位置を微調整して返却する
     */
    adjustFromOtherMarkers: function(latLon) {
      return this.$_fixIfExistSameLatlonMarker(latLon);
    },
    /**
     * delegateメソッド
     * クラスターマーカーがクリックされた場合、他のクラスターマーカーを再クラスター化する
     */
    onClickClusterMarker: function(clickedClusterMarker) {
      this.clusterMarkerList.forEach((clusterMarker) => {
        if(clickedClusterMarker !== clusterMarker.marker) {
          clusterMarker.toClusteredIfNotClusterd();
        }
      });
    },
    /**
     * delegateメソッド
     * 対象の包含マーカーを非選択状態にする
     */
    nuSelectContainedMarker: function(containedMarker) {
      if(containedMarker.selected) {
        this.$_changeMarkerSelectedStatus(containedMarker, false, (this.isSizeSm ? "sizeSm" : "sizePc"));
      }
    },
    /**
     * 同じ位置にマーカーが存在する場合、位置を微調整して返却する
     */
    $_fixIfExistSameLatlonMarker: function(latLon) {
      let existSameLatLonCnt = 0;
      this.markers.forEach((marker) => {
        if(latLon.lat === marker.originPosition.lat && latLon.lon === marker.originPosition.lon) {
          existSameLatLonCnt++;
        }
      });
      this.clusterMarkerList.forEach((clusterMarker) => {
        const clusterPosition = clusterMarker.marker.getPosition();
        if(latLon.lat === clusterPosition.lat() && latLon.lon === clusterPosition.lon()) {
          existSameLatLonCnt++;
        }
      });
      if(existSameLatLonCnt > 0) {
        //同じ位置にマーカーが存在するため位置を微調整
        latLon = {
          lat: latLon.lat + 0.0001,
          lon: latLon.lon + 0.0001,
        };
        return this.$_fixIfExistSameLatlonMarker(latLon)
      }
      return latLon;
    },
    /**
     * このエリアで再検索
     */
    $_reloadByArea: function() {
      if(this.enableReloadByAreaClass == "disabled") {
        return;
      }
      this.$emit("map-components-search-by-this-area");
    },
    /**
     * メニュ一覧表示
     */
    $_showMenuList: function() {
      this.$emit("map-components-show-menu-detail");
    },
    /**
     * ズームインボタンクリック（地図コントロール）
     *
     * @param イベントオブジェクト
     */
    $_onClickZoomIn: function(event) {
      this.map.setZoom(this.map.getZoom() + 1);
    },
    /**
     * ズームアウトボタンクリック（地図コントロール）
     *
     * @param イベントオブジェクト
     */
    $_onClickZoomOut: function(event) {
      this.map.setZoom(this.map.getZoom() - 1);
    },
    /**
     * 現在地ボタンクリック（地図コントロール）
     *
     * @param イベントオブジェクト
     */
    $_onClickCurrentLocation: function(event) {
      common.getCurrentDevicePosition().then((result) => {
        if(!result.success) {
          console.log("位置情報の取得失敗", result);
          this.$emit("map-components-get-current-position-fail", result.error);
          if(event.callback) {
            event.callback();
          }
          return;
        }

        console.log("位置情報の取得成功", result)
        this.map.setCenter(new this.google.maps.LatLng(result.lat, result.lng));
        if(event.callback) {
          event.callback();
        }
      });
    },
    /**
     * ジオコード成功時処理
     *
     * @param イベントオブジェクト
     */
    onGeocodeSuccess: function(latLng) {
      this.map.setCenter(latLng);
    },
    /**
     * ジオコード失敗時処理
     *
     * @param イベントオブジェクト
     */
    onGeocodeFail: function(result) {
      this.$emit("map-components-geocode-fail", result);
    },
    setLastCenter: function(lastCenter) {
      this.lastCenter = lastCenter;
    },
  },
}


</script>

<style scoped>
.component {
  position: relative;
}

/** 上部ボタンのラッパー */
.top-button-wapper {
  position: relative;
  z-index: 6000;
  top: 10px;
}

/* 住所検索 */
.search-location {
  position:absolute;
  left: 40px;
}

/** このエリアで再検索 */
.reload-by-area-wrapper {
  position: absolute;
  background-color: #ffffff;
  box-sizing: border-box;
  width: 240px;
  height: 40px;
  left: calc(50% - 120px);
  padding: 5px;
  vertical-align: middle;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: solid 1px #eeeeee;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  cursor: pointer;
}
.size-sm .reload-by-area-wrapper {
  top: 60px;
}

.reload-by-area-wrapper-button {
  width: 18px;
  height: 18px;
  margin-left: 5px;
}
.reload-by-area-wrapper-text {
  margin: 0;
  margin-left: 15px;
  flex-basis: 190px;
  font-weight: bold;
}
.disabled.reload-by-area-wrapper {
  cursor: not-allowed;
  /* opacity: 50%; */
  background-color: #eee;
  color: gray;
}
.disabled.reload-by-area-wrapper .reload-by-area-wrapper-button {
  opacity: 60%;
}

/** 一覧表示ボタンと地図コントロールのラッパー */
.list-button-and-control-wrapper {
  position: absolute;
  display: flex;
  right: 10px;
  pointer-events: none;
}

/** 一覧表示ボタンラッパー */
.list-button-wrapper {
  display: flex;
  background-color: #ffffff;
  box-sizing: border-box;
  width: 100px;
  height: 30px;
  padding: 5px;
  margin-right: 10px;
  vertical-align: middle;
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: solid 1px #eeeeee;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  cursor: pointer;
  pointer-events: auto;
}
.list-button-wrapper-button {
  width: 20px;
}
.list-button-wrapper-text {
  margin: 0;
  margin-left: 10px;
  flex-basis: 70px;
  font-size: 12px;
}


/** 地図コントロール */
.custom-control-panel,
.custom-control-panel * {
  box-sizing: border-box;
}
.custom-control-panel img {
  display: block;
  cursor: pointer;
}
.custom-control-panel .zoom-in-out-wrapper {
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  border-radius: 2px;
  background-color: #ffffff;
}
.custom-control-panel .zoom-in-out-wrapper img {
  width: 40px;
  height: 40px;
}
.custom-control-panel .current-location-button {
  width: 32px;
  height: 32px;
  margin-top: 20px;
  margin-left: 4px;
  padding: 6px;
  position: relative;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
}
.custom-control-panel .devider {
  border-bottom: rgb(230, 230, 230) solid 1px;
  position: absolute;
  overflow: hidden;
  margin: 0 5px;
  width: 30px;
  height: 1px;
}
/** スマホサイズ時の地図コントロール位置 */
.size-sm .map-control-wrapper {
  position: absolute;
  top: 60px;
  right: 0;
}

.zoom-in-button,
.zoom-out-button,
.current-location-button {
  pointer-events: auto;
}

</style>
