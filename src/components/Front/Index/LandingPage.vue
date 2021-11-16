<template>
  <div class="bg_cover landing_page">
    <div class="title_block col-md-auto" data-aos="fade-down">
      <div class="main_title d-flex align-items-center">
        <div class="pin"></div>
        <div class="pulse"></div>
        尋找你的咖啡廳
        </div>
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
  background-image: url('../../../../public/images/index_bg.png')
  display: block
  width: 100%
  min-height: 100vh
  @media (max-width: 525px)
    background-image: url('../../../../public/images/index_bg_s.jpg')
    min-height: 72vh
  .title_block
    color: #FFFFFF
    padding: 160px 0 0 0px
    text-align: center
    .main_title
      font-size: 2.5rem
      font-weight: 700
      justify-content: center
      padding: 2rem 0 0 0
    .vice_title
      font-size: 1rem
.explore_btn
  padding: .5rem 1rem
  font-weight: bold

.pin
  width: 30px
  height: 30px
  border-radius: 50% 50% 50% 0
  background: #fff
  position: absolute
  transform: rotate(-45deg)
  left: 50%
  top: 50%
  margin: -20px 0 0 -20px
  animation-name: bounce
  animation-fill-mode: both
  animation-duration: 1s
  &:after
    content: ''
    width: 14px
    height: 14px
    top: 8px
    left: 8px
    background: #67442f
    position: absolute
    border-radius: 50%
.pulse
  background: rgba(0,0,0,0.2)
  border-radius: 50%
  height: 14px
  width: 14px
  position: absolute
  left: calc(50% - 12px)
  top: 54%
  // margin: 11px 0px 0px -12px
  transform: rotateX(55deg)
  z-index: -2
  &:after
    content: ""
    border-radius: 50%
    height: 40px
    width: 40px
    left: -12px
    top: -12px
    position: absolute
    // margin: -13px 0 0 -13px
    animation: pulsate 1s ease-out
    animation-iteration-count: infinite
    opacity: 0.0
    box-shadow: 0 0 1px 2px #89849b
    animation-delay: 1.1s

@keyframes pulsate
  0%
    transform: scale(0.1, 0.1)
    opacity: 0.0
  50%
    opacity: 1.0
  100%
    transform: scale(1.2, 1.2)
    opacity: 0

@keyframes bounce
  0%
    opacity: 0
    transform: translateY(-2000px) rotate(-45deg)
  60%
    opacity: 1
    transform: translateY(30px) rotate(-45deg)
  80%
    transform: translateY(-10px) rotate(-45deg)
  100%
    transform: translateY(0) rotate(-45deg)
</style>
