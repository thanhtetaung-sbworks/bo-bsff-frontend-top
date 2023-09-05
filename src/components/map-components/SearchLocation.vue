<template>
  <div
    class="component"
    v-bind:class="`${sizeSmClass} ${componentDisabledClass}`"
  >
    <img id="location-icon" v-on:click="$_searchAddress"
      v-bind:src="currentButton"
      v-on:mouseover="currentButton = buttonHover"
      v-on:mouseleave="currentButton = button"
      >
    <input id="location-input" type="text" placeholder="東京駅"
      v-model="address"
      v-on:keyup.enter="$_searchAddress"
      v-bind:disabled="disabled"
    />
  </div>
</template>


<script type="text/javascript">
import * as common from "@/components/map-components/common/common.js";

const button = require('@/assets/map-components/trans-location-icon.svg');
const buttonHover = require('@/assets/map-components/trans-location-icon-hover.svg');

export default {
  name: 'SearchLocation',
  props: {
    width: {
      type: [String, Number],
      default: () => "100%",
    },
    height: {
      type: [String, Number],
      default: () => "100%",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isSizeSm: {
      type: Boolean,
      default: false,
    },
  },
  data: function() {
    return {
      google: null,
      address: "",
      currentButton: button,
      button: button,
      buttonHover: buttonHover,
    };
  },
  computed: {
    sizeSmClass: function() {
      return this.isSizeSm ? "size-sm" : "";
    },
    /**
     * 本コンポーネント自体がDisabledの場合のクラス
     */
    componentDisabledClass: function() {
      return this.disabled ? "component-disabled" : "";
    },
  },
  mounted: async function() {
     this.google = await common.getGoogle();
  },
  methods: {
    $_searchAddress: function() {
      if(this.disabled) {
        return;
      }
      if(!this.address || this.address.trim().length === 0) {
        return;
      }
      common.geocode(this.google, this.address)
        .then((result) => {
          if(result.success) {
            this.$_onGeocodeSuccess(result);
          } else {
            this.$_onGeocodeFail(result);
          }
        });
    },
    $_onGeocodeSuccess: function(result) {
      this.$emit("map-components-geocode-success", result);
    },
    $_onGeocodeFail: function(result) {
      this.$emit("map-components-geocode-fail", result);
    },
  },
}


</script>

<style scoped>
.component {
  position: relative;
  box-sizing: border-box;
  font-family: 'Noto Sans JP', sans-serif;
}
.component * {
  box-sizing: border-box;
}

#location-icon {
  position: absolute;
  top: 10px;
  left: 8px;
  cursor: pointer;
}
.component-disabled #location-icon {
  cursor: auto;
  opacity: 50%;
}

#location-input {
  height: 40px;
  width: 230px;
  border-radius: 8px;
  border: solid 1px #eeeeee;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  padding-left: 30px;
  background-color: #ffffff;
}
.size-sm #location-input {
  box-shadow: none;
  width: calc(100% - 5px);
  height: 36px;
}
.component-disabled #location-input {
  background-color: #eeeeee;
}

</style>
