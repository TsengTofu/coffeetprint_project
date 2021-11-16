<template>
  <div class="cart_wrapper">
    <TopBannerComponent
      main_title="美食已在托盤上"
      vice_title="手刀結帳，找朋友聚餐啦！"
    />
    <div class="container cart_content">
      <CheckoutStepComponent
        step="check_cart"
      />
      <div class="cart_container">
        <CartListComponent
          :cart_list="cart_list"
          :getCartList="getCartList"
          :final_total="Math.floor(final_total)"
          :total="Math.floor(total)"
        />
        <button
          type="button"
          class="btn btn-primary order_btn"
          :disabled="cart_list.length === 0"
          @click="directToFormPage"
        >
          填寫訂購資料
        </button>
      </div>
    </div>
    <DetailModalComponent
      id="detailModal"
      ref="modal"
    >
      <template v-slot:cafe_coupon_name>
        <span>{{ productDetail.category }}</span>
        {{ productDetail.title }}
      </template>
      <template v-slot:cafe_content>
        <!-- 可以利用這邊的資料做排版 -->
        <p>餐廳地址：{{ productDetail.address }}</p>
        <p>折價券內容：{{ productDetail.content }}</p>
        <p>地區：{{ productDetail.area }}</p>
        <p>備註：{{ productDetail.note }}</p>
        <p>電話：{{ productDetail.phone }}</p>
        <p>{{ productDetail.id }}</p>
        <p>{{ productDetail.imageUrl }}</p>
        {{ productDetail }}
      </template>
    </DetailModalComponent>
  </div>
</template>

<script>
import TopBannerComponent from '../../../components/Core/Layout/TopBanner.vue';
import CheckoutStepComponent from '../../../components/Front/Cart/CheckoutStep.vue'; // 步驟流程
import CartListComponent from '../../../components/Front/Cart/Data/CartList.vue'; // 購物車的列表
import DetailModalComponent from '../../../components/Core/Modal/DetailModal.vue';

export default {
  name: 'Cart', // page 類型不需要加上後綴
  components: {
    TopBannerComponent,
    CheckoutStepComponent,
    CartListComponent,
    DetailModalComponent,
  },
  props: {},
  data() {
    return {
      isEmpty: '',
      cart_list: [],
      // 總金額
      final_total: '',
      // 還沒放折扣的總金額
      total: '',
      // 新增的部分
      productDetail: {},
      category: '',
      place_json: {},
    };
  },
  methods: {
    directToFormPage() {
      this.$router.push('/cart/form');
    },
    getCartList() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            //  FIXME  這邊還要處理去尾數的問題
            const { carts, total, final_total: finalTotal } = response.data.data;
            this.cart_list = carts;
            this.total = total;
            this.final_total = finalTotal;
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
    // 取得現在的產品詳細內容
    getCurrentCafeData(productID) {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/product/${productID}`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            const { product } = response.data;
            this.productDetail = product;
            this.category = this.productDetail.category;
            const test = JSON.parse(product.place_json);
            this.place_json = { ...product, ...test.result };
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
    this.emitter.on('showCurrentCafe', (cafeID) => {
      this.getCurrentCafeData(cafeID);
    });

    this.emitter.on('updateCartList', (num) => {
      //  FIXME  這邊要先回來處理一下
      console.log(num, 'num'); // 會是他的可以購買的數量
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
<style lang="sass" scoped>
.cart_container
  display: flex
  align-items: flex-end
  flex-direction: column
  .order_btn
    width: fit-content
.cart_content
  position: relative
  z-index: 5
  padding: 2rem 0 0 0
  @media (max-width: 525px)
    padding: 0
.cart_wrapper
  padding: 59px 0 50px 0
  background: #f7f5f4
</style>
