<template>
    <div class="card mt-4">
      <div class="card-header common_row_space_between">
        <h5 class="common_row_align">
          <div
            class="common_row_align"
            v-if="orderDetail.is_paid"
          >
            <b class="me-2">
              <span class="material-icons-round">verified</span>已付款
            </b>
            訂單 {{ orderDetail.id }}
          </div>
          <div
            class="common_row_align"
            v-else
          >
            <b class="me-2">
              <span class="material-icons-round">clear</span>未付款
            </b>
            訂單{{ orderDetail.id }}
          </div>
        </h5>
        <div class="common_row_align">
          <button
            type="button"
            class="btn btn-outline-secondary me-2"
            @click="copyOrderID"
          >
            複製訂單編號
          </button>
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
      </div>
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h4>使用者資料</h4>
              <div v-if="user">
                <p>訂購人地址：{{ user.address }}</p>
                <p>訂購人信箱：{{ user.email }}</p>
                <p>訂購人姓名：{{ user.name }}</p>
                <p>訂購人電話：{{ user.tel }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <h4>訂單內容</h4>
              <figcaption>結帳時間：{{ order_time }}</figcaption>
              <p>
                訂單總金額：NT$ <span>{{ Math.floor(orderDetail.total).toLocaleString() }}</span>
              </p>
              <div class="d-flex align-items-center mb-4"
                v-for="(item, key) in product_list" :key="item + key">
                <!-- 如果是使用 coupon -->
                <div class="image col-3">
                  <img
                    :src="orderDetail.products[item].product.imageUrl"
                    alt="購買品項的圖片"
                  >
                </div>
                <div class="content">
                  <p>
                    <span>{{ orderDetail.products[item].product.category }}</span>
                    {{ orderDetail.products[item].product.title }} 折價券
                     x {{ orderDetail.products[item].qty }} 張
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          type="text"
          ref="order_id"
          v-model="orderDetail.id"
          class="no_show"
        >
      </div>
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
  position: absolute
  bottom: 0px
.card
  text-align: justify
  position: relative
  h5
    margin: 0px
.card-header
  display: flex
  @media (max-width: 525px)
    flex-direction: column
    font-size: 1rem
.image
  margin: 0 1rem 0 0
  img
    width: 100%
    height: auto
</style>
