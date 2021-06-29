<template>
  <div class="container-fluid d-flex">
    <!-- 我是產品詳細頁上半部的卡片 -->
    <div class="left_image">
      <img :src="detail_data.imageUrl" alt="咖啡廳主圖">
    </div>
    <div class="right_info">
      <h3>{{ detail_data.title }}</h3>
      <p>{{ detail_data.id }}</p>
      <p><span class="material-icons-round">place</span>{{ detail_data.area }}｜台灣</p>
      <p>{{ detail_data.category }}</p>
      <p v-html="detail_data.content"></p>
      <p v-html="detail_data.description"></p>
      <p>NT$ {{ detail_data.origin_price }}</p>
      <p>NT$ {{ detail_data.price }}</p>
      <!-- 加入購物車、數量 -->
      <p>剩餘數量：{{ detail_data.num }}</p>
      <button type="button" class="btn-primary">
        <span class="material-icons-round">shopping_cart</span>
        加入購物車
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CafeInfoComponent',
  props: {
    detail_data: Object,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // 測試
    console.log(this.detail_data);
  },
};
</script>
<style scoped lang="sass">
.left_image
  width: 35%
  img
    width: 100%
    height: auto
.right_info
</style>
