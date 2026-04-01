<template>
  <div class="promotion-block relative w-full p-0 z-[50]">
    <div class="max-w-6xl mx-auto px-4 relative z-[10] pb-16">
      <Title title="＃編輯嚴選" />
      <swiper
        v-if="postList.length > 0"
        :slides-per-view="1"
        :loop="true"
        :pagination="{ clickable: true }"
        :navigation="true"
        :autoplay="{ delay: 8000, disableOnInteraction: false }"
        class="promotion-swiper rounded-2xl bg-[#F0EBE6] p-4 md:p-12"
      >
        <swiper-slide v-for="(post, key) in postList" :key="'post_' + key">
          <CafePromotionCard :post_data="post" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Autoplay]);
</script>

<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Title from '@/components/Core/Layout/Title/Title.vue';
import CafePromotionCard from './CafePromotionCard.vue';

const postList = ref([]);

function getPostList() {
  const url = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_API_PATH}/articles?page=1`;
  axios.get(url)
    .then((response) => {
      postList.value = response.data.articles;
    })
    .catch(() => {
      Swal.fire({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
    });
}

onMounted(() => {
  getPostList();
});
</script>

<style lang="sass" scoped>
.promotion-block
  background: #f7f5f4
  &::before
    content: ''
    background-position: top
    background-image: url('../../../../assets/images/wave.svg')
    background-size: cover
    display: block
    width: 100%
    height: 150px
    position: absolute
    top: -130px
    z-index: 4
  @media (max-width: 525px)
    &::before
      top: -50px
      background-image: url('../../../../assets/images/wave_s.svg')
  &::after
    content: ''
    background: #406B5A
    display: block
    width: 100%
    height: 200px
    position: absolute
    bottom: 0px
</style>
