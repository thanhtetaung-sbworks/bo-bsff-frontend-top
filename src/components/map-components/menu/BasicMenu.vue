<template>
  <div class="component" v-bind:class="emphasizeClass">
    <div v-if="isSizeSm" class="component-wrapper component-wrapper-sm">
      <img class="menu-image" v-bind:src="getMenuImage" />
      <div class="text-wrapper">
        <div class="category-wrapper">{{facilityMenu.menu.categoryInfomation.catSmlClassNm}}</div>
        <div class="menu-name">{{facilityMenu.menu.menuNm}}</div>
        <div class="facility-name">{{facilityMenu.facility.facilityNm}}</div>
      </div>
    </div>
    <div v-else class="component-wrapper component-wrapper-pc">
      <img class="menu-image" v-bind:src="getMenuImage" />
      <div class="category-wrapper">{{facilityMenu.menu.categoryInfomation.catSmlClassNm}}</div>
      <div class="text-wrapper">
        <div class="menu-name">{{facilityMenu.menu.menuNm}}</div>
        <div class="facility-name">{{facilityMenu.facility.facilityNm}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as common from "@/components/map-components/common/common.js";
import * as api from "@/components/map-components/common/api.js";
import Menu from "@/components/map-components/model/menu.js";

const componentWidth = 208;
const sizeSmComponentWidth = 296;

export default {
  componentWidth: componentWidth,
  sizeSmComponentWidth: sizeSmComponentWidth,
  components: { },
  name: "BasicMenu",
  props: {
    facilityMenu: {
      type: Object,
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
      emphasize: false,
    };
  },
  computed: {
    getMenuImage: function() {
      return this.facilityMenu.menu.getPriorityImageUrl();
    },
    emphasizeClass: function() {
      return this.emphasize ? "emphasize" : "";
    },
  },
  methods: {
    /**
     * 強調表示する
     */
    setEmphasize: function(isEmphasize) {
      this.emphasize = isEmphasize;
    },
  },
}
</script>


<style scoped>
.component
.component * {
  box-sizing: border-box;
  font-family: "Noto Sans JP";
}

.component {
  background: none;
  padding: 0 8px;
}

.component-wrapper {
  height: 100%;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  cursor: pointer;
}
.emphasize .component-wrapper {
  background: #FFF5E2;
  border: 1px solid #DA291C;
}
.component-wrapper-pc {
  width: 192px;
  height: 232px;
}
.component-wrapper-sm {
  width: 280px;
  height: 96px;
  display: flex;
  line-height: 100%;
  padding: 8px;
  justify-content: space-around;
  align-items: center;
}

.menu-image {
  display: block;
  width: auto;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  pointer-events: none;
  margin: 0 auto;
}
.component-wrapper-pc .menu-image {
  max-width: 160px;
  max-height: 120px;
}
.component-wrapper-sm .menu-image {
  max-width: 80px;
  max-height: 60px;
  margin: 0;
  margin-right: 12px;
}


.category-wrapper {
  /* display: inline-block; */
  background: #f4f5f6;
  color: #dd4237;
  padding: 4px;
  margin-top: 2px;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* width:100%; */
}
.component-wrapper-pc .category-wrapper {
  font-size: 12px;
  max-height: 18px;
}
.component-wrapper-sm .category-wrapper {
  font-size: 10px;
  max-height: 14px;
  margin-top: 0;
  padding: 1px;
}

.menu-name {
  /* margin-top: 16px; */
  font-size: 14px;
  line-height: 150%;
  user-select: none;
  pointer-events: none;
  max-height: 42px;
  overflow-y: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.component-wrapper-sm .menu-name {
  margin-top: 0;
}

.facility-name {
  margin-top: 10px;
  font-size: 12px;
  user-select: none;
  pointer-events: none;
  max-height: 39px;
  overflow-y: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.component-wrapper-sm .facility-name {
  margin-top: 4px;
}


</style>
