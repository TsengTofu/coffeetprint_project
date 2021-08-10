<template>
  <div class="about_wrapper">
    <div class="container-sm">
      <div class="row">
        <div class="bg_cover_no_fixed landing_page col-md-7"></div>
        <div class="intro_block col-md-4 ms-md-10 mb-5">
          <div class="intro_description">
            <h3>
              <span class="material-icons-round">near_me</span>
              找到屬於自己的咖啡廳
            </h3>
            <h4>
              不論是工作討論、放鬆閒聊<br>
              擁有自己的小角落是重要的
            </h4>
            <!-- 這邊可以考慮加一個底線 -->
            <p>
              每個人都有屬於自己放鬆的方式<br>
              有些人是自己靜靜的待著就行<br>
              有些人則是需要透過與生活互動<br><br>
              你是哪一種呢？<br><br>
              <!-- 不一定是一直談話交流<br>
              靜靜的待在陌生又熟悉的咖啡廳<br>
              也是一種跟生活互動的方式<br> -->
            </p>
            <!-- 探索更多的按鈕 -->
            <button
              type="button"
              class="btn special_button"
              @click="$router.push('/products')"
            >
              探索自己的小角落
              <span class="material-icons-round">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <FeatureIntroComponent />
    <!-- FAQ -->
    <FAQListComponent />
  </div>
  <SubscribeComponent />
</template>
<script>
import FeatureIntroComponent from '@/components/Front/About/Feature/FeatureIntro.vue';
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
.about_wrapper
  padding: 120px 0 0
  background: #EBEBEB
  .landing_page
    background-image: url('../../../public/about_us_bg.jpg')
    height: 500px
  .intro_block
    position: relative
    .intro_description
      padding: 2rem
      border-radius: 16px
      background: #fff
      text-align: justify
</style>
