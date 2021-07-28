<template>
  <div class="container">
    <!--  NOTE  這邊要用 swiper 處理品項嗎？ -->
    <ul class="row list-unstyled">
      <template
        v-for="(cafe, key) in random_cafe_list"
        :key="'random_cafe_' + key"
      >
        <!-- 考慮要不要拆元件 -->
        <!--  FIXME  少傳是不是 favorite 的參數 -->
        <CafeCardComponent
          :singleCafe="cafe"
        />
      </template>
    </ul>
  </div>
</template>
<script>
//  TODO  這邊先不寫屬於隨機產品的卡片
import CafeCardComponent from '../Index/CafeProduct/CafeCard.vue';

export default {
  name: 'RandomCafeListComponent',
  props: {
    detail_data: Object,
  },
  components: {
    CafeCardComponent,
  },
  data() {
    return {
      // 全部的咖啡廳清單
      all_cafe_list: [],
      // 隨機的咖啡廳清單
      random_cafe_list: [],
    };
  },
  methods: {
    // 取得所有商品資料
    getAllCafeList() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products/all`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          const { success, products } = response.data;
          if (success) {
            this.all_cafe_list = products;
            this.getCategoryList();
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
    // 取得產品分類的項目
    getCategoryList() {
      console.log('取得跟目前的產品分類相同的項目');
      const { category } = this.detail_data;
      const filterCafeList = this.all_cafe_list.filter((cafe) => cafe.category === category);
      console.log(filterCafeList, '跟目前選擇的產品分類相同');
      // 處理隨機取得產品
      const randomCafeSet = new Set([]);
      console.log(randomCafeSet.size);
      // 取得隨機數字 Math.floor(Math.random() * max)
      for (let index = 0; randomCafeSet.size < 4; index + 1) {
        const num = Math.floor(Math.random() * filterCafeList.length);
        randomCafeSet.add(num);
      }
      randomCafeSet.forEach((item) => {
        this.random_cafe_list.push(filterCafeList[item]);
      });
    },
  },
  mounted() {
    this.getAllCafeList();
  },
};
</script>
<style lang="sass" scoped>

</style>
