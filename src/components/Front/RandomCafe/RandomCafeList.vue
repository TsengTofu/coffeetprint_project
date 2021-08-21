<template>
  <div class="container">
    <ul
      class="row list-unstyled row-cols-1 row-cols-md-5"
      v-if="random_cafe_list.length > 0"
    >
      <template
        v-for="(cafe, key) in random_cafe_list"
        :key="'random_cafe_' + key"
      >
        <!--  FIXME  少傳是不是 favorite 的參數 -->
        <CafeCardComponent :singleCafe="cafe" />
      </template>
    </ul>
  </div>
</template>
<script>
import CafeCardComponent from '../Index/CafeProduct/CafeCard.vue';

export default {
  name: 'RandomCafeListComponent',
  props: {
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
      // 分類
      category: '',
    };
  },
  methods: {
    // 取得現在的產品詳細內容
    getCurrentCafeData(productID) {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/product/${productID}`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            const { product } = response.data;
            this.category = product.category;
            this.getAllCafeList();
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
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
      const filterCafeList = this.all_cafe_list.filter(
        (cafe) => cafe.category === this.category,
      );
      // 處理隨機取得產品
      const randomCafeSet = new Set([]);
      // 取得隨機數字 Math.floor(Math.random() * max)
      for (let index = 0; randomCafeSet.size < 5; index + 1) {
        const num = Math.floor(Math.random() * filterCafeList.length);
        randomCafeSet.add(num);
      }
      randomCafeSet.forEach((item) => {
        this.random_cafe_list.push(filterCafeList[item]);
      });
    },
  },
  mounted() {
    this.getCurrentCafeData(this.$route.params.id);
  },
};
</script>
<style lang="sass" scoped></style>
