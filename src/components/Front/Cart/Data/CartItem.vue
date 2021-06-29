<template>
    <th scope="row">{{ order }}</th>
    <td>
      <img :src="cart_item.product.imageUrl" alt="">
    </td>
    <td>
      <p>{{ cart_item.product.title }}</p>
      <!--  FIXME  導到產品詳細頁，另開分頁，或是 popupModal？ -->
      <button type="button" class="btn-primary">詳細內容</button>
    </td>
    <td ><p v-html="cart_item.product.description"></p></td>
    <td>{{ cart_item.product.price }}</td>
    <td>{{ cart_item.qty }}</td>
    <td>{{ cart_item.qty * cart_item.product.price }}</td>
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
  components: {},
  data() {
    return {};
  },
  methods: {
    // 刪除購物車其中一個元件
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
  },
  mounted() {
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
