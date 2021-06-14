<template>
  <div class="header_wrapper">
   <div class="content">
      <!-- Logo 連結做成首頁 -->
    <div class="logo"></div>
    <ul>
      <li><router-link to="/products">產品列表</router-link></li>
      <li><router-link to="/">關於我們</router-link></li>
      <li><router-link to="/">常見問題</router-link></li>
      <li><router-link to="/login">後台登入</router-link></li>
      <li>
        <router-link to="/cart">
          <span class="material-icons-round">shopping_cart</span>
        </router-link>
      </li>
    </ul>
   </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  // props: {
  //     msg: String,
  // },
  data() {
    return {};
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.header_wrapper
  color: #fff
  width: 100%
  position: fixed
  top: 0px
  z-index: 100
  // background: rgb(0,0,0)
  // background: linear-gradient(360deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)
  .content
    display: flex
    width: 100%
    max-width: 1200px
    margin: 0 auto
    align-items: center
    justify-content: space-between
    .logo
      width: 200px
      height: 80px
      display: block
      background-position: center
      background-image: url('../../../assets/images/logo_coffeetprint.svg')
      background-size: contain
      background-repeat: no-repeat
    ul
      display: flex
      li
        margin: 10px
        a
          text-decoration: none
          color: #fff
          position: relative
          font-weight: 700
          padding: 4px 8px
          &::before
            transform: scaleX(0)
            transform-origin: bottom right
            content: " "
            display: block
            position: absolute
            top: 0
            right: 0
            bottom: 0
            left: 0
            inset: 0 0 0 0
            background: #fff
            z-index: -1
            transition: transform .3s ease
          &:hover
            color: #000
            &::before
              transform: scaleX(1)
              transform-origin: bottom left
</style>
