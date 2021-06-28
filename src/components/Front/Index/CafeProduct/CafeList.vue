<template>
  <!-- TODO  這塊可能會有重複，記得跟 Front 那邊比對，如果可以共用就放在 Core -->
  <!-- NOTE  是首頁喔！ -->
  <div class="container-fluid cafe_list_block">
    <h4><span class="material-icons-round">coffee</span>發現咖啡廳</h4>
    <p>一起看看哪些咖啡廳有提供優惠券吧！</p>
    <!-- 產品列表清單 -->
    <div class="list_wrap">
      <span class="material-icons-round">view_list</span>
      <span class="material-icons-round">grid_view</span>
      <ul class="list-unstyled d-flex flex-wrap">
        <!-- 放卡片元件 -->
        <template v-for="(cafe, key) in productData" :key="'cafe_'+ key">
          <CafeCardComponent :singleCafe="cafe" :order="key" />
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import CafeCardComponent from './CafeCard.vue';

export default {
  name: 'CafeListComponent',
  components: {
    CafeCardComponent,
  },
  data() {
    return {
      // 拿資料
      productData: [],
      pagination: {},
    };
  },
  methods: {
    // 拿咖啡廳的資料
    getCafeListData(/* queryPage */) {
      // ${queryPage}
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products?page=1`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          console.log(response.data, 'response.data');
          if (response.data.success) {
            const { products, pagination } = response.data;
            this.productData = products;
            this.pagination = pagination;
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
    this.getCafeListData();
  },
};
</script>

<style scoped lang="sass">
// 這段是為了要加上 wave
.cafe_list_block
  background: #F0EBE6
  position: relative
  width: 100%
  padding: 0px
  z-index: 50
  &::before
      content: ''
      background-position: top
      background-image: url('../../../../assets/images/wave_coffee.svg')
      background-size: cover
      display: block
      width: 100%
      height: 150px
      position: absolute
      top: -130px
      z-index: -1
  .list_wrap
    width: 100%
    max-width: 1200px
    margin: 0 auto
</style>
