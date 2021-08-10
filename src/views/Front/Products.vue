<template>
  <div class="cafe_outer">
    <!--  TODO  分類的標籤，之後考慮要不要抽成元件 -->
    <!-- 然後傳入的資料要改寫 -->
    <!-- 先用按鈕的方式處理 -->
    <button
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
    {{ temp_cafe_list }}
    <CafeListComponent />
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
      console.log(this.temp_cafe_list);
    },
  },
  mounted() {
    this.getAllCafeList();
  },
};
</script>

<style scoped lang="sass">
.cafe_outer
  padding: 120px 0 0 0
</style>
