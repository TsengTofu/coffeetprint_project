<template>
  <div class="container-fluid promotion_block">
    <div class="content">
      <TitleComponent title="＃編輯嚴選" />
      <!-- bootstrap 的輪播 -->
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
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
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <!-- item 要記得加上 active -->
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
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
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
      max-width: 1200px
      margin: 0 auto
      position: relative
      z-index: 10
      padding: 0 0 60px
      .carousel-indicators
        bottom: -50px
      .carousel-inner
        background: #F0EBE6
        border-radius: 16px
        padding: 3rem
//  TODO  這邊以下沒有被用到
      ul
          display: flex
          width: 100%
          justify-content: center
          li
              width: 25%
              cursor: pointer
              margin: 0 40px 0 0
              background: #fff
              border-radius: 16px
              overflow: hidden
              box-shadow: 3px 3px 10px 0 rgba(#87522D, 50%)
              transform: translateY(0px)
              transition: translateY .5s
              &:last-child
                  margin: 0px
              &:hover
                  box-shadow: 3px 3px 10px 0 rgba(#87522D, 50%)
                  transform: translateY(-4px)
                  .cafe_image
                      img
                          transform: scale(1.1)
                          filter: saturate(1)
                      &::before
                          opacity: 1
                          display: block
                          width: 300px
                          height: 52%
                          background-image: url('../../assets/images/test2.png')
                          background-size: contain
                          background-repeat: no-repeat
                          bottom: 10px
                          left: 140px
                          position: absolute
                          z-index: 4
              .cafe_image
                  position: relative
                  height: 180px
                  overflow: hidden
                  img
                      width: 100%
                      height: auto
                      transform: scale(1)
                      filter: saturate(.2)
                      transition: transform .5s
                  &::before
                      opacity: 0
                      transition: opacity .5s
                      content: ''
                      display: block
                      width: 300px
                      height: 52%
                      background-image: url('../../assets/images/test2.png')
                      background-size: contain
                      background-repeat: no-repeat
                      bottom: 10px
                      left: 140px
                      position: absolute
                  &::after
                      content: ''
                      background-position: top
                      background-image: url('../../assets/images/wave_white.svg')
                      background-size: contain
                      display: block
                      width: 300px
                      bottom: 0px
                      height: 20px
                      position: absolute
                      z-index: 4
                      left: 0px
              .cafe_info
                  padding: 0 1rem 1rem
                  display: flex
                  flex-direction: column
                  align-items: flex-start
                  .cafe_title
                      font-size: 20px
                      display: flex
                      align-items: center
                      margin: 0 0 .5rem 0
                      color: #516482
                      font-weight: 600
                      i
                          color: #516482
                          font-weight: normal
                  .describle
                      color: #888
                      margin: 0 0 1rem
                      font-size: 14px
                  // 更多的按鈕
                  button
                      cursor: pointer
                      background: #ffc107
                      border-radius: 16px
                      border: none
                      font-size: 14px
                      padding: 4px 10px
                  .tags
                      display: flex
                      width: 100%
                      margin: 0 0 .5rem 0
                      ul
                          display: flex
                          width: 100%
                          flex-wrap: wrap
                          justify-content: flex-start
                          padding: 0px
                          li
                              font-size: 12px
                              letter-spacing: 1px
                              box-shadow: none
                              border-radius: 8px
                              background: #516482
                              color: #fff
                              width: fit-content
                              margin: 0 4px 0 0
                              border-radius: 24px
                              padding: 6px 8px
                              &:hover
                                  transform: translateY(0px)
</style>
