<template>
  <div>
    <table class="table table-striped table-hover">
       <thead>
         <tr>
           <th>訂單編號</th>
           <th>是否付款</th>
           <th>付款日期</th>
           <th>訂單總金額</th>
           <!-- 訂購人跟訂購的產品資訊 -->
           <th>詳細資訊</th>
           <th>建立時間</th>
           <th>編輯</th>
           <th>刪除</th>
         </tr>
      </thead>
      <tbody>
        <template v-if="order_list.length > 0">
          <tr v-for="(order, key) in order_list" :key="'order_' + key">
            <td>{{ order.id }}</td>
            <td v-if="order.is_paid">
              <span class="material-icons-round">check_circle</span>已付款
            </td>
            <td v-else>
              <span class="material-icons-round">do_not_disturb_on</span>未付款
            </td>
            <td v-if="order.is_paid">{{ $dayjs.unix(order.paid_date).format('YYYY-MM-DD') }}</td>
            <td v-else>/</td>
            <td>NT$ {{ order.total.toLocaleString() }}</td>
            <td>
              <!-- 點開可以看到訂單的詳細內容 -->
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#orderDetailModal"
              >詳細內容</button>
            </td>
            <!-- 這段還要重新處理訂購的資料，因為他的 array object 有 key 值，要先把 key 值轉出來 -->
            <td>{{ $dayjs.unix(order.create_at).format('YYYY-MM-DD') }}</td>
            <!-- 編輯跟刪除 -->
            <td>
              <!--  FIXME  這邊要再回來改 -->
              <button class="icon_btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#orderModal"
                @click="setStatus('put', order)"
              >
                <span class="material-icons-round">edit</span>
              </button>
            </td>
            <td>
              <button class="icon_btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#confirmModal"
                @click="targetItem = order"
              >
                <span class="material-icons-round">delete</span>
              </button>
            </td>
          </tr>
        </template>
        <!-- 如果訂單列表是空的 -->
        <template v-else>
          <!-- TODO  這邊要在自己加上是空的圖片 -->
          目前的訂單列表是空的，請多推廣自己的網站
        </template>
      </tbody>
    </table>
    <ConfirmModalComponent
      ref="confirm_modal"
      id="confirmModal"
      @emit-delete="deleteCurrentProduct(targetId)">
       <template v-slot:delete_item>訂單：{{ targetItem.id }}</template>
       <template v-slot:delete_content>
       <div class="img_part"></div>
          <div class="info_detail">
            <p>還沒撈資料的部分</p>
            <br>
            是否已付款：<p>{{ targetItem.is_paid }}</p>
            總金額：<p>{{ targetItem.total }}</p>
            數量：<p>{{ targetItem.num }}</p>
          </div>
       </template>
    </ConfirmModalComponent>
    <!-- TODO  這邊要放 emit -->
    <OrderCardComponent
      ref="order_modal"
      id="orderModal"
      :status="status"
    />
    <!-- 這是點開出現詳細的 popup -->
    <OrderDetailCardComponent
      ref="order_detail_modal"
      id="orderDetailModal"
    />
    <!-- Pagination -->
    <PaginationComponent
      :pagination_object="pagination"
      @emit-change-page="getData"
    />
  </div>
</template>

<script>
import OrderCardComponent from './OrderCard.vue';
import ConfirmModalComponent from '../../Core/Modal/ConfirmModal.vue';
import PaginationComponent from '../../Core/Modal/Pagination.vue';
import OrderDetailCardComponent from './OrderDetailCard.vue';

export default {
  name: 'OrderListComponent',
  props: {
    order_list: Array,
    pagination: Object,
  },
  components: {
    OrderCardComponent,
    ConfirmModalComponent,
    PaginationComponent,
    OrderDetailCardComponent,
  },
  data() {
    return {
      targetItem: {},
      targetId: '',
      orderList: this.order_list,
      // status data
      status: '',
    };
  },
  methods: {
    // setStatus for modal
    setStatus(axiosMethod, data) {
      this.status = axiosMethod;
      // 為什麼可以這樣寫？
      //  TODO  這邊要再改
      this.$refs.order_modal.tempOrder = JSON.parse(JSON.stringify(data));
    },
    //  TODO  這邊可以這樣寫嗎？
    getData() {
      this.$emit('getOrderList');
    },
    // 刪除單筆訂單
    deleteCurrentProduct() {
      let newIndex = 0;
      this.targetId = this.targetItem.id;
      this.orderList.forEach((item, key) => {
        if (this.targetId === item.id) {
          newIndex = key;
        }
      });
      this.deleteProductAPI();
      this.orderList.splice(newIndex, 1);
    },
    deleteProductAPI() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/order/${this.targetId}`;
      this.axios
        .delete(requestUrl)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            this.$swal('有正常刪除啦');
            this.$emit('getOrderList');
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
  },
  mounted() {
  },
};
</script>
<style lang="sass" scoped>
.icon_btn
  background: none
  border: none
  &:hover
    span
      color: #a97f4a
</style>
