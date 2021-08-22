<template>
  <div class="cafe_wrapper">
    <!-- 這個 TopBanner 的圖片用的不同，要想一下怎麼處理 -->
    <div class="top_banner container-fluid">
      <div class="describe">
        <p>看看有哪些咖啡廳</p>
        <span>找個喜歡的角落</span>
      </div>
    </div>
    <div class="cafe_outer container">
      <!-- <button
        type="button"
        class="btn btn-primary"
        @click="filterCategory('all')"
      >
        全部
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="filterCategory('咖啡廳')"
      >
        咖啡廳
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="filterCategory('餐廳')"
      >
        餐廳
      </button>
      <p>暫時的資料</p>
      {{ temp_cafe_list }} -->
      <CafeListComponent />
    </div>
  </div>
</template>
<script>
import CafeListComponent from '../../components/Front/CafeProduct/CafeList.vue';

export default {
  name: '',
  components: {
    CafeListComponent,
  },
  data() {
    return {
      all_cafe_list: [],
      temp_cafe_list: [],
    };
  },
  methods: {
    // 取得所有咖啡廳的資料
    getAllCafeList() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products/all`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            const { products } = response.data;
            this.all_cafe_list = products;
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
    // 點擊之後 filter 資料
    filterCategory(categoryName) {
      this.temp_cafe_list = this.all_cafe_list.filter((item) => item.category === categoryName);
    },
  },
  mounted() {
    this.getAllCafeList();
  },
};
</script>

<style scoped lang="sass">
.cafe_wrapper
  padding: 59px 0 0 0
  background: #f7f5f4
.cafe_outer
  position: relative
  z-index: 5
.top_banner
  padding: 0px
  height: 350px
  background-image: url('../../../public/products.jpg')
  background-size: cover
  background-position: bottom
  display: flex
  align-items: center
  justify-content: center
  position: relative
  @media (max-width: 525px)
    background-image: url('../../../public/products_s.jpg')
  &::after
    content: ''
    background-position: top
    background-image: url('../../assets/images/wave.svg')
    background-size: cover
    display: block
    width: 100%
    height: 150px
    position: absolute
    bottom: -80px
    z-index: 1
  @media (max-width: 525px)
    &::after
      background-image: url('../../assets/images/wave_s.png')
  p
    font-weight: bold
    font-size: 2rem
    margin: 0 0 .5rem
  span
    font-weight: 500
</style>
