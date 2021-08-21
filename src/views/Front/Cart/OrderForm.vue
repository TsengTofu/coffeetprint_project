<template>
  <div class="order_form_wrapper">
    <div class="top_banner container-fluid">
      <div class="describe">
        <p>美食已在托盤上</p>
        <span>手刀結帳，找朋友聚餐啦！</span>
      </div>
    </div>
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
import CheckoutStepComponent from '../../../components/Front/Cart/CheckoutStep.vue';
import CustomerOrderFormComponent from '../../../components/Front/Cart/Data/CustomerOrderForm.vue';

export default {
  name: '',
  props: {},
  components: {
    CustomerOrderFormComponent,
    CheckoutStepComponent,
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
  background: url('../../../../public/form.jpg')
  background-size: cover
  background-position: 0 80%
// 上半部
.describe
  text-align: justify
.top_banner
  padding: 0px
  height: 350px
  background-image: url('../../../../public/cart.jpg')
  background-size: cover
  background-position: bottom
  display: flex
  align-items: center
  justify-content: center
  position: relative
  &::after
    content: ''
    background-position: top
    background-image: url('../../../assets/images/wave.svg')
    background-size: cover
    display: block
    width: 100%
    height: 150px
    position: absolute
    bottom: -80px
    z-index: 1
  @media (max-width: 525px)
    &::after
      background-image: url('../../../assets/images/wave_s.png')
  p
    font-weight: bold
    font-size: 2rem
    margin: 0 0 .5rem
  span
    font-weight: 500
</style>
