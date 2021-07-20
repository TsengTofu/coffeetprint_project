<template>
  <div class="order_summary_wrapper">
    <p>訂單摘要</p>
    <ul class="list-unstyled">
      <li>
        <p>商品總計</p>
        <p>NT$ <span>{{ total }}</span></p>
      </li>
      <li>
        <p>使用折價券折抵</p>
         <UseCouponComponent />
         <!--  TODO  這邊是否要顯示相關優惠券資訊呢？ -->
      </li>
      <li>
        <p>結帳總金額</p>
        <p>NT$ <span>{{ final_total }}</span></p>
      </li>
    </ul>
  </div>
</template>

<script>
import UseCouponComponent from '../UseCoupon.vue';

export default {
  name: 'OrderSummaryComponent',
  props: {
    final_total: Number,
    total: Number,
  },
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
  border-radius: 16px
  background: #F7F5F4
  overflow: hidden
  > p
    background: #000
    color: #FFF
    padding: 1rem
</style>
