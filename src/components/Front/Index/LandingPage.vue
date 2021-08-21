<template>
  <div class="bg_cover landing_page">
    <div class="title_block col-md-auto" data-aos="fade-down">
      <p class="main_title d-flex align-items-center">
        <span class="material-icons-round">near_me</span>尋找你的咖啡廳
      </p>
      <p class="vice_title">還在煩惱要去哪發呆、聚餐、放鬆嗎？</p>
      <button
        type="button"
        class="btn btn-primary explore_btn"
        @click="directToPage('products')"
      >
        探索咖啡廳
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPageComponent',
  components: {},
  data() {
    return {};
  },
  methods: {
    directToPage(pageName) {
      this.$router.push(`/${pageName}`);
    },
  },
};
</script>

<style scoped lang="sass">
.landing_page
  z-index: 3
  background-image: url('../../../../public/index_bg.png')
  display: block
  width: 100%
  min-height: 100vh
  @media (max-width: 525px)
    background-image: url('../../../../public/index_bg_s.jpg')
    min-height: 72vh
  .title_block
    color: #FFFFFF
    padding: 160px 0 0 0px
    text-align: center
    .main_title
      font-size: 2rem
      font-weight: 700
      justify-content: center
    .vice_title
      font-size: 1rem
.explore_btn
  padding: .5rem 1rem
  font-weight: bold
</style>
