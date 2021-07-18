<template>
  <!--  TODO  改變顯示方式 -->
  <div class="change_layout">
      <button
        type="button"
        class="btn btn-primary"
        @click="switch_status = 'list'"
      >
        <span class="material-icons-round">view_list</span>
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="switch_status = 'grid'"
      >
        <span class="material-icons-round">grid_view</span>
      </button>
  </div>
  <div class="container-fluid cafe_list_wrapper">
    <!--  TODO  思考一下要不要把 productData 換掉 -->
    <template v-if="switch_status === 'grid'">
      <ul class="list-unstyled row row-cols-1 row-cols-md-5 g-5">
        <CafeCardComponent
          v-for="(cafe, key) in productData" :key="'cafe_'+ key"
          :singleCafe="cafe" :order="key"
        />
      </ul>
    </template>
    <template v-else>
      <ul class="list-unstyled row row-cols-1 row-cols-md-2 g-2">
        <CafeGridViewCardComponent
          v-for="(cafe, key) in productData" :key="'grid_'+ key"
          :singleCafe="cafe"
        />
        </ul>
    </template>
    <PaginationComponent
      :pagination_object="pagination"
      @emit-change-page="getCafeListData"
    />
  </div>
</template>

<script>
// 原本的展示狀態
import CafeCardComponent from '../Index/CafeProduct/CafeCard.vue';
import CafeGridViewCardComponent from '../Index/CafeProduct/CafeGridViewCard.vue';
import PaginationComponent from '../../Core/Modal/Pagination.vue';

export default {
  name: 'CafeListComponent',
  // 產品列表頁
  components: {
    CafeCardComponent,
    CafeGridViewCardComponent,
    PaginationComponent,
  },
  data() {
    return {
      // 拿資料
      productData: [],
      pagination: {},
      // 切換狀態
      switch_status: 'grid',
    };
  },
  methods: {
    // 取得產品列表的 funciton
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
    // 處理不同變化的 cafeList
  },
  mounted() {
    this.getCafeListData();
  },
};
</script>
<style scoped lang="sass">
.cafe_list_wrapper
  width: 100%
  max-width: 1200px
  ul
    width: 100%
    display: flex
    margin: 0px
</style>
