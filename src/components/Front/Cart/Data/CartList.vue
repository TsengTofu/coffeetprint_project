<template>
  <div class="cart_list_wrapper container">
    <template v-if="cart_list.length > 0">
      <div
        v-for="(item, key) in cart_list"
        :key="'cart_' + key"
        class="mobile"
      >
        <ToggleCartItemComponent
          :cart_item="item"
          :order="parseInt(key) + 1"
          @get-data="getCartList"
        />
      </div>
    </template>
    <div class="content d-flex flex-column align-items-center" v-else>
      <p>現在購物車沒有任何東西喔！</p>
    </div>
    <table class="table table-hover desktop mt-4">
      <thead>
        <tr class="table-primary">
          <th width="60" scope="col">#</th>
          <th width="400" scope="col">品名</th>
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
                  <img
                    src="../../../../assets/images/empty_cart.svg"
                    alt="空的購物車圖案"
                  >
                </div>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="$router.push('/products')"
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
      <div>
        <p>購物車目前有 <span>{{ cart_list.length }}</span> 個品項</p>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="clearAllCartList"
        >
          清空購物車
        </button>
      </div>
      <OrderSummaryComponent
        :final_total="Math.floor(final_total)"
        :total="Math.floor(total)"
      />
    </div>
  </div>
</template>

<script>
import CartItemComponent from './CartItem.vue';
import ToggleCartItemComponent from '../ToggleCartModal/ToggleCartItem.vue';
import OrderSummaryComponent from './OrderSummary.vue';

export default {
  name: 'CartListComponent',
  props: {
    cart_list: Array,
    getCartList: Function,
    final_total: Number,
    total: Number,
  },
  components: {
    CartItemComponent,
    ToggleCartItemComponent,
    OrderSummaryComponent,
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
    display: flex
    justify-content: space-between
.mobile
  display: none
// 手機版的控制項
@media (max-width: 525px)
  .mobile
    display: block
  .desktop
    display: none
</style>
