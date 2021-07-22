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
            訂單總金額：NT$ <span>{{ Math.floor(orderDetail.total).toLocaleString() }}</span>
          </div>
          <!-- 使用者資料 -->
          <h5>使用者資料</h5>
          <div v-if="user">
            <p>訂購人地址：{{ user.address }}</p>
            <p>訂購人信箱：{{ user.email }}</p>
            <p>訂購人姓名：{{ user.name }}</p>
            <p>訂購人電話：{{ user.tel }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- NOTE  -->

    <!-- 訂單資料 -->
    <!-- TODO  這邊要確認一下 API -->
    <br>
    <div class="card" v-for="(item, key) in product_list" :key="item + key">
      <!-- 這個是產品本身 -->
      <!-- 如果是使用 coupon -->
      <p>{{ orderDetail.products[item].coupon }}</p>
      <p>購買的資料：{{ orderDetail.products[item].product.title }}<br></p>
      <!-- 這個是購買的數量 -->
      <p>{{ orderDetail.products[item].qty }} 張</p>
    </div>
    <!-- 這樣可以拿到 key 值 -->
    <!-- 可以拿到購買的品項 -->
    <p>{{ product_list }}</p>
    <button
      type="button"
      class="btn btn-primary"
      v-if="!orderDetail.is_paid"
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
      // 使用者資料
      user: {},
      order_id: '',
    };
  },
  methods: {
    // 取得剛成立的訂單
    getOrderDetail() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/order/${this.order_id}`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          const { success, order } = response.data;
          const { user, products } = order;
          if (success) {
            this.orderDetail = order;
            this.order_time = dayjs.unix(this.orderDetail.create_at).format('YYYY-MM-DD h:mm:ss A');
            this.user = user;
            this.product_list = Object.keys(products);
          } else {
            console.log('失敗');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 點擊付款按鈕
    goToPayment() {
      const oderId = this.$route.params.id;
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/pay/${oderId}`;
      this.axios
        .post(requestUrl)
        .then((response) => {
          const { message, success } = response.data;
          if (success) {
            this.$swal(message);
            this.getOrderDetail(oderId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.order_id = this.$route.params.id;
    this.getOrderDetail();
  },
};
</script>

<style scoped lang="sass">

</style>
