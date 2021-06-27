<template>
  <!-- TODO  解決 Layout 造成的問題 -->
  <LandingPageComponent />
  <CafePromotionCarouselComponent />
  <ExploreCafeComponent />
  <!-- 產品部分露出 -->
  <CafeListComponent />
</template>

<script>
import LandingPageComponent from '../../components/Front/Index/LandingPage.vue';
import CafePromotionCarouselComponent from '../../components/Front/Index/Promotion/CafePromotionCarousel.vue';
import ExploreCafeComponent from '../../components/Front/Index/Explore/ExploreCafe.vue';
import CafeListComponent from '../../components/Front/Index/CafeProduct/CafeList.vue';

export default {
  name: 'Entry',
  components: {
    LandingPageComponent,
    CafePromotionCarouselComponent,
    ExploreCafeComponent,
    CafeListComponent,
  },
};
</script>
