<template>
  <div>
    <p>這個是給訂單列表頁的元件</p>
    {{ order_list }}
    <table class="table table-striped table-hover">
       <thead>
         <!-- 先都放在 table 上，之後再決定要不要換版面 -->
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
        <!-- TODO  如果現在沒有人訂單 -->
        <template v-for="(order, key) in order_list" :key="'order_' + key">
          <tr>
            <td>{{ order.id }}</td>
            <td>{{ order.is_paid }}</td>
            <td>{{ order.paid_date }}</td>
            <td>NT$ {{ order.total.toLocaleString() }}</td>
            <td>
              <button type="button">詳細內容</button>
            </td>
            <!-- 這段還要重新處理訂購的資料，因為他的 array object 有 key 值，要先把 key 值轉出來 -->
            <td>{{ order.create_at }}</td>
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
                <!-- <button class="icon_btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#confirmModal"
                @click="targetItem = item"
              > -->
              <button class="icon_btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#confirmModal"
              >
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
    <!-- <ConfirmModalComponent /> -->
    <!-- 下面這裡還要加上 -->
    <!-- :target_item="targetItem" -->
    <!-- ref="confirm_modal" -->
    <!-- id="confirmModal" -->
    <!-- @emit-delete="deleteCurrentProduct(targetId)" -->
  </div>
</template>

<script>
import OrderCardComponent from './OrderCard.vue';
// import ConfirmModalComponent from '../../Core/Modal/ConfirmModal.vue';

export default {
  name: 'OrderListComponent',
  props: {
    order_list: Array,
  },
  components: {
    OrderCardComponent,
    // ConfirmModalComponent,
  },
  mounted() {},
};
</script>
<style lang="sass" scoped></style>
