<template>
  <th scope="row">{{ order }}</th>
  <td class="common_row_align">
    <div class="image">
      <img
        :src="cart_item.product.imageUrl"
        alt="購物車單一品項的圖片"
      >
    </div>
    <div>
      <p>
        <span>{{ cart_item.product.category }}</span>
        {{ cart_item.product.title }}
      </p>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#detailModal"
        @click="showCafeDetail(cart_item.product.id)">
        詳細內容
      </button>
    </div>
  </td>
  <td>NT$ {{ cart_item.product.price }}</td>
  <td>
    <div class="input-group">
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="modifyNum('minus', cart_item.id)"
      >
        <span class="material-icons-round">remove</span>
      </button>
      <input
        type="text"
        class="form-control center"
        :value="item_qty"
        aria-label="數量">
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="modifyNum('add', cart_item.id)"
      >
        <span class="material-icons-round">add</span>
      </button>
    </div>
  </td>
  <td>NT$ {{ (item_qty * cart_item.product.price).toLocaleString() }}</td>
  <td>
    <button
      type="button"
      class="btn delete_btn"
      @click="deleteCurrentCartItem(cart_item.id)"
    >
      <span class="material-icons-round">delete</span>
    </button>
  </td>
</template>

<script>
export default {
  name: 'CartItemComponent',
  props: {
    cart_item: Object,
    order: Number,
  },
  //  TODO  但這行我不理解原因
  emits: ['getData'],
  components: {
  },
  data() {
    return {
      item_qty: '',
    };
  },
  methods: {
    // 刪除購物車其中一個
    deleteCurrentCartItem(cartItemId) {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart/${cartItemId}`;
      this.axios.delete(requestUrl).then((response) => {
        const { success } = response.data;
        if (success) {
          this.$swal('已成功刪除！');
          this.$emit('getData');
        }
      }).catch(() => {
        // error
        this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
      });
    },
    modifyNum(operation, cartItemId) {
      //  TODO  這邊是不是也要改成 switch？
      if (operation === 'add') {
        this.item_qty += 1;
      } else {
        this.item_qty -= 1;
        if (this.item_qty === 0) {
          //  TODO  先跳出 confirm 的視窗，然後再刪除，退出的話就不處理
          // 用 confirmModal 去改
          this.deleteCurrentCartItem(cartItemId);
        }
      }
      this.updateCartItemNum(cartItemId);
    },
    updateCartItemNum(cartItemId) {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart/${cartItemId}`;
      const data = { product_id: cartItemId, qty: this.item_qty };
      this.axios
        .put(requestUrl, { data })
        .then((response) => {
          const { success } = response.data;
          if (success) {
            this.$swal('更新成功');
            this.cart_list = response.data.data.carts;
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          // error
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
    // 點擊要秀出餐廳的詳細資訊
    showCafeDetail(productId) {
      this.emitter.emit('showCurrentCafe', productId);
    },
  },
  mounted() {
    // 先把初始值帶到畫面上
    this.item_qty = this.cart_item.qty;
  },
  watch: {
    cart_item() {
      this.item_qty = this.cart_item.qty;
    },
  },
};
</script>

<style scoped lang="sass">
.delete_btn
  &:hover
    color: #88664D
td
  vertical-align: middle
  img
    //  TODO  這邊要回來改寬度
    max-width: 120px
    width: 100%
    height: auto
</style>
