<template>
  <div class="cart_list_wrapper">
    <!-- 加上刪除全部購物車的按鈕 -->
    <button type="button"
      class="btn btn-primary"
      @click="clearAllCartList">
      清空購物車
    </button>
    <!-- 表格開始 -->
    <table class="table table-striped table-hover">
      <!-- 表頭 -->
      <thead>
        <tr>
          <th scope="col">#</th>
          <!-- <th scope="col">分類</th> -->
          <th scope="col">縮圖</th>
          <!-- 分類跟品名放一起 -->
          <th scope="col">品名</th>
          <!-- 搭配 Modal，到期日放在產品詳細裡面 -->
          <th scope="col">單價</th>
          <th scope="col">數量</th>
          <th scope="col">金額</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart_list.length > 0">
          <tr v-for="(item, key) in cart_list" :key="'cart_' + key">
            <CartItemComponent
              :cart_item="item"
              :order="parseInt(key) + 1"
              @get-data="getCartList"
            />
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="8">
            <p>現在購物車裡面沒有任何東西喔！</p>
            <img src="../../../../assets/images/empty_cart.svg" alt="">
            <button type="button" class="btn btn-primary">繼續購物</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <!-- FIXME  目前購物車裡面有多少個東西 -->
    <p>購物車目前有 <span>{{ cart_list.length }}</span> 個產品</p>
    <!--  TODO  預備結帳 -->
  </div>
</template>

<script>
import CartItemComponent from './CartItem.vue';

export default {
  name: 'CartListComponent',
  props: {
    cart_list: Array,
    getCartList: Function,
  },
  components: {
    CartItemComponent,
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
          if (response.data.success) {
            //  FIXME  這邊之後要加上提示文字
            console.log('成功抓到購物車列表的資料', response.data.data);
            alert('已清空購物車');
            this.getCartList();
          } else {
            console.log('出了點錯誤，請稍後再嘗試，謝謝。');
          }
        })
        .catch((error) => {
          console.log(error, 'getDataError');
        });
    },
  },
  mounted() {
    // 剛開始渲染的時候
    console.log(this.cart_list, this.getCartList);
    // this.getCartList();
  },
};
</script>

<style scoped lang="sass">
.cart_list_wrapper
  // width: 80%
</style>
