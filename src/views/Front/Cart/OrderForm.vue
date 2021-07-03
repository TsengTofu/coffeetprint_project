<template>
  <div>
    <p>填寫購物資料表單頁面</p>
    <p>這邊要可以回去上一頁，編輯購物車列表</p>
    <CustomerOrderFormComponent />
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
