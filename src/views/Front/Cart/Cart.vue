<!-- 購物車的畫面 -->
<template>
  <div class="container cart_wrapper">
    <CheckoutStepComponent />
    <div class="d-flex cart_container">
      <CartListComponent
        :cart_list="cart_list"
        :getCartList="getCartList"
      />
    </div>

    <OrderSummaryComponent />
    <button type="button"
      :disabled="cart_list.length === 0"
      class="btn btn-primary"
      @click="directToFormPage"
    >填寫訂購資料</button>
  </div>
</template>

<script>

import CartListComponent from '../../../components/Front/Cart/Data/CartList.vue'; // 購物車的列表
import OrderSummaryComponent from '../../../components/Front/Cart/Data/OrderSummary.vue'; // 購物車概要
import CheckoutStepComponent from '../../../components/Front/Cart/CheckoutStep.vue'; // 步驟流程

export default {
  name: 'Cart', // page 類型不需要加上後綴
  components: {
    CartListComponent,
    OrderSummaryComponent,
    CheckoutStepComponent,
  },
  props: {},
  data() {
    return {
      isEmpty: '',
      cart_list: '',
    };
  },
  methods: {
    directToFormPage() {
      this.$router.push('/cart/form');
    },
    getCartList() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          if (response.data.success) {
            console.log('成功抓到購物車列表的資料', response.data.data);
            //  TODO  單就購物車的列表，不包含總金額 total, final_total
            this.cart_list = response.data.data.carts;
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
    this.getCartList();
  },
};
</script>
<style lang="sass" scoped>
.cart_wrapper
  padding: 120px 0 0 0
</style>
