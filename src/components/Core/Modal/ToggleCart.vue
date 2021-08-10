<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel" class="d-flex">
        <span class="material-icons-round">shopping_cart</span>我的購物車
      </h5>
      <!-- 關閉按鈕 -->
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
      </button>
    </div>
    <!-- offcanvas 裡面的內容 -->
    <div class="offcanvas-body container">
      <div class="summary_block d-flex">
        <p>
          購物車目前有 <span>{{ cart_list.length }}</span> 個產品
        </p>
        <button
          type="button"
          class="btn btn-primary"
          v-if="cart_list.length > 0"
          @click="directToPage('cart')"
        >
          查看購物車
        </button>
      </div>
      <div v-if="cart_list">
        <ToggleCartItemComponent
          :cart_list="cart_list"
          :getCartList="getCartList"
        />
      </div>
      <button
        type="button"
        v-if="cart_list.length > 0"
        class="btn btn-outline-secondary"
        @click="clearAllCartList"
      >
        清空購物車
      </button>
    </div>
  </div>
</template>

<script>
import ToggleCartItemComponent from '../../Front/Cart/ToggleCartModal/ToggleCartList.vue';

export default {
  name: 'ToggleCartComponent',
  props: {},
  components: {
    ToggleCartItemComponent,
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
          const { success } = response.data;
          if (success) {
            const { data } = response.data;
            this.cart_list = data.carts;
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
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
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
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
  unmounted() {
    this.emitter.off('updateCartList');
  },
};
</script>

<style scoped lang="sass">
.summary_block
  align-items: center
  justify-content: space-between
  margin: 0 0 1rem
  p
    margin: 0px
</style>
