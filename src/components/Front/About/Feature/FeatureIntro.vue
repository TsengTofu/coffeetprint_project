<template>
  <div class="container-fluid feature_wrapper">
    <div>
      <ul class="list-unstyled container">
        <li class="row d-flex align-items-center mt-5">
          <div class="bg_cover feature_image img-fluid col-sm-6"></div>
          <div class="feature_describe col-sm-6">
            <p class="title">走！一起去咖啡廳吃早餐呀！</p>
            <p class="describe">
              用咖啡廳早餐喚醒一天的活力，告訴自己「要準備工作囉」，也是一種儀式感。<br>
              如何？是不是聽起來不錯？要一起去吃早餐嗎？
            </p>
            <figcaption class="blockquote-footer">
              CoffeetPrint Author<cite title="Source Title">Tofu Tseng</cite>
            </figcaption>
            <button
              type="button"
              class="btn special_button"
              @click="getCoupon"
            >
              一起逛逛咖啡廳
              <span class="material-icons-round">chevron_right</span>
            </button>
          </div>
        </li>
        <li class="row d-flex align-items-center">
          <div class="feature_describe col-sm-6">
            <p class="title">還沒睡醒嗎？那來份早午餐吧！</p>
            <p class="describe">
              假日睡到中午也沒關係，伸個懶腰，出門探索販售早午餐的咖啡廳也很不錯！<br>
              垂涎欲滴的班尼迪克蛋、酥脆的炸薯餅、鬆軟的吐司，搭配一杯紅茶。<br>
              啊！完美的週末早晨。
            </p>
            <figcaption class="blockquote-footer">
              CoffeetPrint Author<cite title="Source Title">Tofu Tseng</cite>
            </figcaption>
            <button
              type="button"
              class="btn special_button"
              @click="getCoupon"
            >
              約朋友一起吃早餐
              <span class="material-icons-round">chevron_right</span>
            </button>
          </div>
          <div class="bg_cover feature_image_second img-fluid col-sm-6"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeatureIntroComponent',
  methods: {
    getCoupon() {
      this.$swal('恭喜獲得折扣碼 - CodeWithCoffee');
    },
  },
};
</script>

<style lang="sass" scoped>
.feature_wrapper
  position: relative
  background: #f7f5f4
  &::before
      content: ''
      background-position: top
      background-image: url('../../../../assets/images/wave.svg')
      background-size: cover
      display: block
      width: 100%
      height: 150px
      position: absolute
      top: -100px
      z-index: 1
      left: 0px
  @media (max-width: 525px)
    &::before
      background-image: url('../../../../assets/images/wave_s.svg')
  ul
    padding: 20px 0 0 0
.feature_describe
  text-align: justify
  .title
    font-weight: bold
    font-size: 1.5rem
  .describe
    text-align: justify
.feature_image
  background-image: url('../../../../../public/images/about/about_food.jpg')
  height: 300px
.feature_image_second
  background-image: url('../../../../../public/images/about/about_food_2.jpg')
  height: 300px
.special_button
  border: 1px solid #88664D
  background: none
  font-weight: bold
  padding: .5rem 1rem
  color: #88664D
  display: flex
  &:hover
    background: #88664D
    color: #fff
</style>
