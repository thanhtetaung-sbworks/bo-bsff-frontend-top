<template>
  <div class="component">
    <div class="slider-container" ref="slider-container" v-on:touchmove="$_onTouchmove" v-on:touchend="$_onTouchend">

      <div class="slider-wrapper" v-bind:style="wrapperStyle" v-on:mousedown="$_onMousedown" v-on:touchstart="$_onTouchstart">
        <div class="slider-content"
            v-for="(facilityMenu, index) in facilityMenuList" v-bind:key="`${uuid + '-' + index}`" v-bind:index="index"
            v-on:click="$_showDetail(`${index}`)">
          <basic-menu
            v-bind:isSizeSm="isSizeSm"
            v-bind:facilityMenu="facilityMenu"
            v-bind:index="index"
            ref="slide"></basic-menu>
        </div>
      </div>

      <div class="button-wrapper" v-if="!isSizeSm">
        <img class="plus-button" v-on:click="$_scrollSlide(false)" v-bind:src="iconCurrent.plusButton"
          v-on:mouseover="iconCurrent.plusButton = icon.ltButtonHover"
          v-on:mouseleave="iconCurrent.plusButton = icon.ltButton"/>
        <img class="minus-button" v-on:click="$_scrollSlide(true)" v-bind:src="iconCurrent.minusButton"
          v-on:mouseover="iconCurrent.minusButton = icon.ltButtonHover"
          v-on:mouseleave="iconCurrent.minusButton = icon.ltButton"/>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";


import * as common from "@/components/map-components/common/common.js";
import * as api from "@/components/map-components/common/api.js";
import Menu from "@/components/map-components/model/menu.js";
import FacilityMenu from "@/components/map-components/model/facilityMenu.js";
import BasicMenu from "@/components/map-components/menu/BasicMenu.vue";

const ltButton = require('@/assets/map-components/lt.svg');
const ltButtonHover = require('@/assets/map-components/lt-hover.svg');

const componentId = "basic-menu-list";
let uuid = 0;
let slideStartX = 0;

