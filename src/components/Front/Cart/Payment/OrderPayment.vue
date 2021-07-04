<template>
  <div class="card">
    <!-- 這邊要多一個功能，可以直接複製訂單編號 -->
    <p>{{ orderDetail.id }}</p>
    <!-- 這邊要做日期的轉換 -->
    <p>建立時間：{{ order_time }}</p>
    <p>是否已經付款：{{ orderDetail.is_paid }}</p>
    <p>訂單總金額：{{ orderDetail.total }}</p>
    <!-- 這塊還需要去做拆分 -->
    <p>使用者資料：{{ orderDetail.user }}</p>
    <!-- 訂單資料 -->
    <!-- TODO  這邊要確認一下 API -->
    <br>
    <template v-for="(item, key) in product_list" :key="item + key">
      <div class="card">
        測試一下：{{ orderDetail.products[item] }}<br>
      </div>
    </template>
    <!-- 這樣可以拿到 key 值 -->
    <!-- <p>{{ Object.keys(orderDetail.products) }}</p> -->
    <button
      type="button"
      class="btn btn-primary"
      @click="goToPayment">
      付款結帳
      <span class="material-icons-round">keyboard_arrow_right</span>
    </button>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'OrderPaymentComponent',
  props: {},
  components: {},
  data() {
    return {
      orderDetail: {},
      // 要轉出購物清單的部分
      product_list: [],
      // 訂單時間
      order_time: '',
    };
  },
  methods: {
    // 取得剛成立的訂單
    getOrderDetail() {
      const oderId = this.$route.params.id;
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/order/${oderId}`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          console.log(response, 'response 這筆訂單的資料');
          const { success, order } = response.data;
          if (success) {
            this.orderDetail = order;
            // 處理單一產品資料
            this.product_list = Object.keys(this.orderDetail.products);
            this.order_time = dayjs.unix(this.orderDetail.create_at).format('YYYY-MM-DD h:mm:ss A');
          } else {
            console.log('失敗');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 付款去 API 串接
    goToPayment() {
      const oderId = this.$route.params.id;
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/pay/${oderId}`;
      this.axios
        .post(requestUrl)
        .then((response) => {
          console.log(response, '成功改變資料狀態');
          // 如果成功才可以跳轉
          this.$router.push('/order/complete');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    // 取得要拿訂單資料的 id
    console.log(this.$route.params.id);
    this.getOrderDetail();
    console.log(dayjs);
  },
};
</script>

<style scoped lang="sass">

</style>
