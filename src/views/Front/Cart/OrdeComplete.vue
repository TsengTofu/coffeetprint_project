<template>
  <div class="order_complete_wrapper">
    <TopBannerComponent
      main_title="美食已在托盤上"
      vice_title="手刀結帳，找朋友聚餐啦！"
    />
    <div class="order_complete_content container">
      <CheckoutStepComponent
        step="order_complete"
      />
      <OrderPaymentComponent />
    </div>
  </div>
</template>

<script>
import CheckoutStepComponent from '../../../components/Front/Cart/CheckoutStep.vue';
import TopBannerComponent from '../../../components/Core/Layout/TopBanner.vue';
import OrderPaymentComponent from '../../../components/Front/Cart/Payment/OrderPayment.vue';

export default {
  name: 'OrderComplete',
  props: {},
  components: {
    TopBannerComponent,
    CheckoutStepComponent,
    OrderPaymentComponent,
  },
  data() {
    return {
    };
  },
  methods: {},
  mounted() {
  },
};
</script>

<style lang="sass" scoped>
.order_complete_wrapper
  padding: 59px 0 50px 0
  background: #f7f5f4
.order_complete_content
  position: relative
  z-index: 5
  padding: 2rem 0 0 0
</style>
