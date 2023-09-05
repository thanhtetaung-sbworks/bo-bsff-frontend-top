<template>
  <div class="component modal" v-on:click="$_onClickModal">
    <slot name="header" class="header" v-on:map-components-notify-to-up-to-modal="$_contentEvent"></slot>
    <slot name="content" class="content" v-on:map-components-notify-to-up-to-modal="$_contentEvent"></slot>
    <slot name="footer" class="footer" v-on:map-components-notify-to-up-to-modal="$_contentEvent"></slot>
  </div>
</template>

<script>
export default {
  name: "UpToModal",
  props: {
  },
  data: function() {
    return {

    };
  },
  mounted: function() {
    /** 各スロットのイベントをListenする */
    this.$children.forEach((child) => {
      child.$on("map-components-notify-to-up-to-modal", (value) => {
        this.$_notifyFromChild(value);
      });
    });
  },
  methods: {
    /**
     * 各スロットから{map-components-notify-from-up-to-modal}のイベントを受けた際の処理。
     *
     * @param value スロットから上位コンポーネントに通知する値
     */
    $_notifyFromChild: function(value) {
      this.$emit("map-components-notify-from-up-to-modal", value);
    },
    $_onClickModal: function(event) {
      if(event.target.classList.contains("modal")) {
        this.$emit("map-components-notify-from-up-to-modal", "map-components-menu-search-if-sm-close");
      }
    },
  },
}
</script>

<style scoped>
  .component {
    position: fixed !important;
    width: 100%;
    bottom: 0;
    z-index: 9000;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 16px 16px 0px 0px;
  }

</style>
