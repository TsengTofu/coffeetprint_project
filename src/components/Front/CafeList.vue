<template>
  <!-- 單純給產品列表使用 -->
  <div class="cafe_list_wrapper">
    <ul>
      <!--  TODO  思考一下要不要把 productData 換掉 -->
      <template v-for="(cafe, key) in productData" :key="'cafe_'+ key">
        <CafeCardComponent :singleCafe="cafe" :order="key" />
      </template>
    </ul>
  </div>
</template>

<script>
import CafeCardComponent from './CafeCard.vue';

export default {
  name: 'CafeListComponent',
  // 產品列表頁
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
.cafe_list_wrapper
  display: flex
  width: 100%
  ul
    width: 100%
    display: flex
    flex-wrap: wrap
</style>
