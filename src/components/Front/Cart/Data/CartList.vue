<template>
  <div class="cart_list_wrapper">
    <!-- 表格開始 -->
    <template v-if="isMobile()">
      <div
        v-for="(item, key) in cart_list"
            :key="'cart_' + key"
      >
        <ToggleCartItemComponent
          :cart_item="item"
          :order="parseInt(key) + 1"
          @get-data="getCartList"
        />
      </div>
    </template>
    <table class="table table-striped table-hover" v-else>
      <thead>
        <tr>
          <th width="60" scope="col">#</th>
          <th width="400" scope="col">品名</th>
          <!-- 搭配 Modal，到期日放在產品詳細裡面 -->
          <th width="200" scope="col">單價</th>
          <th width="200" scope="col">數量</th>
          <th width="200" scope="col">金額</th>
          <th width="200" scope="col">刪除</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart_list.length > 0">
          <tr
            v-for="(item, key) in cart_list"
            :key="'cart_' + key"
          >
            <!-- 另一個 template -->
            <CartItemComponent
              :cart_item="item"
              :order="parseInt(key) + 1"
              @get-data="getCartList"
            />
          </tr>
        </template>
        <template v-else>
          <tr class="empty_cart">
            <td colspan="8">
              <div class="content d-flex flex-column align-items-center">
                <p>現在購物車沒有任何東西喔！</p>
                <div class="image col-1">
                  <img src="../../../../assets/images/empty_cart.svg" alt="">
                </div>
                <button
                  @click="$router.push('/products')"
                  type="button" class="btn btn-primary"
                >
                  繼續購物
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
   <div class="summary_block">
      <p>購物車目前有 <span>{{ cart_list.length }}</span> 個產品</p>
    <button type="button"
      class="btn btn-outline-secondary"
      @click="clearAllCartList">
      清空購物車
    </button>
   </div>
    <!--  TODO  預備結帳 -->
  </div>
</template>

<script>
import CartItemComponent from './CartItem.vue';
import ToggleCartItemComponent from '../ToggleCartModal/ToggleCartItem.vue';
// 思考一下要在哪裡放 Coupon 的 input

export default {
  name: 'CartListComponent',
  props: {
    cart_list: Array,
    getCartList: Function,
  },
  components: {
    CartItemComponent,
    ToggleCartItemComponent,
  },
  data() {
    return {
    };
  },
  methods: {
    // 清除全部購物車列表
    clearAllCartList() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/carts`;
      this.axios
        .delete(requestUrl)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            this.$swal('已清空購物車');
            this.getCartList();
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          // error
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
    isMobile() {
      //  NOTE  偵測是不是手機版
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      }
      return false;
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="sass">
.cart_list_wrapper
  .empty_cart
    td
      width: 100%
      .image
        img
          width: 100%
          height: auto
  .summary_block
    text-align: justify
</style>
