<template>
  <li>
    <div class="card">
      <img src="../../../../assets/images/cafe_list/PIEPAI.jpeg" class="card-img-top" alt="..." />
      <div class="card-body">
        <span class="material-icons-round">favorite_border</span>
        <h5 class="card-title">日暖咖啡雙人套餐</h5>
        <!-- 星星跟地點 -->
        <div class="location_stars">
          <p><span class="material-icons-round">place</span>台北｜台灣</p>
          <span class="material-icons-round">star</span>
          <span class="material-icons-round">star_border</span>
        </div>
        <p class="card-text">
          主打企鵝飯糰的日式早午餐店，票券內容包含：雙份企鵝飯糰早午餐，套餐包含飲料與蛋糕⋯
        </p>
        <!-- 剩下幾張與價格 -->
        <div class="d-flex justify-content-between bottom_block">
          <!-- 剩下幾張 -->
          <p class="rest_num">
            剩下 <span>10</span> 張
          </p>
          <!-- 價格 -->
          <p class="price">
            NT$<span>1580</span>
          </p>
        </div>
      </div>
      <a href="#" class="btn btn-primary d-flex justify-content-center add_to_cart">
          <span class="material-icons-round">shopping_cart</span>加入購物車
        </a>
    </div>
  </li>
</template>
<script>
export default {
  name: 'CafeCardComponent',
  props: {},
  data() {
    return {};
  },
  methods: {},
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
