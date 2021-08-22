<template>
  <div class="container-fluid promotion_block">
    <div class="content container">
      <TitleComponent title="＃編輯嚴選" />
      <div
        id="carouselExampleIndicators"
        class="carousel slide wrapper"
        data-bs-ride="carousel"
        ref="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          >
          </button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          >
          </button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          >
          </button>
        </div>
        <div class="carousel-inner" v-if="post_list.length > 0">
          <div
            class="carousel-item"
            data-bs-interval="8000"
            v-for="(post, key) in post_list"
            :class="key === 0 ? 'active' : ''"
            :key="'post_' + key"
          >
            <CafePromotionComponent
              :post_data="post"
            />
          </div>
        </div>
        <button
          type="button"
          class="carousel-control-prev"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          type="button"
          class="carousel-control-next"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel } from 'bootstrap';
import CafePromotionComponent from './CafePromotionCard.vue';
import TitleComponent from '../../../Core/Layout/Title/Title.vue';

export default {
  name: 'CafePromotionCarouselComponent',
  components: {
    TitleComponent,
    CafePromotionComponent,
  },
  data() {
    return {
      // 貼文的資料
      post_list: [],
    };
  },
  methods: {
    //  FIXME  取得文章列表資料
    // 有必要的話，再把這支 function 放到外層，從外面傳資料進來
    getPostList() {
      // page 參數要記得加進來
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/articles?page=1`;
      this.axios.get(requestUrl)
        .then((response) => {
          this.post_list = response.data.articles;
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
  },
  mounted() {
    this.carousel = new Carousel(this.$refs.carousel);
    this.getPostList();
  },
};
</script>
<style scoped lang="sass">
@keyframes typing
  from
    width: 0
@keyframes blink
  50%
    border-color: transparent

.wrapper
  position: relative
  // &::before
  //   display: block
  //   content: ''
  //   width: 180px
  //   height: 180px
  //   background-image: url('../../../../assets/images/cat/cat.svg')
  //   background-size: cover
  //   right: 0px
  //   position: absolute
  //   top: -145px
  // &::after
  //   display: block
  //   content: ''
  //   width: 80px
  //   height: 50px
  //   background-image: url('../../../../assets/images/cat/paws.svg')
  //   background-size: contain
  //   right: 60px
  //   position: absolute
  //   background-repeat: no-repeat
  //   top: -10px
.promotion_block
  background: #f7f5f4
  position: relative
  width: 100%
  padding: 0px
  z-index: 50
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
    z-index: 4
  @media (max-width: 525px)
    &::before
      top: -50px
      background-image: url('../../../../assets/images/wave_s.svg')
  &::after
    content: ''
    background: #406B5A
    display: block
    width: 100%
    height: 200px
    position: absolute
    bottom: 0px
  .content
    width: 100%
    position: relative
    z-index: 10
    padding-bottom: 60px
    .carousel-indicators
      bottom: -50px
    .carousel-inner
      background: #F0EBE6
      border-radius: 16px
      padding: 3rem
      @media (max-width: 525px)
        padding: 1rem
</style>
