<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <!-- 這邊要透過資料編輯出來 -->
      <li class="breadcrumb-item"><a href="#">全部店家</a></li>
      <li class="breadcrumb-item"><a href="#">咖啡廳</a></li>
      <!-- 目前的產品名稱 -->
      <li class="breadcrumb-item active" aria-current="page">Data</li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'BreadCrumbComponent',
  props: {},
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
