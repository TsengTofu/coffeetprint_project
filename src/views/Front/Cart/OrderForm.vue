<template>
  <div class="order_form_wrapper">
    <TopBannerComponent
      main_title="美食已在托盤上"
      vice_title="手刀結帳，找朋友聚餐啦！"
    />
    <div class="order_form_content">
      <CheckoutStepComponent
        step="order_info"
      />
      <div class="container d-flex mb-4 mt-4">
        <CustomerOrderFormComponent />
        <div class="col-md-6 test"></div>
      </div>
    </div>
  </div>
</template>
<script>
import TopBannerComponent from '../../../components/Core/Layout/TopBanner.vue';
import CheckoutStepComponent from '../../../components/Front/Cart/CheckoutStep.vue';
import CustomerOrderFormComponent from '../../../components/Front/Cart/Data/CustomerOrderForm.vue';

export default {
  name: '',
  props: {},
  components: {
    TopBannerComponent,
    CheckoutStepComponent,
    CustomerOrderFormComponent,
  },
};
</script>

<style lang="sass" scoped>
.order_form_wrapper
  padding: 59px 0 0 0
  background: #f7f5f4
.order_form_content
  position: relative
  z-index: 5
  padding: 2rem 0 0 0
.test
  background: url('../../../../public/images/form.jpg')
  background-size: cover
  background-position: 0 80%
</style>
