<template>
  <div class="card mb-5">
    <div class="card-header header_text d-flex align-items-center">
      #{{ order }} <span>{{ cart_item.product.category }}</span>{{ cart_item.product.title }}
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col">
          <img
            :src="cart_item.product.imageUrl"
            alt="購物車單一品項的主圖"
            :style="'width: 100%; height: auto;'"
          >
        </div>
        <div class="col">
          <div class="card-text card_text">
            <button
              type="button"
              class="btn btn-primary"
              @click="showCafeDetail(cart_item.product.id)"
            >
              詳細內容
            </button>
            <p>NT$ {{ (item_qty * cart_item.product.price).toLocaleString() }}</p>
            <div class="input-group mb-3">
              <button
                type="button"
                class="btn"
                @click="modifyNum('minus', cart_item.id)"
              >
                <span class="material-icons-round">remove</span>
              </button>
              <input
                type="text"
                class="form-control center"
                :value="item_qty"
                aria-label="數量"
              >
              <button
                class="btn"
                type="button"
                @click="modifyNum('add', cart_item.id)"
              >
                <span class="material-icons-round">add</span>
              </button>
            </div>
            <!-- 刪除按鈕 -->
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="deleteCurrentCartItem(cart_item.id)"
            >
            刪除
              <!-- <span class="material-icons-round">delete</span> -->
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleCartItemComponent',
  props: {
    cart_item: Object,
    order: Number,
  },
  emits: ['getData'],
  components: {},
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
        this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
      });
    },
    modifyNum(operation, cartItemId) {
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
          const { success, data: responseData } = response.data;
          if (success) {
            this.cart_list = responseData.carts;
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          // error
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
    //  TODO  這邊還沒撰寫，應該會改成 popup 或是另開分頁的形式
    // showCafeDetail(productId) {
    // },
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
.card_text
  display: flex
  flex-direction: column
  justify-content: space-between
.header_text
  span
    display: flex
    padding: .2rem .3rem
    border: 1px solid #000
    margin: 0 .5rem
.card-text
  text-align: justify
td
  vertical-align: middle
  img
    //  TODO  這邊要回來改寬度
    max-width: 120px
    width: 100%
    height: auto
</style>
