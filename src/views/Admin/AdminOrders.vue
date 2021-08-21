<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      @click="clearAllOrders"
    >
      清除所有訂單
    </button>
    <OrderListComponent
      :order_list="order_list"
      :pagination="pagination"
      @get-order-list="getOrderList"
    />
  </div>
</template>
<script>
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
      pagination: {},
    };
  },
  methods: {
    // 刪除全部訂單
    clearAllOrders() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/orders/all`;
      this.axios.delete(requestUrl)
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
            this.$swal(message);
            this.getOrderList();
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          // error
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
    // 取得訂單列表
    getOrderList() {
      //  TODO  page 先給值 1
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/orders?page=1`;
      this.axios.get(requestUrl)
        .then((response) => {
          const { success, pagination, orders } = response.data;
          if (success) {
            this.order_list = orders;
            this.pagination = pagination;
          }
        }).catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
  },
  mounted() {
    this.getOrderList();
  },
};
</script>
