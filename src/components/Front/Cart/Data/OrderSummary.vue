<template>
  <div class="order_summary_wrapper">
    <p>訂單摘要</p>
    <ul class="list-unstyled">
      <li>
        <p>商品總計</p>
      </li>
      <li>
        <p>運費總計</p>
      </li>
      <li>
        <p>其他折抵</p>
      </li>
    </ul>
    <!-- 這邊放那個使用折扣的部分 -->
    <UseCouponComponent />
  </div>
</template>

<script>
import UseCouponComponent from '../UseCoupon.vue';

export default {
  name: 'OrderSummaryComponent',
  props: {},
  components: {
    UseCouponComponent,
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="sass">
.order_summary_wrapper
  width: 20%
  border-radius: 16px
  background: #F7F5F4
  overflow: hidden
  > p
    background: #000
    color: #FFF
    padding: 1rem
</style>
