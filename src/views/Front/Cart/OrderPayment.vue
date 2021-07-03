<template>
 <!-- TODO  這支檔案要拆出來放到 components，不建議寫在 Views 裡面處理 -->
  <div>
    <p>要付款的畫面</p>
    {{ orderDetail }}
    <!-- 這邊要多一個功能，可以直接複製訂單編號 -->
    <button type="button" @click="goToPayment">付款去</button>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data() {
    return {
      orderDetail: {},
    };
  },
  methods: {
    // 取得剛成立的訂單
    getOrderDetail() {
      console.log('getOrderDetail');
      const oderId = this.$route.params.id;
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/order/${oderId}`;
      this.axios.get(requestUrl).then((response) => {
        console.log(response, 'response 這筆訂單的資料');
        const { success, order } = response.data;
        if (success) {
          this.orderDetail = order;
        } else {
          console.log('失敗');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    // 付款去 API 串接
    goToPayment() {
      const oderId = this.$route.params.id;
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/pay/${oderId}`;
      this.axios.post(requestUrl).then((response) => {
        console.log(response, '成功改變資料狀態');
        // 如果成功才可以跳轉
        this.$router.push('/order/complete');
      }).catch((error) => {
        console.log(error);
      });
    },
  },
  mounted() {
    // 取得要拿訂單資料的 id
    console.log(this.$route.params.id);
    this.getOrderDetail();
  },
};
</script>

<style lang="sass" scoped></style>
