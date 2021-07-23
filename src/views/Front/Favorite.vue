<template>
  <div class="wrapper container-fluid">
    <p>加到最愛頁面</p>
    <button
      type="button"
      class="btn btn-primary"
    >
      清除全部收藏
    </button>
    <FavoriteCardListComponent
      :final_cafe_list="final_cafe_list"
    />
    <!-- FIXME  寫一個新的卡片好了 -->
    <!--  TODO  有考慮接看看 googleAPI，但需要找時間研究 -->
  </div>
</template>

<script>
import FavoriteCardListComponent from '../../components/Front/Favorite/FavoriteCardList.vue';

//  TODO  這段之後要抽出來處理 LocalStorage 的部分
const localStorageMethods = {
  save(favorite) {
    const favoriteString = JSON.stringify(favorite);
    localStorage.setItem('CoffeetPrintFavorite', favoriteString);
  },
  get() {
    return JSON.parse(localStorage.getItem('CoffeetPrintFavorite'));
  },
};

export default {
  name: '',
  components: {
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
          const { success, products } = response.data;
          if (success) {
            this.final_cafe_list = products.filter((cafe) => this.favorite_cafe_list
              .includes(cafe.id));
          } else {
            console.log('出了點錯誤，請稍後再嘗試，謝謝。');
          }
        })
        .catch((error) => {
          console.log(error, 'getDataError');
        });
    },
    // 組合成一組
    getFavoriteCafeList() {
      this.favorite_cafe_list = localStorageMethods.get();
      this.getAllCafeList();
    },
  },
  mounted() {
    this.getFavoriteCafeList();
  },
  created() {
    this.emitter.on('updateFavoriteList', (id) => {
      // 從畫面上移除
      // localStorage 也要更新
      // console.log(id);
      const order = this.favorite_cafe_list.indexOf(id);
      // console.log(id, this.favorite_cafe_list, order);
      this.favorite_cafe_list.splice(order, 1);
      localStorageMethods.save(this.favorite_cafe_list);
      this.getFavoriteCafeList();
    });
  },
};
</script>
<style lang="sass" scoped>
.wrapper
  padding: 120px 0
  background: #f0ebe5
</style>
