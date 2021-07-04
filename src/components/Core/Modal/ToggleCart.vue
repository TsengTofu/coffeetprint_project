<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">
        <span class="material-icons-round">shopping_cart</span>我的購物車
      </h5>
      <!-- 關閉按鈕 -->
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <!-- offcanvas 裡面的內容 -->
    <div class="offcanvas-body">
      <div v-if="cart_list">
        <CartListComponent
          :cart_list="cart_list"
          :getCartList="getCartList"
        />
      </div>
      <!-- 按鈕們 -->
      <button type="button" class="btn-primary" @click="directToPage('cart')">訂單結帳</button>
      <!-- 這個按鈕之後要改掉 -->
      <button type="button" class="btn-primary" >繼續購物</button>
    </div>
  </div>
</template>

<script>
import CartListComponent from '../../Front/Cart/Data/CartList.vue';

export default {
  name: 'ToggleCartComponent',
  props: {},
  components: {
    CartListComponent,
  },
  data() {
    return {
      cart_list: '',
    };
  },
  methods: {
    directToPage(pageName) {
      this.$router.push(`/${pageName}`);
    },
    getCartList() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          if (response.data.success) {
            console.log('成功抓到購物車列表的資料', response.data.data);
            //  TODO  單就購物車的列表，不包含總金額 total, final_total
            this.cart_list = response.data.data.carts;
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
    this.emitter.on('updateCartList', () => {
      this.getCartList();
    });
  },
  mounted() {
    this.getCartList();
  },
};
</script>

<style scoped lang="sass"></style>
