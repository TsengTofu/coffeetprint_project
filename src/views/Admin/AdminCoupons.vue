<template>
  <div>
    <p>哈囉我是後台優惠券列表頁</p>
    <CouponListComponent />
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
    };
  },
  methods: {
    // 先拿全部的優惠券列表
    getCouponList() {
      console.log('取得所有優惠券列表');
      //  TODO  這邊的頁碼要回來改 ${page};
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupons?page=1`;
      this.axios.get(requestUrl).then((response) => {
        const {
          success, messages, coupons, pagination,
        } = response.data;
        console.log(success, messages, coupons, pagination);
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
