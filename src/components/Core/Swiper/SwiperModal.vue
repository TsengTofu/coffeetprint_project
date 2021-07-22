<template>
  <div class="wrapper">
      <!-- 第二個 swiper -->
      <swiper
        :style="{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }"
        :spaceBetween="0"
        :navigation="true"
        :thumbs="{ swiper: thumbsSwiper }"
        class="mySwiper2"
      >
        <swiper-slide
          v-for="(pic, key) in pic_list"
          :key="'pic_' + key"
        >
          <div class="main_pic">
            <img :src="pic" alt="咖啡廳主圖" :style="'width: 100%; height: auto'" />
          </div>
        </swiper-slide>
      </swiper>
      <swiper
        @swiper="setThumbsSwiper"
        :spaceBetween="10"
        :slidesPerView="4"
        :freeMode="true"
        :watchSlidesVisibility="true"
        :watchSlidesProgress="true"
        class="mySwiper"
      >
        <swiper-slide
          v-for="(pic, key) in pic_list"
          :key="'pic_' + key"
        >
          <img :src="pic" alt="咖啡廳主圖" :style="'width: 100%; height: auto'" />
        </swiper-slide>
      </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/swiper.scss';

import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/thumbs/thumbs.min.css';

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Thumbs,
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation,
  Thumbs]);

export default {
  name: 'SwiperModalComponent',
  props: {
    pic_list: Array,
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      thumbsSwiper: null,
    };
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
  },
};
</script>

<style lang="sass" scoped>
.main_pic
  width: 100%
  max-height: 480px
  overflow: hidden
.wrapper
  // width: 60%
  .mySwiper2
    border-radius: 16px
    // width: calc( 100% - 120px )
    // height: 450px
    // margin: 0 0 0 10px
  .mySwiper
    // width: 120px
    // height: 480px
    .swiper-slide
      border-radius: 16px
      overflow: hidden
      img
        width: 100%
        height: auto
</style>
