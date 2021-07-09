<template>
  <div>
    <p>這個是給訂單列表頁的元件</p>
    <!-- {{ order_list }} -->
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
        <!-- TODO  如果現在沒有訂單 -->
        <template v-for="(order, key) in order_list" :key="'order_' + key">
          <tr>
            <td>{{ order.id }}</td>
            <td v-if="order.is_paid">
              <span class="material-icons-round">check_circle</span>已付款
            </td>
            <td v-else>
              <span class="material-icons-round">do_not_disturb_on</span>未付款
            </td>
            <td>{{ $dayjs.unix(order.paid_date).format('YYYY-MM-DD') }}</td>
            <td>NT$ {{ order.total.toLocaleString() }}</td>
            <td>
              <button type="button">詳細內容</button>
            </td>
            <!-- 這段還要重新處理訂購的資料，因為他的 array object 有 key 值，要先把 key 值轉出來 -->
            <td>{{ $dayjs.unix(order.create_at).format('YYYY-MM-DD') }}</td>
            <!-- 編輯跟刪除 -->
            <td>
              <!--  FIXME  這邊要再回來改 -->
              <!-- <button class="icon_btn"
                type="button"
                @click="setStatus('put', item)"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              > -->
              <button>
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
                <!-- 刪除的實際功能還沒有寫過 -->
                <span class="material-icons-round">delete</span>
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <!-- 這個是 POPUP CARD MODAL 會用的 -->
    <OrderCardComponent />
    <!-- 確認的 Modal -->
    <!--  TODO  試試看用 slot 改寫 -->
    <ConfirmModalComponent
      ref="confirm_modal"
      id="confirmModal"
      @emit-delete="deleteCurrentProduct(targetId)">
       <template v-slot:delete_item>訂單：{{ targetItem.id }}</template>
       <template v-slot:delete_content>
       <div class="img_part"></div>
          <div class="info_detail">
            是否已付款：<p>{{ targetItem.is_paid }}</p>
            總金額：<p>{{ targetItem.total }}</p>
            數量：<p>{{ targetItem.num }}</p>
          </div>
       </template>
    </ConfirmModalComponent>
  </div>
</template>

<script>
import OrderCardComponent from './OrderCard.vue';
import ConfirmModalComponent from '../../Core/Modal/ConfirmModal.vue';

export default {
  name: 'OrderListComponent',
  props: {
    order_list: Array,
  },
  components: {
    OrderCardComponent,
    ConfirmModalComponent,
  },
  data() {
    return {
      targetItem: {},
      targetId: '',
      orderList: this.order_list,
    };
  },
  methods: {
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
          if (response.data.success) {
            console.log('有正常刪除啦');
            this.$emit('getOrderList');
          } else {
            console.log('出了點錯誤，請稍後再嘗試，謝謝。');
          }
        })
        .catch((error) => {
          console.log(error, 'deleteProductAPIError');
        });
    },
  },
  mounted() {
    console.log(this.$dayjs.unix(1625325764).format('YYYY-MM-DD'));
  },
};
</script>
<style lang="sass" scoped></style>
