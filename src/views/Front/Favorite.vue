<template>
  <div class="wrapper">
    <p>加到最愛頁面</p>
    {{ favorite_cafe_list }}
    <!-- 這部分有考慮接看看 googleAPI，但需要找時間研究 -->
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      favorite_cafe_list: [],
    };
  },
  methods: {},
  mounted() {
    // 從 localStorage 撈出對應的 id 資料
    const localStorageData = JSON.parse(localStorage.getItem('CoffeetPrintFavorite'));
    this.favorite_cafe_list = localStorageData;

    // 先把步驟寫出來， TODO  這邊都還沒處理
    // 1. 撈出全部的咖啡廳資料
    // 2. 比對 favorite_cafe_list
    // 3. 再把資料丟到 cafe_list 的元件
    // 4. 渲染畫面
  },
};
</script>
<style lang="sass" scoped>
.wrapper
  margin: 120px 0
</style>
