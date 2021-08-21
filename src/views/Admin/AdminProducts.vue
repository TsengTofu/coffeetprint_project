<template>
  <div class="container admin_products_wrapper">
    <ProductListComponent />
    <UploadImageComponent />
  </div>
</template>
<script>
// 產品列表
import ProductListComponent from '../../components/Admin/Product/ProductList.vue';
// 上傳圖片
import UploadImageComponent from '../../components/Admin/UploadImage.vue';

export default {
  name: 'AdminProducts',
  props: {},
  components: {
    ProductListComponent,
    UploadImageComponent,
  },

};
</script>

<style lang="sass" scoped>
.admin_products_wrapper
  padding: 0px 0px 120px
</style>
