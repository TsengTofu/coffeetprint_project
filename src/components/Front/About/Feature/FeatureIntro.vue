<template>
  <div class="container-fluid feature_wrapper">
    <ul class="list-unstyled d-flex flex-column">
      <!-- 第一組 -->
      <li class="d-flex">
        <div class="feature_image img-fluid"></div>
        <div class="feature_describe">
          <p class="title">走！一起去咖啡廳吃早餐呀！</p>
          <p
            class="describe"
            v-html="feature_describe"
          ></p>
          <figcaption class="blockquote-footer">
            CoffeetPrint Author<cite title="Source Title">Tofu Tseng</cite>
          </figcaption>
          <button
            type="button"
            class="btn btn-primary"
          >
            一起逛逛咖啡廳
          </button>
        </div>
      </li>
      <!-- 第二組 -->
      <li class="d-flex">
        <div class="feature_describe">
          <p class="title">還沒睡醒嗎？那來份早午餐吧！</p>
          <p
            class="describe"
            v-html="feature_describe_2"
          ></p>
          <figcaption class="blockquote-footer">
            CoffeetPrint Author<cite title="Source Title">Tofu Tseng</cite>
          </figcaption>
          <button
            type="button"
            class="btn btn-primary"
          >
            約朋友一起吃早餐
          </button>
        </div>
        <div class="feature_image_second img-fluid"></div>
      </li>
    </ul>
    <!-- <img src="" class="rounded float-start" alt="..."> -->
  </div>
</template>
<script>
export default {
  name: 'FeatureIntroComponent',
  props: {},
  components: {},
  data() {
    return {
      feature_describe: '用咖啡廳早餐喚醒一天的活力，告訴自己「要準備工作囉」，也是一種儀式感。<br>如何？是不是聽起來不錯？要一起去吃早餐嗎？',
      feature_describe_2: '假日睡到中午也沒關係，伸個懶腰，出門探索販售早午餐的咖啡廳也很不錯！<br>垂涎欲滴的班尼迪克蛋、酥脆的炸薯餅、鬆軟的吐司，搭配一杯紅茶。<br>啊！完美的週末早晨。',
    };
  },
};
</script>

<style lang="sass" scoped>
.feature_wrapper
  position: relative
  padding: 0px
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
      top: -130px
      z-index: -1
ul
  li
    width: 100%
.feature_describe
  width: 50%
  padding: 4rem
  .title
    font-size: 1.5rem
  .describe
    text-align: justify
.feature_image
  background-image: url('../../../../../public/about/about_food.jpg')
  background-size: cover
  background-position: center
  background-attachment: fixed
  width: 50%
  height: 300px
.feature_image_second
  background-image: url('../../../../../public/about/about_food_2.jpg')
  background-size: cover
  background-position: center
  background-attachment: fixed
  width: 50%
  height: 300px
</style>
