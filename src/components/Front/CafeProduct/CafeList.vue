<template>
  <!-- 單純給產品列表使用 -->
  <!--  TODO  基本上這也可以換掉囉！ -->
  <div class="cafe_list_wrapper">
    <ul class="list-unstyled">
      <!--  TODO  思考一下要不要把 productData 換掉 -->
      <template v-for="(cafe, key) in productData" :key="'cafe_'+ key">
        <CafeCardComponent :singleCafe="cafe" :order="key" />
      </template>
    </ul>
  </div>
  <PaginationComponent
      :pagination_object="pagination"
      @emit-change-page="getCafeListData"
    />
</template>

<script>
import CafeCardComponent from '../Index/CafeProduct/CafeCard.vue';
import PaginationComponent from '../../Core/Modal/Pagination.vue';

export default {
  name: 'CafeListComponent',
  // 產品列表頁
  components: {
    CafeCardComponent,
    PaginationComponent,
  },
  data() {
    return {
      // 拿資料
      productData: [],
      pagination: {},
    };
  },
  methods: {
    getCafeListData(queryPage) {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products?page=${queryPage}`;
      this.axios
        .get(requestUrl)
        .then((response) => {
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
