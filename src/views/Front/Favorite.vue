<template>
  <div class="wrapper container-fluid">
    <TopBannerComponent
      main_title="口袋清單"
      vice_title="今天想喝咖啡還是吃早午餐呢？"
    />
    <div class="content">
      <button
        type="button"
        class="btn btn-primary"
        v-if="final_cafe_list.length > 0"
        @click="clearAllFavorite"
      >
        清除全部收藏
      </button>
      <template v-if="final_cafe_list.length > 0">
        <FavoriteCardListComponent
          :final_cafe_list="final_cafe_list"
        />
      </template>
      <template v-else>
        <div>
          <p>目前收藏清單是空的</p>
          <button
            type="button"
            class="btn btn-primary"
            @click="directToPage('products')"
          >
            去逛逛
          </button>
        </div>
      </template>
    </div>
    <!--  TODO  考慮看看 googleAPI，找時間研究 -->
  </div>
</template>

<script>
import TopBannerComponent from '../../components/Core/Layout/TopBanner.vue';
import FavoriteCardListComponent from '../../components/Front/Favorite/FavoriteCardList.vue';
import LocalStorageSupport from '../../Support/LocalStorageSupport';

export default {
  name: '',
  components: {
    TopBannerComponent,
    FavoriteCardListComponent,
  },
  data() {
    return {
      favorite_cafe_list: [],
      // 最後要渲染到畫面上的
      final_cafe_list: [],
    };
  },
  methods: {
    getAllCafeList() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products/all`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            const { products } = response.data;
            this.final_cafe_list = products.filter((cafe) => this.favorite_cafe_list
              .includes(cafe.id));
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
    getFavoriteCafeList() {
      this.favorite_cafe_list = LocalStorageSupport('CoffeetPrintFavorite').getItem() || [];
      this.getAllCafeList();
    },
    clearAllFavorite() {
      LocalStorageSupport('CoffeetPrintFavorite').removeItem();
      this.getFavoriteCafeList();
    },
    // 跳頁
    directToPage(pageName) {
      this.$router.push(`/${pageName}`);
    },
  },
  created() {
    this.emitter.on('updateFavoriteList', (id) => {
      const order = this.favorite_cafe_list.indexOf(id);
      this.favorite_cafe_list.splice(order, 1);
      LocalStorageSupport('CoffeetPrintFavorite').saveItem(this.favorite_cafe_list);
      this.$swal('已成功移除此收藏！');
      this.getFavoriteCafeList();
    });
  },
  mounted() {
    this.getFavoriteCafeList();
  },
  unmounted() {
    this.emitter.off('updateFavoriteList');
  },
};
</script>
<style lang="sass" scoped>
.wrapper
  padding: 59px 0 50px 0
  background: #f7f5f4
  .content
    position: relative
    z-index: 5
    padding: 2rem 0 0 0
</style>
