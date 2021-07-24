<template>
    <div class="modal fade" id="couponModal" ref="modal" tabindex="-1">
    <div
      class="modal-xl
        modal-dialog
        modal-dialog-centered
        modal-dialog-scrollable
        wrapper"
    >
      <div
        class="modal-content
          product_card_wrapper"
      >
        <div class="modal-header header">
          <div class="left">
            <p>{{ status === 'post' ? '新增產品' : '編輯產品' }}</p>
            {{ tempCoupon.id }}
            <span data-bs-dismiss="modal" aria-label="Close">
              <span class="material-icons-round">clear</span>
            </span>
          </div>
          <span>
            {{ status === 'post' ?
              '請輸入產品資訊，並設定產品相關圖片。' : '請編輯產品相關資訊。' }}
          </span>
        </div>
        <div class="modal-body outer">
          <div class="container">
            <div class="content">
      <ul class="list-unstyled">
        <!-- 優惠券標題 -->
        <li class="single">
          <input
            id="coupon_title"
            type="text"
            placeholder="請輸入優惠券標題"
            v-model="tempCoupon.title"
          />
          <label for="coupon_title" class="text">優惠券標題<span>*</span></label>
        </li>
        <!-- 優惠百分比 -->
        <li class="single">
          <input
            id="coupon_percent"
            type="number"
            placeholder="請輸入優惠券百分比"
            v-model="tempCoupon.percent"
          />
          <label for="coupon_percent" class="text">優惠券百分比<span>*</span></label>
        </li>
        <!-- 日期的部分 -->
        <!-- 這邊要轉型別，就是會從字串 2021-01-02 轉 timestamp 才能加入 API -->
        <!-- 或者，考慮用日期選取器 DatePicker？ -->
        <!--  TODO  還是說放在優化？ -->
        <li class="single">
          <input
            id="coupon_due_date"
            type="date"
            placeholder="請輸入優惠券到期日"
            v-model="due_date"
          />
          <label for="coupon_due_date" class="text">優惠券到期日<span>*</span></label>
          <span>格式請寫成：YYYY-MM-DD</span>
        </li>
        <!-- Code 折價券的填寫號碼 -->
        <li class="single">
          <input
            id="coupon_code"
            type="text"
            placeholder="請輸入優惠券的代碼"
            v-model="tempCoupon.code"
            required
          />
          <label for="coupon_code" class="text">優惠券代碼<span>*</span></label>
        </li>
        <!--  TODO  是否啟用，複製那個 toggle 的部分 -->
        <li class="checkbox">
          <div class="switch">
            <input
              type="checkbox"
              :checked="tempCoupon.is_enabled"
              v-model="tempCoupon.is_enabled"
            />
            <span class="slider"></span>
          </div>
          <span>是否啟用此張優惠券</span>
        </li>
      </ul>
            </div>
          </div>
        </div>
        <div class="modal-footer button_block">
          <button class="cancel" data-bs-dismiss="modal" type="button">取消</button>
          <button @click="addNewCoupon" type="button">ADD確認</button>
          <!-- <button v-else @click="editCoupon" type="button">確認</button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import { Modal } from 'bootstrap';

export default {
  name: 'CouponCardComponent',
  props: {
    status: String,
    getCouponList: Function,
  },
  data() {
    return {
      // 為了要做日期的轉換
      due_date: '',
      tempCoupon: {
        // 乾脆全部都設定為必填畫面
        title: '',
        percent: '', // Number
        due_date: '', // 要傳入的值是 Number，所以要用到 dayjs 的 timestamp, Unix Timestamp
        code: '', // 優惠券要輸入的字串
        is_enabled: 0, // 預設是 0, Number
      },
    };
  },
  methods: {
    addNewCoupon() {
      this.tempCoupon.due_date = dayjs(this.due_date).unix();
      this.tempCoupon.percent = Number(this.tempCoupon.percent);
      this.tempCoupon.is_enabled = Number(this.tempCoupon.is_enabled);
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupon`;
      this.axios
        .post(requestUrl, { data: this.tempCoupon })
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
            this.$swal(message);
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
    // 編輯優惠券的部分
    editCoupon() {
      // id 的部分還沒找到
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.axios
        .put(requestUrl, { data: this.tempCoupon })
        .then((response) => {
          const { success } = response.data;
          if (success) {
            this.$swal('成功編輯該張優惠券！');
            this.getCouponList();
            this.modal.hide();
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
  },
  watch: {
    tempCoupon() {
      this.due_date = dayjs.unix(this.tempCoupon.due_date).format('YYYY-MM-DD');
    },
  },
  mounted() {
    // 這樣可以正常，但是 this.$dayjs 不會正常是為啥？
    this.modal = new Modal(this.$refs.modal);
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
</style>
