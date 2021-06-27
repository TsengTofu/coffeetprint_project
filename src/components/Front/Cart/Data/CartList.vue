<template>
  <div class="cart_list_wrapper">
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
      <!-- 內容 -->
      <tbody>
        <tr>
          <CartItemComponent />
        </tr>
      </tbody>
    </table>
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
    return {};
  },
};
</script>

<style scoped lang="sass">
.cart_list_wrapper
  width: 80%
</style>
