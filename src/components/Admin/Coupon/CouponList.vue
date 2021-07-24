<template>
  <div>
    <p>我是優惠券列表「清單」</p>
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#couponModal"
      @click="setStatus('post', {})"
    >
    新增優惠券
    </button>
      <table class="table table-striped table-hover">
       <thead>
         <tr>
           <!--  TODO  這邊有編輯跟刪除的 API -->
           <th>編號</th>
           <th>折扣碼</th>
           <th>到期日</th>
           <th>是否啟用</th>
           <th>折扣百分比</th>
           <th>標題</th>
           <th>編輯</th>
           <th>刪除</th>
         </tr>
      </thead>
      <tbody>
          <tr v-for="(coupon, key) in coupon_list" :key="'coupon_' + key">
            <td>{{ coupon.id }}</td>
            <td>{{ coupon.code }}</td>
            <td>{{ $dayjs.unix(coupon.due_date).format('YYYY-MM-DD') }}</td>
            <!-- 是否啟用 -->
            <!--  FIXME  這邊要記得加上樣式 -->
            <td>
              <div class="checkbox">
                <div class="switch">
                  <input
                    type="checkbox"
                    :checked="coupon.is_enabled"
                    disabled
                  />
                  <span class="slider"></span>
                </div>
                <span>是否啟用</span>
              </div>
            </td>
            <td>{{ coupon.percent }} %</td>
            <td>{{ coupon.title }}</td>
            <!-- 編輯跟刪除 -->
            <td>
              <button class="icon_btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#couponModal"
                @click="setStatus('put', coupon)"
              >
                <span class="material-icons-round">edit</span>
              </button>
            </td>
            <!-- 刪除按鈕 -->
            <td>
              <button class="icon_btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#confirmModal"
                @click="targetItem = coupon"
              >
                <span class="material-icons-round">delete</span>
              </button>
            </td>
          </tr>
        <!-- 如果列表是空的 -->
        <!-- <template v-else>
          目前的訂單列表是空的，請多推廣自己的網站
        </template> -->
      </tbody>
    </table>
    <CouponCardComponent
      ref="modal"
      :status="status"
      id="couponModal"
      :getCouponList="getCouponList"
    />
    <ConfirmModalComponent
      ref="confirm_modal"
      id="confirmModal"
      @emit-delete="deleteCurrentCoupon"
    >
      <template v-slot:delete_item>
        <!-- 產品：{{  }} -->
      </template>
      <template v-slot:delete_content>
        <div class="img_part"></div>
          <div class="info_detail">
           <!-- 這邊是內容 -->
          </div>
      </template>
    </ConfirmModalComponent>
    <PaginationComponent
      :pagination_object="pagination"
    />
  </div>
</template>
<script>
import PaginationComponent from '../../Core/Modal/Pagination.vue';
import ConfirmModalComponent from '../../Core/Modal/ConfirmModal.vue';
import CouponCardComponent from './CouponCard.vue';

export default {
  name: 'CouponListComponent',
  props: {
    coupon_list: Array,
    pagination: Object,
    getCouponList: Function,
  },
  components: {
    PaginationComponent,
    ConfirmModalComponent,
    CouponCardComponent,
  },
  data() {
    return {
      targetId: '',
      targetItem: {},
    };
  },
  methods: {
    //  TODO  這邊要看一下 SetStatus
    // 改變傳入 Modal 的 Status
    setStatus(axiosMethod, data) {
      this.status = axiosMethod;
      // 為什麼可以這樣寫？
      this.$refs.modal.tempCoupon = JSON.parse(JSON.stringify(data));
    },
    // FIXME  查一下原本這支 function：deleteCurrentProduct 有必要的話再加回來
    deleteCurrentCoupon() {
      this.targetId = this.targetItem.id;
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupon/${this.targetId}`;
      this.axios.delete(requestUrl)
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
            this.$swal(message);
            // 通知外層要更新畫面
            this.$emit('emit-get-coupons');
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
.checkbox
  // 這段開始是 switch 按鈕
  justify-content: flex-start
  align-items: center
  span
    padding: 0 0 0 8px
  .switch
    position: relative
    display: inline-block
    width: 40px
    height: 20px
    vertical-align: middle
    input
      opacity: 0
      width: 100%
      height: 100%
      z-index: 999
      position: absolute
      left: 0px
      margin: 0px
      &:checked + .slider
        background-color: #4c443a
        &:before
          transform: translateX(20px)
      &:focus + .slider
        box-shadow: 0 0 1px #2196F3
    .slider
      position: absolute
      cursor: pointer
      top: 0
      left: 0
      right: 0
      bottom: 0
      background-color: #ccc
      transition: .4s
      border-radius: 34px
      &:before
        position: absolute
        content: ""
        height: 14px
        width: 14px
        left: 3px
        bottom: 3px
        background-color: white
        transition: .4s
        border-radius: 50%
        // 結束
</style>
