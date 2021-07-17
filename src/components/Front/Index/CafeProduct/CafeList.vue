<template>
  <div class="container-fluid cafe_list_block">
    <TitleComponent
      title="＃發現咖啡廳"
    />
    <span class="material-icons-round">coffee</span>
    <p>一起看看哪些咖啡廳有提供優惠券吧！</p>
    <!-- 產品列表清單 -->
    <div class="list_wrap">
      <!-- 改變顯示方式 -->
      <div class="change_layout">
        <button type="button"><span class="material-icons-round">view_list</span></button>
        <button type="button"><span class="material-icons-round">grid_view</span></button>
      </div>
      <ul class="list-unstyled row row-cols-1 row-cols-md-4 g-4">
        <!-- 放卡片元件 -->
        <template v-for="(cafe, key) in productData" :key="'cafe_'+ key">
          <CafeCardComponent
            v-if="key <= 7"
            :singleCafe="cafe"
            :order="key" />
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import CafeCardComponent from './CafeCard.vue';
import TitleComponent from '../../../Core/Layout/Title/Title.vue';

export default {
  name: 'CafeListComponent',
  components: {
    TitleComponent,
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
