<template>
  <nav class="navbar navbar-expand-lg navbar-light header_wrapper" ref="navbar">
    <div class="container-fluid">
      <a class="navbar-brand logo" href="#"></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/products" class="nav-link" aria-current="page">產品列表</router-link>
          </li>
          <li class="nav-item">
            <!--  TODO  這邊跟寫 a 有什麼不一樣嗎？ -->
            <router-link to="/about" class="nav-link">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/favorite" class="nav-link">收藏清單</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/posts" class="nav-link">文章列表</router-link>
          </li>
          <li class="nav-item">
            <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <span class="material-icons-round">shopping_cart</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <ToggleCartComponent />
</template>

<script>
import ToggleCartComponent from '../Modal/ToggleCart.vue';

export default {
  name: 'HeaderComponent',
  components: {
    ToggleCartComponent,
  },
  // props: {
  //     msg: String,
  // },
  data() {
    return {};
  },
  methods: {
    getLocationDetail() {
      const apiKey = 'AIzaSyCbpSIzbqpOjgsr9hmBcc9xvowFhCenqew';
      const name = '品都';
      // 透過搜索字串拿 ID
      const requestUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&key=${apiKey}`;
      // const requestUrl = `https://maps.googleapis.com/maps/api/place/details/json?input=${name}&inputtype=textquery&key=${apiKey}`;
      this.axios.get(requestUrl)
        .then((response) => {
          console.log('hello', response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },
  mounted() {
    this.getLocationDetail();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.header_wrapper
  background: #88664D
  color: #fff
  width: 100%
  // border-radius: 45px
  position: fixed
  // margin: 24px 0
  top: 0px
  z-index: 100
.logo
  width: 225px
  height: 40px
  display: block
  background-position: center
  background-image: url('../../../assets/images/logo_coffeetprint.svg')
  background-size: contain
  background-repeat: no-repeat
.nav-item
  font-weight: bold
// 這邊以下沒有用到
  .content
    display: flex
    width: 100%
    max-width: 1200px
    margin: 0 auto
    align-items: center
    justify-content: space-between
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
