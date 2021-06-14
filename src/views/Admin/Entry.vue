<template>
  <p>後台的入口位置</p>
  <ProductListComponent />
</template>
<script>
import ProductListComponent from '../../components/Admin/ProductList.vue';

export default {
  name: '',
  props: {
  },
  components: {
    ProductListComponent,
  },
  mounted() {
  },
};
</script>
