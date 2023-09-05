<template>
      <ul class="nav-tabs life-service-nav">
        <li class="tab-item" :class="{active: activeId === 1}" @click="$emit('click-live-play')">
          <span class="tab-icon flex">
            <Icon name="living_playing_icon" width="20" height="20" />
          </span>
          <span class="tab-text text-pc-base text-sp-base">暮らす・遊ぶ</span>
        </li>
        <li class="tab-item" :class="{active: activeId === 2}" @click="$emit('click-eat')">
          <span class="tab-icon flex">
            <Icon name="eat_icon" width="20" height="20" />
          </span>
          <span class="tab-text text-pc-base text-sp-base">食べる</span>
        </li>
      </ul>
  </template>
  <script>
  export default {
    name: 'LifeServiceNav',
    props: {
        activeId: Number,
    }
  };
  </script>
<style scoped lang="scss">
.life-service-nav {
  margin-bottom: 20px;
  .tab-item {
    border-radius: 4px;
  }
}

.flex {
  display: flex;
}

.text-pc-base {
  font-size: 15px !important;
}

@media only screen and (min-width: 640px) {
  .life-service-nav {
      .tab-item {
          .tab-icon {
              .c-icon, .c-icon g {
                width: 20px;
                height: 20px;
              }
          }
      }
  }    
}
@media only screen and (max-width: 639px) {
  .life-service-nav {
    margin-bottom: 10px;
    .tab-item {
      max-height: 37px;
    }
  }

  .text-sp-base {
    font-size: 13px !important;
  }
}
</style>
  