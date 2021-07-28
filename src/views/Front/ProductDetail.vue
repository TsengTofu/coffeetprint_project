<template>
  <div class="container detail_wrapper">
    <!-- <BreadCrumbComponent /> -->
    <CafeInfoComponent :detail_data="productDetail" />
    <CafeContentComponent :detail_data="productDetail" />
    <!-- 傳入當下的產品 id -->
    <RandomCafeListComponent
      :detail_data="productDetail"
    />
    <!--  TODO  需要有使用說明嗎？ -->
  </div>
</template>
<script>
// import BreadCrumbComponent from '../../components/Core/BreadCrumb/BreadCrumb.vue';
import CafeInfoComponent from '../../components/Front/CafeDetail/CafeInfo.vue';
import CafeContentComponent from '../../components/Front/CafeDetail/CafeContent.vue';
import RandomCafeListComponent from '../../components/Front/RandomCafe/RandomCafeList.vue';

export default {
  name: '',
  props: [],
  components: {
    // BreadCrumbComponent,
    CafeInfoComponent,
    CafeContentComponent,
    RandomCafeListComponent,
  },
  data() {
    return {
      // 測試用抓產品頁的 id
      product_id: '',
      productDetail: {},
    };
  },
  methods: {
    // 取得現在的產品詳細內容
    getCurrentCafeData() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/product/${this.product_id}`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            const { product } = response.data;
            this.productDetail = product;
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
  },
  mounted() {
    this.product_id = this.$route.params.id;
    this.getCurrentCafeData();
  },
};
</script>
<style scoped lang="sass">
.detail_wrapper
  padding: 100px 0 0 0
</style>
