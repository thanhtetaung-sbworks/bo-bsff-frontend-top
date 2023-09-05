<template>
  <div class="c-carousel c-carousel--roundedArrow">
    <div class="c-carousel__inner">
      <swiper ref="carousel" :options="swiperOption">
        <slot />
        <div class="c-carousel__pagination" slot="pagination"></div>
      </swiper>
      <div class="c-carousel__prev" slot="button-prev">
        <Icon name="arrow_circle_left_white" />
      </div>
      <div class="c-carousel__next" slot="button-next">
        <Icon name="arrow_circle_right_white" />
      </div>
    </div>
    <!-- /.c-carousel__inner -->
  </div>
  <!-- /.c-carousel -->
</template>

<script>
export default {
  props: {
    mergeOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    initOptions: {
      initialSlide: 0,
      slidesPerView: 1.3,
      spaceBetween: 24,
      loop: true,
      centeredSlides: false,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".c-carousel__pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".c-carousel__next",
        prevEl: ".c-carousel__prev"
      },
      breakpoints: {
        1024: {
          slidesPerView: 3
        }
      },
      lazy: true,
    }
  }),
  computed: {
    swiper() {
      return this.$refs.carousel.$swiper;
    },
    swiperOption() {
      if (Object.keys(this.mergeOptions).length) {
        return this.mergeOptions;
      }
      else {
        return this.initOptions;
      }
    }
  },
  created() {
    this.initOptions.centeredSlides = this.$utils.isSmartPhone() ? true : false;
  }
};
</script>
