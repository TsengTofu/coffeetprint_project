<template>
  <div class="container-fluid explore_cafe_wrapper">
    <h4><span class="material-icons-round">place</span>探索城市</h4>
    <p>一起探索各地的咖啡廳吧！</p>
    <!-- 區域選擇的清單 -->
    <div class="area_block">
      <ul class="list-unstyled d-flex">
        <CityCafeCardComponent v-for="index in 4" :key="index"/>
      </ul>
    </div>
  </div>
</template>

<script>
import CityCafeCardComponent from './CityCafeCard.vue';

// 專門給探索區塊用的
export default {
  name: 'ExploreCafeComponent',
  props: {},
  components: {
    CityCafeCardComponent,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {

  },
};
</script>

<style scoped lang="sass">
.explore_cafe_wrapper
  background: #406B5A
  padding: 20px 20px 150px
  .area_block
    max-width: 1200px
    margin: 0 auto
</style>
