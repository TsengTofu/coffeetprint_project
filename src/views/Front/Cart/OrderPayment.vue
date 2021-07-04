<template>
  <div class="order_payment_wrapper">
    <p>要付款的畫面</p>
    <OrderPaymentComponent />
  </div>
</template>

<script>
import OrderPaymentComponent from '../../../components/Front/Cart/Payment/OrderPayment.vue';

export default {
  name: '',
  props: {},
  components: {
    OrderPaymentComponent,
  },
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style lang="sass" scoped>
.order_payment_wrapper
  padding: 120px 0px
  // background: #000
</style>
