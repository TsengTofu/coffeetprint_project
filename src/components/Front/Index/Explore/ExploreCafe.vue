<template>
  <div class="explore-wrapper relative w-full z-[50] px-4 py-5 pb-[180px]">
    <div class="max-w-6xl mx-auto">
      <Title title="＃探索城市" color="#FFFFFF" />
      <p class="flex items-center gap-1 text-white mb-8">
        <span class="material-icons-round">place</span>
        一起探索各地的咖啡廳吧！
      </p>
      <ul class="list-none flex flex-wrap m-0 p-0">
        <CityCafeCard />
      </ul>
    </div>
  </div>
</template>

<script setup>
import CityCafeCard from './CityCafeCard.vue';
import Title from '@/components/Core/Layout/Title/Title.vue';
</script>

<style lang="sass" scoped>
.explore-wrapper
  background: #406B5A
  top: -2px
  @media (max-width: 525px)
    padding-left: 0
    padding-right: 0
    padding-bottom: 150px
</style>
