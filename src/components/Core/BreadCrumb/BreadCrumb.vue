<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <!-- 這邊要透過資料編輯出來 -->
      <li class="breadcrumb-item">
        <a href="#/products">全部店家</a>
      </li>
      <li class="breadcrumb-item">
        <!--  TODO  這邊等於需要處理點擊之後要回到產品的分類頁，可以透過參數取得 -->
        <a href="#">{{ detail_data.category }}</a>
      </li>
      <!-- 目前的產品名稱 -->
      <li class="breadcrumb-item active" aria-current="page">{{ detail_data.title }}</li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'BreadCrumbComponent',
  props: {
    // 傳這麼一大包資料好嗎？
    detail_data: Object,
  },
  components: {},
  data() {
    return {
      //
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="sass" scoped>
a
  color: #000
</style>
