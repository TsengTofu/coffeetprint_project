<template>
  <!-- TODO  解決 Layout 造成的問題 -->
  <LandingPageComponent />
  <CafePromotionCarouselComponent />
  <ExploreCafeComponent />
  <!-- 多做一個不同的分類排版 -->
  <!-- 產品部分露出 -->
  <CafeListWrapperComponent />
  <SubscribeComponent />
</template>

<script>
import LandingPageComponent from '../../components/Front/Index/LandingPage.vue';
import CafePromotionCarouselComponent from '../../components/Front/Index/Promotion/CafePromotionCarousel.vue';
import ExploreCafeComponent from '../../components/Front/Index/Explore/ExploreCafe.vue';
import CafeListWrapperComponent from '../../components/Front/Index/CafeProduct/CafeListWrapper.vue';
import SubscribeComponent from '../../components/Front/About/Subscribe/Subscribe.vue';

export default {
  name: 'Entry',
  components: {
    LandingPageComponent,
    CafePromotionCarouselComponent,
    ExploreCafeComponent,
    CafeListWrapperComponent,
    SubscribeComponent,
  },
};
</script>
