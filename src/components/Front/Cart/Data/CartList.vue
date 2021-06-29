<template>
  <div class="cart_list_wrapper">
    <!-- 加上刪除全部購物車的按鈕 -->
    <button type="button"
      class="btn-primary"
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
          <th scope="col">產品詳細</th>
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
              @get-data="getCartList" />
          </tr>
        </template>
        <!-- 如果 = 0 的情況 -->
        <template v-else>
          <p>現在購物車裡面沒有任何東西喔！</p>
        </template>
      </tbody>
    </table>
    <!-- FIXME  目前購物車裡面有多少個東西 -->
    <p>購物車目前有 <span>{{ cart_list.length }}</span> 個產品</p>
  </div>
</template>

<script>
import CartItemComponent from './CartItem.vue';

export default {
  name: 'CartListComponent',
  props: {},
  components: {
    CartItemComponent,
  },
  data() {
    return {
      // 購物車全部的資料
      cart_list: '',
    };
  },
  methods: {
    // 取得購物車列表
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
    this.getCartList();
  },
};
</script>

<style scoped lang="sass">
.cart_list_wrapper
  width: 80%
</style>
