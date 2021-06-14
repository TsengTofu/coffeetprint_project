<template>
  <p>後台的入口位置</p>
  <ProductListComponent />
</template>
<script>
import ProductListComponent from '../../components/Admin/ProductList.vue';

export default {
  name: '',
  props: {
    token: String,
  },
  components: {
    ProductListComponent,
  },
  mounted() {
    console.log(this.token, '在 entry 取到的 token');
  },
};
</script>
