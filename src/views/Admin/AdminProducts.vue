<template>
  <div>
    <p>我是後台的產品頁面!!!</p>
    <span>mmmmmm</span>
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
