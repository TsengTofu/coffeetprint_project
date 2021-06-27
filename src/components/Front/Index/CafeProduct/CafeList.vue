<template>
  <!-- TODO  這塊可能會有重複，記得跟 Front 那邊比對，如果可以共用就放在 Core -->
  <!-- NOTE  是首頁喔！ -->
  <div class="container-fluid cafe_list_block">
    <h4><span class="material-icons-round">coffee</span>發現咖啡廳</h4>
    <p>一起看看哪些咖啡廳有提供優惠券吧！</p>
    <!-- 產品列表清單 -->
    <div class="list_wrap">
      <ul class="list-unstyled d-flex flex-wrap">
        <!-- 放卡片元件 -->
        <CafeCardComponent v-for="index in 7" :key="index" />
      </ul>
    </div>
  </div>
</template>

<script>
import CafeCardComponent from './CafeCard.vue';

export default {
  name: 'CafeListComponent',
  components: {
    CafeCardComponent,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped lang="sass">
// 這段是為了要加上 wave
.cafe_list_block
  background: #F0EBE6
  position: relative
  width: 100%
  padding: 0px
  z-index: 50
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
  .list_wrap
    width: 100%
    max-width: 1200px
    margin: 0 auto
</style>
