<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">
        <span class="material-icons-round">shopping_cart</span>我的購物車
      </h5>
      <!-- 關閉按鈕 -->
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <!-- offcanvas 裡面的內容 -->
    <div class="offcanvas-body">
      <p>這邊要做一個假的購物車</p>
      <img src="../../../assets/images/empty_cart.svg" alt="">
      <!-- 按鈕們 -->
      <button type="button" class="btn-primary" @click="directToPage('cart')">訂單結帳</button>
      <button type="button" class="btn-primary" @click="directToPage('products')">繼續購物</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleCartComponent',
  props: {},
  data() {
    return {};
  },
  methods: {
    directToPage(pageName) {
      console.log(pageName);
      this.$router.push(`/${pageName}`);
    },
  },
  mounted() {},
};
</script>

<style scoped lang="sass"></style>
