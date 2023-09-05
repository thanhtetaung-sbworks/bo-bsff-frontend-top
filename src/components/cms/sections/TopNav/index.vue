<template>
      <ul class="nav-tabs top-nav-tabs content_tabs">
        <li class="tab-item content_tab" :class="{active: activeId === 0}" @click="$emit('click-life')">
          <span class="tab-icon flex">
            <Icon name="life_service_icon" width="25" height="25" />
          </span>
          <span class="tab-text content_text">ライフ<br class="sm_block" />サービス</span>
        </li>
        <li class="tab-item content_tab" :class="{active: activeId === 1}" @click="$emit('click-eat')">
          <span class="tab-icon flex">
            <Icon name="travel_icon" width="24" height="24" />
          </span>
          <span class="tab-text content_text">トラベル</span>
        </li>
        <li class="tab-item content_tab" :class="{active: activeId === 2}" @click="$emit('click-shop')">
          <span class="tab-icon flex">
            <Icon name="shop_icon" width="24" height="24" />
          </span>
          <span class="tab-text content_text">ベネ通販</span>
        </li>
      </ul>
  </template>
  <script>
  export default {
    name: 'TopNav',
    props: {
        activeId: Number,
    }
  };
  </script>
<style scoped lang="scss">
.top-nav-tabs {
  li {
    border-radius: 8px 8px 0 0;
  }
}

.flex {
  display: flex;
}
.sm_block {
  display: none;
}
@media screen and (max-width: 480px) {
  .sm_block {
    display: block;
  }

  .content {
    &_tabs {
      gap: 4px;
    }
    &_tab {
      padding: 7px 16px 6px;
    }
    &_text {
      text-align: left;
      font-size: 13px;
    }
  }
}
</style>
  