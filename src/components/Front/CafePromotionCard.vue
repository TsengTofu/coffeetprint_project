<template>
  <div class="landing_page">
    <!-- 試試看打字的動畫 -->
    <div class="promotion_block">
      <div class="content">
        <ul>
          <li>
            <div class="cafe_image">
              <img src="../../assets/images/cafe_default/cafe_default.jpg" alt="" />
            </div>
            <div class="cafe_info">
              <p class="cafe_title"><md-icon class="round">schedule</md-icon>不限時咖啡廳</p>
              <div class="tags">
                <ul>
                  <li>#工作去處</li>
                  <li>#躲避同事</li>
                  <li>#食物美味</li>
                </ul>
              </div>
              <p class="describle">找朋友瞎聊卻找不到好地點嗎？</p>
              <button>more ></button>
            </div>
          </li>
          <li>
            <div class="cafe_image">
              <img src="../../assets/images/cafe_default/cafe_default_2.jpg" alt="" />
            </div>
            <div class="cafe_info">
              <p class="cafe_title"><md-icon class="round">pets</md-icon>寵物咖啡廳</p>
              <div class="tags">
                <ul>
                  <li>#放鬆去處</li>
                  <li>#療癒可愛</li>
                  <li>#坐擁貓狗</li>
                </ul>
              </div>
              <p class="describle">上班壓力大？去寵物咖啡廳療癒身心</p>
              <button>more ></button>
            </div>
          </li>
          <li>
            <div class="cafe_image">
              <img src="../../assets/images/cafe_default/cafe_default_3.jpg" alt="" />
            </div>
            <div class="cafe_info">
              <p class="cafe_title"><md-icon class="round">auto_awesome</md-icon>熱門咖啡廳</p>
              <div class="tags">
                <ul>
                  <li>#時下最夯</li>
                  <li>#打卡熱點</li>
                  <li>#饕客推推</li>
                </ul>
              </div>
              <p class="describle">讓人想跟風一探究竟！</p>
              <button>more ></button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 咖啡廳卡片的寫法，每一個產品

export default {
  name: 'CafePromotionCardComponent', // 都要加上後綴
  // props: {
  //     msg: String,
  // },
  components: {
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@keyframes typing
  from
    width: 0
@keyframes blink
  50%
    border-color: transparent

.landing_page
    position: relative
    top: 0px
    z-index: 3
    background-position: center
    background-image: url('../../assets/images/index_bg.jpg')
    background-size: cover
    background-attachment: fixed
    display: block
    width: 100%
    min-height: 100vh
    .promotion_block
        background: #A36336
        position: relative
        width: 100%
        top: 100vh
        z-index: 50
        &::before
            content: ''
            background-position: top
            background-image: url('../../assets/images/wave.svg')
            background-size: cover
            display: block
            width: 100%
            height: 150px
            position: absolute
            top: -130px
            z-index: 4
        .content
            width: 100%
            max-width: 1200px
            margin: 0 auto
            position: relative
            z-index: 10
            padding: 0 0 60px
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
