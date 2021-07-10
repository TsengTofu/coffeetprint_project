<template>
  <div>
    <p>哈囉我是後台訂單列表頁</p>
    <OrderListComponent
      :order_list="order_list"
      :pagination="pagination"
      @get-order-list="getOrderList"
    />
  </div>
</template>
<script>
// 引入 orderList
import OrderListComponent from '../../components/Admin/Order/OrderList.vue';

export default {
  name: 'AdminOrders',
  props: {},
  components: {
    OrderListComponent,
  },
  data() {
    return {
      order_list: [],
      // page
      pagination: {},
    };
  },
  methods: {
    // 取得訂單列表
    getOrderList() {
      //  TODO  page 先給值 1
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/orders?page=1`;
      this.axios.get(requestUrl)
        .then((response) => {
          console.log(response.data, '訂單列表的資料');
          const { success, pagination, orders } = response.data;
          if (success) {
            this.order_list = orders;
            this.pagination = pagination;
          }
        }).catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getOrderList();
  },
};
</script>
