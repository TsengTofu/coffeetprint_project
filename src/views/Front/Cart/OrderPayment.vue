<template>
  <div class="order_payment_wrapper">
    <p>要付款的畫面</p>
    <CheckoutStepComponent
      step="order_payment"
    />
    <OrderPaymentComponent />
  </div>
</template>

<script>
import CheckoutStepComponent from '../../../components/Front/Cart/CheckoutStep.vue';
import OrderPaymentComponent from '../../../components/Front/Cart/Payment/OrderPayment.vue';

export default {
  name: '',
  props: {},
  components: {
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
.order_payment_wrapper
  padding: 120px 0px
</style>
