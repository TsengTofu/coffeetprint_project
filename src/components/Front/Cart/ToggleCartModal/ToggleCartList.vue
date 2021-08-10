<template>
  <div class="cart_list_wrapper">
    <template v-if="cart_list.length > 0">
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
    <template v-else>
      <div class="empty_cart">
        <div class="content d-flex flex-column align-items-center">
          <p>現在購物車沒有任何東西喔！</p>
          <div class="image col-6">
            <img
              src="../../../../assets/images/empty_cart.svg"
              alt="空的購物車圖案"
              :style="'width: 100%; height: auto;'"
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
      </div>
    </template>
  </div>
</template>

<script>
import ToggleCartItemComponent from './ToggleCartItem.vue';
//  TODO  思考一下要在哪裡放 Coupon 的 input

export default {
  name: 'ToggleCartListComponent',
  props: {
    cart_list: Array,
    getCartList: Function,
  },
  components: {
    ToggleCartItemComponent,
  },
  data() {
    return {
    };
  },
  methods: {
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
