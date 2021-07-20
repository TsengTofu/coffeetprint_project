<template>
  <div class="card">
    <!-- 這邊要多一個功能，可以直接複製訂單編號 -->
    <div class="card">
      <!-- <img src="" class="card-img-top" alt="..."> -->
      <div class="card-body">
        <h5 class="card-title">訂單 {{ orderDetail.id }} 等待付款中！</h5>
        <!--  TODO  這邊要做日期的轉換 -->
        <figcaption class="blockquote-footer">結帳時間：{{ order_time }}</figcaption>
        <div class="card-text">
          <!-- 這裡面是卡片的內容 -->
          <!-- 是否已經付款 -->
          <b v-if="orderDetail.is_paid">已付款</b>
          <b v-else>未付款</b>
          <hr>
          <div>
            訂單總金額：NT$ <span>{{ Math.floor(orderDetail.total) }}</span>
          </div>
          <!-- 使用者資料 -->
          <h5>使用者資料</h5>
          <div v-if="orderDetail.user">
            <p>訂購人地址：{{ orderDetail.user.address }}</p>
            <p>訂購人信箱：{{ orderDetail.user.email }}</p>
            <p>訂購人姓名：{{ orderDetail.user.name }}</p>
            <p>訂購人電話：{{ orderDetail.user.tel }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- NOTE  -->

    <!-- 訂單資料 -->
    <!-- TODO  這邊要確認一下 API -->
    <br>
    <template v-for="(item, key) in product_list" :key="item + key">
      <div class="card">
        <!-- FIXME  這邊應該會是明天要處理的重點 -->
        <!-- 測試一下：{{ orderDetail.products[item] }}<br> -->
        <p>優惠券資料：{{ orderDetail.products[item].coupon }}<br></p>
      </div>
    </template>
    <!-- 這樣可以拿到 key 值 -->
    <!-- 可以拿到購買的品項 -->
    <p>{{ Object.keys(orderDetail.products) }}</p>
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
  },
};
</script>

<style scoped lang="sass">

</style>
