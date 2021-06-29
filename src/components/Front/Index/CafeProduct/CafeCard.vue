<template>
  <li @click="goToCafeDetail(single_cafe.id)">
    <div class="card">
      <div class="cafe_image">
        <img :src="single_cafe.imageUrl" class="card-img-top" alt="咖啡廳圖片" />
        <button class="btn-primary" type="button">
          <span class="material-icons-round">favorite_border</span>
        </button>
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <p class="category">
            {{ single_cafe.category }}
          </p>
          {{ single_cafe.title }}
        </h5>
        <!-- 星星跟地點 -->
        <div class="location_stars">
          <p><span class="material-icons-round">place</span>{{ single_cafe.area }}｜台灣</p>
          <p class="d-flex">
            <span v-for="(n, index) in parseInt(single_cafe.star_rate)"
              :key="'star_' + index" class="material-icons-round">star</span>
              <span v-for="(n, index) in (5 - parseInt(single_cafe.star_rate))"
              :key="'star_' + index" class="material-icons-round">star_border</span>
          </p>
        </div>
        <p class="card-text">
          主打企鵝飯糰的日式早午餐店，票券內容包含：雙份企鵝飯糰早午餐，套餐包含飲料與蛋糕⋯
        </p>
        <!-- 剩下幾張與價格 -->
        <div class="d-flex justify-content-between bottom_block">
          <!-- 剩下幾張 -->
          <p class="rest_num">
            剩下 <span>{{ single_cafe.num }}</span> 張
          </p>
          <!-- 價格 -->
          <p class="price">
            NT$<span>{{ single_cafe.price }}</span>
          </p>
        </div>
      </div>
      <a href="#"
        class="btn btn-primary d-flex justify-content-center add_to_cart"
        @click="addToCart(single_cafe.id)">
          <span class="material-icons-round">shopping_cart</span>加入購物車
        </a>
    </div>
  </li>
</template>
<script>
export default {
  name: 'CafeCardComponent',
  props: {
    singleCafe: Object,
  },
  data() {
    return {
      single_cafe: this.singleCafe,
    };
  },
  methods: {
    goToCafeDetail(id) {
      console.log('有點到我喔');
      // 頁面倒轉
      this.$router.push(`/detail/${id}`);
    },
    //  TODO  加到購物車的功能，這段之後要回來檢查
    addToCart(id) {
      // 要加入的產品資料
      // { product_id, qty}
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      this.axios
        .post(requestUrl, {
          data: {
            product_id: id, qty: 1,
          },
        })
        // .then((response)=>  // 這樣居然可以正常
        .then((response) => {
          // 觀察一下為什麼這呼喚不到另一個函式
          // response.data.products -> array
          if (response.data.success) {
            console.log('測試', response.data);
          } else {
            console.log('出了點錯誤，請稍後再嘗試，謝謝。');
          }
        })
        .catch((error) => {
          console.log(error, 'getDataError');
        });
    },
  },
  mounted() {},
};
</script>
<style scoped lang="sass">
li
  width: 25%
  .card
    margin: 1rem
    border-radius: 16px
    .add_to_cart
      width: 100%
      position: relative
      bottom: 0px
      left: 0px
      border-radius: 0px 0px 16px 16px
</style>
