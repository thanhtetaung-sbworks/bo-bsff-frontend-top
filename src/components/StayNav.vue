<template>
  <div class="content_wrapper">
    <!-- 国内宿泊施設 -->
    <div
      class="content_item content_item__top"
      :class="{ is_active: activeId === 1 }"
      @click="$emit('click-accommodation')"
    >
      <span class="content_item_icon">
        <Icon name="hotel_gray" width="20" height="20" />
      </span>
      <span>国内宿泊施設</span>
    </div>

    <!-- 公共の宿・海外旅行 -->
    <div class="content_item__middle">
      <div
        class="content_item"
        :class="{ is_active: activeId === 2 }"
        @click="$emit('click-public')"
      >
        <span class="content_item_icon">
          <Icon name="public_gray" width="20" height="20" />
        </span>
        <span>公共の宿</span>
      </div>
      <div class="content_item" @click="$emit('click-stay')">
        <span class="content_item_icon">
          <Icon name="ryokou_gray" width="20" height="20" />
        </span>
        <span>海外旅行</span>
        <span class="content_item_icon content_item_icon__ext">
          <Icon name="external_link" width="14" height="14" />
        </span>
      </div>
    </div>

    <!-- パッケージツアー -->
    <div
      class="content_item content_item__long content_item__bottom"
      @click="$emit('click-order')"
    >
      <span class="content_item_icon">
        <Icon name="tour_gray" width="20" height="20" />
      </span>
      <span>
        パッケージツアー・旅行代理店、<br
          class="tab_hidden"
        />航空券・交通・その他旅行関連
      </span>
      <span class="content_item_icon content_item_icon__ext">
        <Icon name="external_link" width="14" height="14" />
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StayNav',
  props: {
    activeId: Number
  },
  data() {
    return {
      innerWidth: window.innerWidth
    }
  }
}
</script>
<style scoped lang="scss">
.content {
  &_wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  &_item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #e7e7e7;
    color: #73767a;
    font-size: 15px;
    padding: 10px 15px 9px;
    border-radius: 4px;
    font-weight: bold;
    white-space: nowrap;
    &_icon {
      margin-right: 4px;
      &__ext {
        padding: 4px 0 0 4px;
      }
    }
    &.is_active,
    &:hover {
      background-color: #e60021;
      color: white;
    }
    &__long {
      font-size: 12px;
    }
    &__top {
      width: 25%;
      margin-right: 8px;
    }
    &__middle {
      width: 50%;
      display: flex;
      justify-content: space-between;
      > div {
        margin-right: 8px;
      }
    }
    &__bottom {
      width: 25%;
    }
  }
}

@media only screen and (max-width: 1023px) {
  .content {
    &_wrapper {
      display: block;
      margin-bottom: 12px;
    }
    &_item {
      font-size: 13px;
      padding: 10px 0 9px;
      border-radius: 3px;
      &__long {
        font-size: 12px;
      }
      &__top {
        width: 100%;
        margin: 0 0 5px;
      }
      &__middle {
        width: 100%;
        margin-bottom: 5px;
        > .content_item:first-of-type {
          margin-right: 5px;
        }
        > .content_item:not(:first-of-type) {
          margin-right: 0;
        }
      }
      &__bottom {
        width: 100%;
      }
    }
  }

  .tab_hidden {
    display: none;
  }
}

@media only screen and (max-width: 640px) {
  .content {
    &_item {
      &__bottom {
        padding: 2px 0;
      }
    }
  }

  .tab_hidden {
    display: block;
  }
}
</style>

<style lang="scss">
.content_item {
  &_icon {
    width: 20px;
    height: 20px;
    path {
      fill: #73767a;
    }
  }
  &.is_active,
  &:hover {
    .content_item_icon path {
      fill: white;
    }
  }
}
</style>
