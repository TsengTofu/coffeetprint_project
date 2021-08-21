<template>
  <div class="container detail_wrapper">
    <!--  FIXME  這邊先把隨機產品隱藏起來 -->
    <!--  TODO  分類跟名稱，點擊應該要可以回去 -->
    <BreadCrumbComponent
      :detail_data="productDetail"
    />
    <CafeInfoComponent :detail_data="productDetail" />
    <CafeContentComponent
      :detail_data="place_json"
    />
    <!-- 傳入當下的產品 id -->
    <!-- 助教說是這邊的問題，改變傳入的方式？ -->
    <RandomCafeListComponent
      :category="category"
    />
  </div>
</template>
<script>
import BreadCrumbComponent from '../../components/Core/BreadCrumb/BreadCrumb.vue';
import CafeInfoComponent from '../../components/Front/CafeDetail/CafeInfo.vue';
import CafeContentComponent from '../../components/Front/CafeDetail/CafeContent.vue';
import RandomCafeListComponent from '../../components/Front/RandomCafe/RandomCafeList.vue';

export default {
  name: 'ProductDetail',
  props: {},
  components: {
    BreadCrumbComponent,
    CafeInfoComponent,
    CafeContentComponent,
    RandomCafeListComponent,
  },
  data() {
    return {
      productDetail: {},
      category: '',
      place_json: {},
    };
  },
  methods: {
    // 取得現在的產品詳細內容
    getCurrentCafeData(productID) {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/product/${productID}`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            const { product } = response.data;
            this.productDetail = product;
            this.category = this.productDetail.category;
            const test = JSON.parse(product.place_json);
            this.place_json = { ...product, ...test.result };
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
    //  TODO  確認一下元件的生命週期
    this.getCurrentCafeData(this.$route.params.id);
  },
};
</script>
<style scoped lang="sass">
.detail_wrapper
  padding: 100px 0 0 0
</style>
