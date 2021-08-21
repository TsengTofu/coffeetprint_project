<template>
  <div class="col-md-6">
    <!--  TODO  需要回頭思考一下版面的問題 -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          訂單 {{ orderDetail.id }}
          <span v-if="orderDetail.is_paid">已完成</span>
          <span v-else>等待付款中！</span>
        </h5>
        <button
          type="button"
          class="btn btn-primary"
          @click="copyOrderID"
        >
          複製訂單編號
        </button>
        <input
          type="text"
          ref="order_id"
          v-model="orderDetail.id"
          class="no_show"
        >
        <!--  TODO  這邊要做日期的轉換 -->
        <figcaption>結帳時間：{{ order_time }}</figcaption>
        <div class="card-text">
          <b
            class="d-flex"
            v-if="orderDetail.is_paid"
          >
            <span class="material-icons-round">verified</span>已付款
          </b>
          <b
            class="d-flex"
            v-else
          >
            <span class="material-icons-round">clear</span>未付款
          </b>
          <div>
            訂單總金額：NT$ <span>{{ Math.floor(orderDetail.total).toLocaleString() }}</span>
          </div>
          <div class="card col-3" v-for="(item, key) in product_list" :key="item + key">
            <!-- 這個是產品本身 -->
            <!-- 如果是使用 coupon -->
            <p>{{ orderDetail.products[item].coupon }}</p>
            <p>購買的資料：{{ orderDetail.products[item].product.title }}<br></p>
            <!-- 這個是購買的數量 -->
            <p>{{ orderDetail.products[item].qty }} 張</p>
            <img
              :src="orderDetail.products[item].product.imageUrl"
              alt="購買品項的圖片"
            >
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
    <button
      type="button"
      class="btn btn-primary d-flex"
      v-if="!orderDetail.is_paid"
      @click="goToPayment"
    >
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
    // 複製訂單號碼
    copyOrderID() {
      this.$refs.order_id.select();
      this.$refs.order_id.setSelectionRange(0, 99999);
      document.execCommand('copy');
    },
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
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
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
            // 導頁
            this.$router.push(`/order/complete/${oderId}`);
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
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
.no_show
  opacity: 0
</style>
