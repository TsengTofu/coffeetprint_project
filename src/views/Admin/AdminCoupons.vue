<template>
  <div>
    <p>哈囉我是後台優惠券列表頁</p>
    <CouponListComponent
      :coupon_list="coupon_list"
      :pagination="pagination"
      :getCouponList="getCouponList"
      @emit-get-coupons="getCouponList"
    />
  </div>
</template>
<script>
import CouponListComponent from '../../components/Admin/Coupon/CouponList.vue';

export default {
  name: 'AdminCoupons',
  props: {},
  components: {
    CouponListComponent,
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
    // 全部的優惠券列表
    getCouponList() {
      //  TODO  頁碼要改 ${page};
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupons?page=1`;
      this.axios.get(requestUrl).then((response) => {
        const { success } = response.data;
        if (success) {
          const { coupons, pagination } = response.data;
          this.coupon_list = coupons;
          this.pagination = pagination;
        }
      }).catch(() => {
        this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
      });
    },
  },
  mounted() {
    this.getCouponList();
  },
};
</script>
