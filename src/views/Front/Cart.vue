<!-- 購物車的畫面 -->
<template>
  <CheckoutStepComponent />
  <div class="container d-flex cart_container">
    <CartListComponent />
    <OrderSummaryComponent />
  </div>
  <CustomerOrderFormComponent />
</template>

<script>
import CustomerOrderFormComponent from '../../components/Front/Cart/Data/CustomerOrderForm.vue';
import CartListComponent from '../../components/Front/Cart/Data/CartList.vue'; // 購物車的列表
import OrderSummaryComponent from '../../components/Front/Cart/Data/OrderSummary.vue'; // 購物車概要
import CheckoutStepComponent from '../../components/Front/Cart/CheckoutStep.vue'; // 步驟流程

export default {
  name: 'Cart', // page 類型不需要加上後綴
  components: {
    CustomerOrderFormComponent,
    CartListComponent,
    OrderSummaryComponent,
    CheckoutStepComponent,
  },
};
</script>
<style lang="sass" scoped></style>
