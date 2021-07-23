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
      favorite_list: localStorageMethods.get() || [],
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
    // 加到我的最愛
    // TODO  但這不能用 父子傳遞嗎？？？
    toggleFavorite(id) {
      console.log(id);
      if (this.favorite_list.includes(id)) {
        this.favorite_list.splice(this.favorite_list.indexOf(id), 1);
        this.$swal('已成功移除我的最愛！');
      } else {
        this.favorite_list.push(id);
        this.$swal('已成功加入我的最愛！');
      }
      // localStorageMethods.save(this.favorite_list);
    },
  },
  created() {
    this.emitter.on('addToFavoriteList', (id) => {
      this.toggleFavorite(id);
    });
  },
  mounted() {
    this.getCafeListData();
  },
  watch: {
    favorite_list: {
      handler() {
        localStorageMethods.save(this.favorite_list);
      },
      deep: true,
    },
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
