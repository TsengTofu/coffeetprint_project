<template>
  <div class="order_summary_wrapper">
    <ul class="list-unstyled">
      <li class="common_row_space_between">
        <p>商品總計</p>
        <p>NT$ <span>{{ total.toLocaleString() }}</span></p>
      </li>
      <li class="common_row_space_between">
        <p class="me-2">折扣代碼</p>
        <UseCouponComponent />
         <!--  TODO  這邊是否要顯示相關優惠券資訊呢？ -->
      </li>
      <li class="common_row_space_between">
        <p>總金額</p>
        <p>NT$ <span>{{ final_total.toLocaleString() }}</span></p>
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
  li
    p
      font-weight: bold
</style>
