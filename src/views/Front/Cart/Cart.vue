<!-- 購物車的畫面 -->
<template>
  <div class="cart_wrapper">
    <CheckoutStepComponent />
    <div class="container d-flex cart_container">
      <CartListComponent @disabled-next-step="isEmpty = true" />
      <OrderSummaryComponent />
    </div>
    <button type="button"
      :disabled="isEmpty === true"
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
    };
  },
  methods: {
    directToFormPage() {
      console.log('有喔');
      // if (!this.isEmpty) {
      this.$router.push('/cart/form');
      // }
    },
  },
  mounted() {},
};
</script>
<style lang="sass" scoped>
.cart_wrapper
  padding: 120px 0 0 0
</style>