export default {
  components: {
    BasicMenu
  },
  name: "BasicMenuList",
  props: {
    menuList: {
      type: Array,
      default: function() {
        return [];
      },
    },
    isSizeSm: {
      type: Boolean,
      default: false,
    },
  },
  data: function() {
    return {
      uuid: componentId + "-" + (uuid++).toString(),
      /** スライダーコンテナー自体の横幅 = 画面の横幅 */
      sliderContainerWidth: 0,
      isMousedown: false,
      /** X軸のオフセットにより施設の位置を調整。一番左の施設の中央が画面中央の場合0。右を表示する場合は数値をマイナスにする。 */
      slideOffsetX: 0,
      /** 距離順でソートされた施設リスト */
      facilityMenuList: [],
      /** スマホ版のタッチ開始のX軸位置（オフセットは考慮しない絶対値） */
      smStartX: 0,
      iconCurrent: {
        plusButton: ltButton,
        minusButton: ltButton,
      },
      icon: {
        ltButton: ltButton,
        ltButtonHover: ltButtonHover,
      },
      onMousemove: () => {}
    };
  },
  computed: {
    wrapperStyle: function() {
      return {
        transform: `translate3d(${this.slideOffsetX}px, 0px, 0px)`,
      };
    },
    getSliderWidth: function() {
      return this.isSizeSm ? BasicMenu.sizeSmComponentWidth : BasicMenu.componentWidth;
    },
  },
  watch: {
    menuList: function(menuList) {
      let facilityMenuList = common.menuList2FacilityMenuList(menuList);
      this.facilityMenuList = this.$_sortFacilityListByDistance(facilityMenuList);
      this.resize();
      this.$nextTick(() => {
        this.$_setCenterByIndex(0);
      });
    },
    isSizeSm: function(value) {
      this.resize();
    },
    sliderContainerWidth: function() {
      this.$_handleResize();
    },
  },
  mounted: function() {
    const onResize = _.debounce(this.$_handleResize, 100);
    window.addEventListener("resize", onResize);
    this.$once("hook:beforeDestroy", function() {
      window.removeEventListener("resize", onResize);
    });
    onResize();

    //PC用イベント設定
    this.onMousemove = _.throttle(this.$_onMousemove, 100);
    this.setUpPcEventHandler();
  },
  updated: function() {
  },
  methods: {
    setUpPcEventHandler: function() {
      window.addEventListener("mouseup", this.$_onMouseup);
      this.$once("hook:beforeDestroy", function() {
        window.removeEventListener("mouseup", this.$_onMouseup);
      });
      window.addEventListener("mousemove", this.onMousemove);
      this.$once("hook:beforeDestroy", function() {
        window.removeEventListener("mousemove", this.onMousemove);
      });
    },
    removePcEventHandler: function() {
      window.removeEventListener("mouseup", this.$_onMouseup);
      window.removeEventListener("mousemove", this.onMousemove);
    },
    /**
     * 1つのスライドを強調表示する
     */
    emphasizeSlide: function(facilityMenu) {
      //transition効果により遅延したリサイズイベント対策
      this.$_handleResize();
      if(!facilityMenu) {
        return;
      }
      const index = this.facilityMenuList.findIndex(item => {
        return FacilityMenu.isEquals(facilityMenu, item);
      });
      if(index === -1) {
        return;
      }
      //スライドを中央にする
      this.$_setCenterByIndex(index);
      if(this.$refs["slide"]) {
        this.$refs["slide"].forEach((basicMenu, i) => {
          basicMenu.setEmphasize(i === index);
        });
      }
    },
    /**
     * 強調状態をリセットする
     */
    resetEmphasizeSlides: function() {
      if(this.$refs["slide"]) {
        this.$refs["slide"].forEach((basicMenu, i) => {
          basicMenu.setEmphasize(false);
        });
      }
    },
    $_onTouchstart: function(event) {
      //カルーセルのドラッグ開始
      this.smStartX = event.touches[0].clientX;
      this.$_onMousedown({
        x: event.touches[0].clientX
      });
    },
    $_onTouchmove: function(event) {
      event.stopPropagation();
      event.preventDefault();
      this.$_onMousemove({
        x: event.touches[0].clientX
      });
    },
    $_onTouchend: function(event) {
      this.$_onMouseup(true, event);
    },
    $_onMousedown: function(event) {
      //transition効果により遅延したリサイズイベント対策
      this.$_handleResize();
      //カルーセルのドラッグ開始
      this.isMousedown = true;
      slideStartX = event.x;
    },
    $_onMouseup: function(isSm, event) {
      //カルーセルのドラッグ終了
      this.isMousedown = false;
      const emit = () => {
        this.$emit("map-components-menu-move", false);
      };
      setTimeout(function() {
        emit();
      }, 500);
      if(isSm === true) {
        //左右どちらにスワイプしたか
        const toRight = event.changedTouches[0].clientX - this.smStartX > 0;
        //終点の画面中央にスライドの画面中央が一番近いスライドを終点基準スライドとする。
        const centerDistanceList = [];
        for(let i = 0; i < this.facilityMenuList.length; i++) {
          //画面中央とスライド中央との距離
          const centerDistance = -this.slideOffsetX + (this.sliderContainerWidth / 2) - ((i + 0.5) * this.getSliderWidth);
          centerDistanceList.push(centerDistance);
        }
        let minDistance, minIndex;
        for(let i = 0; i < centerDistanceList.length; i++) {
          if(i === 0 || Math.abs(centerDistanceList[i]) < Math.abs(minDistance)) {
            minDistance = centerDistanceList[i];
            minIndex = i;
          }
        }
        if(toRight) {
          if(-minDistance > this.getSliderWidth / 4) {
            minIndex--;
          }
        } else {
          if(minDistance > this.getSliderWidth / 4) {
            minIndex++;
          }
        }
        this.$_setCenterByIndex(minIndex);
      } else {
        //画面からはみ出していた場合は戻す
        this.slideOffsetX = this.$_getScrollAdjustWidth(this.slideOffsetX);
      }
    },
    $_onMousemove: function(event) {
      if(this.isMousedown) {
        this.$emit("map-components-menu-move", true);
        this.slideOffsetX += event.x - slideStartX;
        slideStartX = event.x;
      }
    },
    /**
     * カルーセルを1つ移動する
     * @param isAhead 右に進む場合はtrue, 左に進む場合はfalse
     */
    $_scrollSlide: function(isAhead) {
      let offsetX = this.slideOffsetX + 0;
      if(isAhead) {
        offsetX += this.getSliderWidth;
      } else {
        offsetX -= this.getSliderWidth;
      }

      this.slideOffsetX = this.$_getScrollAdjustWidth(offsetX);
    },
    $_getScrollAdjustWidth: function(offsetX) {
      const max = this.sliderContainerWidth - this.getSliderWidth;
      const min = -this.getSliderWidth * (this.facilityMenuList.length - 1);
      if(offsetX < min) {
        //値が小さ過ぎる場合
        offsetX = min;
      } else if(offsetX > max) {
        //値が大きすぎる場合
        offsetX = max;
      }
      return offsetX
    },
    /**
     * index番号でスライドを中央に動かす
     */
    $_setCenterByIndex: function(index) {
      index = parseInt(index, 10);
      if(index < 0) {
        index = 0;
      } else if(index > this.facilityMenuList.length - 1) {
        index = this.facilityMenuList.length - 1;
      }

      this.slideOffsetX = this.$_getScrollAdjustWidth(
          (this.sliderContainerWidth / 2)
          - this.getSliderWidth * (index + 0.5)
      );
    },
    /**
     * 施設リストを距離でソート
     */
    $_sortFacilityListByDistance: function(facilityMenuList) {
      if(facilityMenuList === null || facilityMenuList.length === 0) {
        return facilityMenuList;
      }
      return facilityMenuList.sort((aFacilityMenu, bFacilityMenu) => {
        if(aFacilityMenu.facility === null || bFacilityMenu.facility === null ) {
          return 0;
        }
        const a = aFacilityMenu.facility.distance;
        const b = bFacilityMenu.facility.distance;
        if(a === null && b === null) {
          //お互いnullならaとb間のソートは変更しない
          return 0;
        }
        if(a === null) {
          return 1;
        } else if(b === null) {
          return -1;
        }

        return a - b;
      });
    },

    $_showDetail: function(index) {
      console.log("showDetail, %d", parseInt(index, 10))
      this.$emit("map-components-click-basic-menu", this.facilityMenuList[parseInt(index, 10)]);
    },
    /**
     * リサイズハンドラ（Public）
     */
    resize: function() {
      this.$nextTick(() => {
        this.$_handleResize();
      });
    },
    /**
     * リサイズハンドラ
     */
    $_handleResize: function() {
      const container = this.$_getRefSize("slider-container");
      this.sliderContainerWidth = container.width;
      //this.sliderContainerLeft = this.$refs["slider-container"].getBoundingClientRect().left;
      this.slideOffsetX = this.$_getScrollAdjustWidth(this.slideOffsetX);
    },
    $_getRefSize: function(refName) {
      const size = {
        height: 0,
        width: 0,
      };
      let ref = this.$refs[refName];
      if (!ref) {
        return size;
      }
      if("$el" in ref) {
        ref = ref.$el;
      }
      size.height = ref.offsetHeight;
      size.width = ref.offsetWidth;
      return size;
    },
  },
}
</script>


<style scoped>
.component
.component * {
  box-sizing: border-box;
}
.component {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.slider-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  pointer-events: none;
}

.slider-wrapper {
  box-sizing: border-box;
  position: relative;
  display: flex;
  transition-duration: 500ms;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  margin: 0;
  height: 100%;
  cursor: pointer;
  pointer-events: auto;
}

.slider-content {
  width: fit-content;
}

.button-wrapper {
  position: relative;
}
.button-wrapper > img {
  position: absolute;
  bottom: 100px;
  width: 40px;
  height: 40px;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  cursor: pointer;
}
.minus-button {
  left: 20px;
}
.plus-button {
  right: 20px;
  transform: scale(-1, 1);
}
.minus-button,
.plus-button {
  pointer-events: auto;
}
</style>
