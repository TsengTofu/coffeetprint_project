<template>
  <div class="landing_page">
    <div class="d-flex flex-column align-items-start title_block">
      <p class="main_title"><span class="material-icons-round">near_me</span>尋找你的咖啡廳</p>
      <p class="vice_title">還在煩惱要去哪發呆、聚餐、放鬆嗎？</p>
      <button
        type="button"
        class="btn btn-primary"
      >
        探索咖啡廳
      </button>
    </div>
  </div>
</template>

<script>
export default {
  // 首頁最上面那個 Scroll
  name: 'LandingPageComponent',
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="sass">
.landing_page
  position: relative
  top: 0px
  z-index: 3
  background-position: center
  background-image: url('../../../../public/index_bg.png')
  background-size: cover
  background-attachment: fixed
  display: block
  width: 100%
  min-height: 100vh
  .title_block
    color: #FFFFFF
    padding: 200px 0 0 150px
    width: 50%
    .main_title
      font-size: 2rem
      font-weight: 700
    .vice_title
      font-size: 1rem
</style>
