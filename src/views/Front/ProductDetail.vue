<template>
  <CafeInfoComponent :detail_data="productDetail" />
  <CafeContentComponent :detail_data="productDetail" />
</template>
<script>
import CafeInfoComponent from '../../components/Front/CafeDetail/CafeInfo.vue';
import CafeContentComponent from '../../components/Front/CafeDetail/CafeContent.vue';

export default {
  name: '',
  props: [],
  components: {
    CafeInfoComponent,
    CafeContentComponent,
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
          if (response.data.success) {
            this.productDetail = response.data.product;
          } else {
            console.log('出了點錯誤，請稍後再嘗試，謝謝。');
          }
        })
        .catch((error) => {
          console.log(error, 'getDataError');
        });
    },
  },
  mounted() {
    // 這邊的資料是從路由 router 來的
    console.log(this.$route.params);
    this.product_id = this.$route.params.id;
    this.getCurrentCafeData();
  },
};
</script>
<style scoped lang="sass">

</style>
