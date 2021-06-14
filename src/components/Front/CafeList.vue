<template>
  <div></div>
</template>

<script>
export default {
  name: 'CafeListComponent',
  // 產品列表頁
  components: {},
  data() {
    return {
      // 拿資料
    };
  },
  methods: {
    getCafeListData(/* queryPage */) {
      // ${queryPage}
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products?page=1`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          console.log(response.data, 'response.data');
          if (response.data.success) {
            // const { products, pagination } = response.data;
            // this.productData = products;
            // this.pagination = pagination;
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
