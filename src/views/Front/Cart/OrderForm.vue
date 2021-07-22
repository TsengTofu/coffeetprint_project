<template>
  <div>
    <CustomerOrderFormComponent />
    <p>這邊要可以回去上一頁，編輯購物車列表</p>
  </div>
</template>
<script>
import CustomerOrderFormComponent from '../../../components/Front/Cart/Data/CustomerOrderForm.vue';

export default {
  name: '',
  props: {},
  components: {
    CustomerOrderFormComponent,
  },
};
</script>
