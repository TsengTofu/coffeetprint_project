<template>
  <div class="about_wrapper">
    <!--  TODO  看來這邊也得拆元件 -->
    <div class="bg">
      <div class="landing_page"></div>
      <div class="intro_block">
        <h3>
          <span class="material-icons-round">near_me</span>
          找到屬於自己的咖啡廳
        </h3>
        <!-- 再包一層 -->
        <div class="intro_description">
          <!-- 這邊再放一個小 tag -->
          <span>Introduction</span>
          <h4>
            不論是工作討論、放鬆閒聊
            擁有自己的小角落是重要的
          </h4>
          <!-- 這邊可以考慮加一個底線 -->
          <p>
            每個人都有屬於自己放鬆的方式。<br>
            有些人是遠離人群，自己靜靜的待著，就能恢復能量。<br>
            有些人則是需要透過與生活周遭的人、事、物互動，才能替自己充飽電。<br>
            你是哪一種呢？我是屬於需要跟生活周遭互動的類型。<br>
            不一定是一直談話交流，靜靜的待在陌生又熟悉的咖啡廳，也是一種跟生活互動的方式。<br>
            咖啡廳的背景白噪音襯托，有時候反而讓思緒更清晰。
          </p>
          <!-- 探索更多的按鈕 -->
          <button
            type="button"
            class="btn btn-primary"
          >
            <!-- 這邊要加上 > 的符號 -->
            探索自己的小角落
          </button>
        </div>
      </div>
    </div>
    <!--  TODO  拆元件結尾 -->
    <FeatureIntroComponent />
    <!-- FAQ -->
    <FAQListComponent />
  </div>
  <SubscribeComponent />
</template>
<script>
import FeatureIntroComponent from '../../components/Front/About/Feature/FeatureIntro.vue';
// 引入常見問題的區塊
import FAQListComponent from '../../components/Front/About/FAQ/FAQList.vue';
import SubscribeComponent from '../../components/Front/About/Subscribe/Subscribe.vue';

export default {
  name: '',
  components: {
    FeatureIntroComponent,
    FAQListComponent,
    SubscribeComponent,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="sass" scoped>
.about_wrapper
  padding: 300px 0 0
  .bg
    display: block
    width: 100%
    height: 620px
    background: #EBEBEB
    position: relative
    z-index: -1
    .landing_page
      display: block
      background-size: cover
      background-position: center
      background-image: url('../../../public/about_us_bg.jpg')
      width: 1000px
      height: 500px
      position: absolute
      top: -140px
    .intro_block
      padding: 1rem
      position: absolute
      width: 750px
      right: 0px
      .intro_description
        padding: 1rem
        background: #fff
        h4
          width: 45%
        p
          text-align: justify
</style>
