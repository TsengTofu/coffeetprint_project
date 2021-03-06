<template>
    <template v-if="switch_status === 'grid'">
      <ul class="list-unstyled row row-cols-1 row-cols-md-5">
        <template
          v-for="(cafe, key) in productData"
          :key="'cafe_'+ key"
        >
          <CafeCardComponent
            :order="key"
            :singleCafe="cafe"
            :is_favorite="favorite_list.includes(cafe.id)"
          />
        </template>
      </ul>
    </template>
    <template v-else>
      <ul class="list-unstyled row row-cols-1 row-cols-md-2 g-3">
        <template
          v-for="(cafe, key) in productData"
          :key="'grid_'+ key"
        >
          <CafeGridViewCardComponent
            :singleCafe="cafe"
            :is_favorite="favorite_list.includes(cafe.id)"
          />
        </template>
        </ul>
    </template>
    <PaginationComponent
      :pagination_object="pagination"
      @emit-change-page="getCafeListData"
    />
</template>

<script>
// 原本的展示狀態
import CafeCardComponent from '../Index/CafeProduct/CafeCard.vue';
import CafeGridViewCardComponent from '../Index/CafeProduct/CafeGridViewCard.vue';
import PaginationComponent from '../../Core/Modal/Pagination.vue';
import LocalStorageSupport from '../../../Support/LocalStorageSupport';

export default {
  name: 'CafeListComponent',
  // 產品列表頁
  components: {
    CafeCardComponent,
    CafeGridViewCardComponent,
    PaginationComponent,
  },
  props: {
    switch_status: String,
  },
  data() {
    return {
      // 拿資料
      productData: [],
      pagination: {},
      favorite_list: [],
    };
  },
  methods: {
    // 取得產品列表的 funciton
    getCafeListData(queryPage) {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products?page=${queryPage}`;
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
    // 加到我的最愛
    toggleFavorite(id) {
      if (this.favorite_list.includes(id)) {
        this.favorite_list.splice(this.favorite_list.indexOf(id), 1);
        this.$swal('已成功移除我的最愛！');
      } else {
        this.favorite_list.push(id);
        this.$swal('已成功加入我的最愛！');
      }
    },
  },
  created() {
    this.favorite_list = LocalStorageSupport('CoffeetPrintFavorite').getItem() || [];
    this.emitter.on('addToFavoriteList', (id) => {
      this.toggleFavorite(id);
    });
  },
  watch: {
    favorite_list: {
      handler() {
        LocalStorageSupport('CoffeetPrintFavorite').saveItem(this.favorite_list);
      },
      deep: true,
    },
  },
  mounted() {
    this.getCafeListData();
  },
  unmounted() {
    this.emitter.off('addToFavoriteList');
  },
};
</script>
<style scoped lang="sass">
.cafe_list_wrapper
  ul
    width: 100%
    display: flex
    margin: 0px
</style>
