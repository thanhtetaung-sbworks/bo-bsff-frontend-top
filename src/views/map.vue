<template>
  <div id="map-cpn" ref="map-cpn">
    <div class="map-wrapper" v-bind:style="mapWrapperStyle">
      <DynamicMap
        v-bind:isSizeSm="isSizeSm"
        v-bind:address="address"
        v-bind:language="language"
        v-bind:loginFlag="loginFlag"
        v-bind:priceDiv="priceDiv"
        v-bind:crmFlag="crmFlag"
        v-bind:ssoSubscriptionId="ssoSubscriptionId"
        v-on:map-components-load-finished="$_handleResize"
        v-on:map-request-go-menu-detail="$_showCuponDetail"
      >
      </DynamicMap>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import DynamicMap from "@/components/map-components/DynamicMap.vue";

export default {
  components: {
    DynamicMap
  },
  mounted: function () {
    const onResize = _.debounce(this.$_handleResize, 100);
    window.addEventListener("resize", onResize);
    this.$once("hook:beforeDestroy", function () {
      window.removeEventListener("resize", onResize);
    });
  },
  data: function () {
    return {
      isSizeSm: false,
      //address: "東京都千代田区学士会館",
      address: "",
      loginFlag: true,
      //loginFlag: false,
      language: "ja",
      ssoSubscriptionId: "00000000",
      priceDiv: 10,
      crmFlag: "0"
    };
  },
  created() {
    this.getAuthData();
  },
  computed: {
    mapWrapperStyle: function () {
      var headerHeight = this.isSizeSm ? "0" : "40";
      return {
        height: `calc(105vh - ${headerHeight}px - 96px - 40px - 32px)`
      };
    }
  },
  methods: {
    /**
     * リサイズハンドラ。dynamic-mapのサイズを確定させる
     */
    $_handleResize: function () {
      const appSize = this.$_getRefSize("map-cpn");
      //ブレークポイントを640pxと仮決め
      this.isSizeSm = appSize.width < 1024;
    },
    $_getRefSize: function (refName) {
      const size = {
        height: 0,
        width: 0
      };
      let ref = this.$refs[refName];
      if (!ref) {
        return size;
      }
      if ("$el" in ref) {
        ref = ref.$el;
      }
      size.height = ref.offsetHeight;
      size.width = ref.offsetWidth;
      return size;
    },
    $_changeLang: function () {
      if (this.language === "ja") {
        this.language = "en";
      } else {
        this.language = "ja";
      }
    },
    $_showCuponDetail: function (
      catLrgClassCd,
      catMidClassCd,
      catSmlClassCd,
      menuNo
    ) {
      const url = process.env.VUE_APP_LIFE_DOMAIN + `/menus/catExl=null/catLrg=${catLrgClassCd}/catMid=${catMidClassCd}/catSml=${catSmlClassCd}/menuNo=${menuNo}/plans`;
      window.location.href = url
    },
    async getAuthData() {
      const authData = await this.$repositories("user").postUser();
      if (authData.isError) {
        return;
      }
      if (authData.data) {
        this.ssoSubscriptionId = authData.data.ssoSubscriptionId || "00000000";
        this.priceDiv = authData.data.priceDiv || 10;
        this.crmFlag = authData.data.crmFlag || "0";
      }
    }
  }
};
</script>

<style scoded>
.home {
  background-color: "#cdcdcd";
}
.n-card {
  max-width: 300px;
}
#map-cpn {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#map-cpn header {
  box-sizing: border-box;
  text-align: center;
  vertical-align: middle;
  height: 40px;
  padding: 5px;
}

.map-wrapper {
  box-sizing: border-box;
}

.breadcrumb {
  display: none !important;
}

.header {
  background-color: #ffffff;
}
</style>
