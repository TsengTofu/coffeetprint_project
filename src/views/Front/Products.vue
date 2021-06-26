<template>
  <!-- <router-view></router-view> 原本這個是要給產品詳細頁使用的 -->
  <div class="cafe_outer">
    <p>我是產品列表頁</p>
    <CafeListComponent />
  </div>
</template>
<script>
import CafeListComponent from '../../components/Front/CafeProduct/CafeList.vue';

export default {
  name: '',
  components: {
    CafeListComponent,
  },
  data() {},
  methods: {},
};
</script>

<style scoped lang="sass">
.cafe_outer
  display: flex
  width: 100%
  flex-direction: column
</style>
