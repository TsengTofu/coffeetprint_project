<!-- 購物車的畫面 -->
<template>
  <div class="container cart_wrapper">
    <CheckoutStepComponent />
    <div class="d-flex cart_container">
      <CartListComponent
        :cart_list="cart_list"
        :getCartList="getCartList"
      />
    </div>
    <!-- 在摘要這邊傳入資料，這邊不出裡任何資料流，只接收 -->
    <OrderSummaryComponent
      :final_total="Math.floor(final_total)"
      :total="Math.floor(total)"
    />
    <button type="button"
      :disabled="cart_list.length === 0"
      class="btn btn-primary"
      @click="directToFormPage"
    >填寫訂購資料</button>
  </div>
</template>

<script>

import CartListComponent from '../../../components/Front/Cart/Data/CartList.vue'; // 購物車的列表
import OrderSummaryComponent from '../../../components/Front/Cart/Data/OrderSummary.vue'; // 購物車概要
import CheckoutStepComponent from '../../../components/Front/Cart/CheckoutStep.vue'; // 步驟流程

export default {
  name: 'Cart', // page 類型不需要加上後綴
  components: {
    CartListComponent,
    OrderSummaryComponent,
    CheckoutStepComponent,
  },
  props: {},
  data() {
    return {
      isEmpty: '',
      cart_list: '',
      // 總金額
      final_total: '',
      // 還沒放折扣的總金額
      total: '',
    };
  },
  methods: {
    directToFormPage() {
      this.$router.push('/cart/form');
    },
    getCartList() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          if (response.data.success) {
            //  FIXME  這邊還要處理去尾數的問題
            console.log('成功抓到購物車列表的資料', response.data.data);
            const { carts, total, final_total: finalTotal } = response.data.data;
            this.cart_list = carts;
            this.final_total = finalTotal;
            this.total = total;
          } else {
            console.log('出了點錯誤，請稍後再嘗試，謝謝。');
          }
        })
        .catch((error) => {
          console.log(error, 'getDataError');
        });
    },
  },
  created() {
    // 但這是因為資料寫在外層，這邊的資料流要釐清
    this.emitter.on('updateCartList', () => {
      this.getCartList();
    });
  },
  mounted() {
    this.getCartList();
  },
};
</script>
<style lang="sass" scoped>
.cart_wrapper
  padding: 120px 0 0 0
</style>
