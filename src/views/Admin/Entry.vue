<template>
  <p>後台的入口位置</p>
  <ProductListComponent />
  <UploadImageComponent />
</template>
<script>
// 產品列表
import ProductListComponent from '../../components/Admin/Product/ProductList.vue';
// 上傳圖片
import UploadImageComponent from '../../components/Admin/UploadImage.vue';

export default {
  name: '',
  props: {
  },
  components: {
    ProductListComponent,
    UploadImageComponent,
  },
  mounted() {
  },
};
</script>
