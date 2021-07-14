<template>
  <div>
    <p>優惠券的編輯卡片</p>
    <!--  TODO  之後再來看可以怎麼調整成 Modal -->
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
            type="text"
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
            v-model="tempCoupon.due_date"
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
              v-model="tempCoupon.is_enabled"
            />
            <span class="slider"></span>
          </div>
          <span>是否啟用此張優惠券</span>
        </li>
      </ul>
      <!-- 新增優惠券的按鈕 -->
      <!-- 這邊要綁定事件 -->
      <!--  TODO  研究一下 submit 跟 form 表單的檢查 -->
      <button
        class="btn btn-primary"
        @click="addNewCouponCode"
        type="button">
        新增優惠券
      </button>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';

export default {
  name: 'CouponCardComponent',
  props: {},
  data() {
    return {
      // 這邊先暫時放置優惠券的相關資料
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
    addNewCouponCode() {
      // 其實應該要先檢查有沒有必填沒填寫的？
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupon`;
      this.axios.post(requestUrl, { data: this.tempProduct })
        .then((response) => {
          console.log(response, 'response');
        })
        .catch((error) => {
          console.log(error, 'error');
        });
    },
  },
  mounted() {
    // 這樣可以正常，但是 this.$dayjs 不會正常是為啥？
    console.log('不寫 newDate 的版本', dayjs().unix());
    console.log(dayjs.unix(1626268982).format('YYYY-MM-DD'));
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
