<template>
  <p>我是產品詳細頁面</p>
  <span>目前的產品是 id {{ product_id }}</span>
</template>
<script>
export default {
  name: '',
  props: [],
  data() {
    return {
      // 測試用抓產品頁的 id
      product_id: '',
    };
  },
  methods: {},
  mounted() {
    console.log(this.$route.params.id);
    this.product_id = this.$route.params.id;
  },
};
</script>
