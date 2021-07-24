<template>
  <!-- 首頁的 cafe_list -->
  <div class="container-fluid cafe_list_block">
    <TitleComponent
      title="＃發現咖啡廳"
    />
    <span class="material-icons-round">coffee</span>
    <p>一起看看哪些咖啡廳有提供優惠券吧！</p>
    <!-- 產品列表清單 -->
    <!-- 改成從這邊倒進去 Data -->
    <!-- 考慮一下這邊要不要用 Swiper -->
    <CafeListComponent />
  </div>
</template>

<script>
import TitleComponent from '../../../Core/Layout/Title/Title.vue';
import CafeListComponent from '../../CafeProduct/CafeList.vue';

export default {
  name: 'CafeListWrapperComponent',
  components: {
    TitleComponent,
    CafeListComponent,
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
          const { success } = response.data;
          if (success) {
            const { products, pagination } = response.data;
            this.productData = products;
            this.pagination = pagination;
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
