<template>
  <div class="cafe-list-block relative w-full p-0 z-[50]">
    <div class="flex items-center justify-between max-w-6xl mx-auto px-4 py-6 flex-wrap gap-4">
      <div>
        <Title title="＃發現咖啡廳" />
        <p class="flex items-center gap-1 m-0">
          <span class="material-icons-round">coffee</span>
          一起看看哪些咖啡廳有提供優惠券吧！
        </p>
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          class="flex items-center px-3 py-2 rounded text-white"
          :class="switchStatus === 'list' ? 'bg-[#4c443a]' : 'bg-[#88664D]'"
          @click="switchStatus = 'list'"
        >
          <span class="material-icons-round">view_list</span>
        </button>
        <button
          type="button"
          class="flex items-center px-3 py-2 rounded text-white"
          :class="switchStatus === 'grid' ? 'bg-[#4c443a]' : 'bg-[#88664D]'"
          @click="switchStatus = 'grid'"
        >
          <span class="material-icons-round">grid_view</span>
        </button>
      </div>
    </div>
    <div class="max-w-6xl mx-auto px-4">
      <CafeList :switch_status="switchStatus" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Title from '@/components/Core/Layout/Title/Title.vue';
import CafeList from '@/components/Front/CafeProduct/CafeList.vue';

const switchStatus = ref('grid');
</script>

<style lang="sass" scoped>
.cafe-list-block
  background: #F0EBE6
  &::before
    content: ''
    background-position: top
    background-image: url('../../../../assets/images/wave_coffee.svg')
    background-size: cover
    display: block
    width: 100%
    height: 150px
    position: absolute
    top: -130px
    z-index: -1
  @media (max-width: 525px)
    &::before
      background-image: url('../../../../assets/images/wave_coffee_s.svg')
</style>
