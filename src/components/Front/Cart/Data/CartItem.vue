<template>
    <th scope="row">{{ order }}</th>
    <td>
      <img :src="cart_item.product.imageUrl" alt="">
    </td>
    <td>
      <p>{{ cart_item.product.title }}</p>
      <!--  FIXME  導到產品詳細頁，另開分頁，或是 popupModal？ -->
      <button type="button" class="btn-primary"
        @click="showCafeDetail(cart_item.product.id)">詳細內容</button>
    </td>
    <td>{{ cart_item.product.price }}</td>
    <!--  NOTE  數量 -->
    <td>
      <div class="input-group">
        <button class="btn btn-outline-secondary"
          type="button"
          @click="modifyNum('minus', cart_item.id)"
        ><span class="material-icons-round">remove</span></button>
        <input type="text" class="form-control" :value="item_qty"
          aria-label="數量">
        <button class="btn btn-outline-secondary" type="button"
          @click="modifyNum('add', cart_item.id)"
        >
          <span class="material-icons-round">add</span>
        </button>
      </div>
    </td>
    <td>NT$ {{ (item_qty * cart_item.product.price).toLocaleString() }}</td>
    <!--  TODO  刪除的功能是做在這裡 -->
    <td>
      <button type="button" @click="deleteCurrentCartItem(cart_item.id)">
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
  components: {},
  data() {
    return {
      item_qty: '',
    };
  },
  methods: {
    // 刪除購物車其中一個
    deleteCurrentCartItem(cartItemId) {
      console.log('有刪除到我的意思');
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart/${cartItemId}`;
      this.axios.delete(requestUrl).then((response) => {
        console.log(response, '看一下回傳的是什麼');
        this.$emit('getData');
        //  TODO  就算成功刪除，也要回去購物車列表頁重新拿一次購物車列表
      }).catch((error) => {
        console.log('抓到錯誤囉！', error);
      });
    },
    modifyNum(operation, cartItemId) {
      // operation
      console.log(operation);
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
      //  NOTE  接著才處理 put api
    },
    updateCartItemNum(cartItemId) {
      console.log('更新購物車');
      // [說明]: product_id(String)、qty(Number) 為必填欄位
      // [參數]: { "data": { "product_id":"-L9tH8jxVb2Ka_DYPwng","qty":1 } }
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart/${cartItemId}`;
      const data = { product_id: cartItemId, qty: this.item_qty };
      this.axios
        .put(requestUrl, { data })
        .then((response) => {
          if (response.data.success) {
            console.log('更新成功', response.data.data);
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
    //  TODO  這邊還沒撰寫，應該會改成 popup 或是另開分頁的形式
    showCafeDetail(productId) {
      console.log('呈現卡片內容', productId);
    },
  },
  mounted() {
    // 先把初始值帶到畫面上
    this.item_qty = this.cart_item.qty;
  },
};
</script>

<style scoped lang="sass">
td
  img
    //  TODO  這邊要回來改寬度
    max-width: 120px
    width: 100%
    height: auto
</style>
