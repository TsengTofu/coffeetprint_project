<!-- 購物車的畫面 -->
<template>
  <div>我是購物車的畫面</div>
  <CustomerOrderFormComponent />
</template>

<script>
import CustomerOrderFormComponent from '../../components/Front/CustomerOrderForm.vue';

export default {
  name: 'Cart',
  components: {
    CustomerOrderFormComponent,
    // HelloWorld, bind components
  },
};
</script>
<style lang="sass" scoped></style>
