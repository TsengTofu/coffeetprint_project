<template>
  <div>
    <p>我是優惠券列表「清單」</p>
    <!-- 這邊加上 1 個按鈕  FIXME  給新增優惠券的部分 -->
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#couponModal"
    >
    <!-- @click="setStatus('post', {})" -->
    <!--  FIXME  上面這段要再補上去 -->
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
                @click="setStatus('put', order)"
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
                @click="targetItem = order"
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
    <PaginationComponent
      :pagination_object="pagination"
    />
  </div>
</template>
<script>
// 引入 Pagination
import PaginationComponent from '../../Core/Modal/Pagination.vue';

export default {
  name: 'CouponListComponent',
  props: {
    coupon_list: Array,
    pagination: Object,
  },
  components: {
    PaginationComponent,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log('優惠券列表清單', this.coupon_list);
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
