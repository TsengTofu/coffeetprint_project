<template>
  <div>
    <p>哈囉我是後台優惠券列表頁</p>
    <CouponListComponent
      :coupon_list="coupon_list"
      :pagination="pagination" />
    <!-- 這邊下面是編輯的區域 -->
    <CouponCardComponent />
  </div>
</template>
<script>
import CouponListComponent from '../../components/Admin/Coupon/CouponList.vue';
import CouponCardComponent from '../../components/Admin/Coupon/CouponCard.vue';

export default {
  name: 'AdminCoupons',
  props: {},
  components: {
    CouponListComponent,
    CouponCardComponent,
  },
  data() {
    return {
      // 把撈到的優惠券列表抓出來
      coupon_list: [],
      // 跟換頁相關操作
      pagination: {},
    };
  },
  methods: {
    // 先拿全部的優惠券列表
    getCouponList() {
      //  TODO  這邊的頁碼要回來改 ${page};
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupons?page=1`;
      this.axios.get(requestUrl).then((response) => {
        const {
          success, coupons, pagination,
        } = response.data;
        console.log(response.data, 'xxxx');
        if (success) {
          this.coupon_list = coupons;
          this.pagination = pagination;
        }
      }).catch((error) => {
        console.log(error, 'error');
      });
    },
  },
  mounted() {
    this.getCouponList();
  },
};
</script>
