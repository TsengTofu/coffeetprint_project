<template>
  <!-- 這段要改用資料的方式傳遞 -->
  <div class="d-flex cafe_promotion_card_wrapper">
    <div class="image">
      <img src="../../../../assets/images/cafe_default/cafe_1.jpg" alt="">
    </div>
    <div class="info_block">
      <!-- 上半部 -->
      <div class="top_block d-flex flex-column align-items-start">
        <p class="main_title">
        <span class="material-icons-round">schedule</span>不限時咖啡廳
        </p>
        <div class="tags">
          <ul class="list-unstyled d-inline-flex">
            <li>#工作去處</li>
            <li>#躲避同事</li>
            <li>#食物美味</li>
          </ul>
        </div>
        <p class="describe">
          找朋友瞎聊卻找不到好地點嗎？<br>
          總是煩惱要不要低消，椅子舒不舒服，有沒有插座的問題嗎？<br>
          開會、討論報告，總是翻遍部落格卻找不到符合需求的嗎？<br>
          你想要的這裡通通有～
        </p>
      </div>
      <div class="bottom_block">
        <p>網友評論</p>
        <div class="d-flex comment_block">
          <!-- 頭像 -->
          <div class="avatar_image">
            <img src="../../../../assets/images/girls/girl-02.svg" alt="">
          </div>
          <!-- 咖啡廳相關資訊介紹 -->
          <div class="comment_detail">
            <div class="comment_cafe_info d-flex">
              <p>Homey Cafe</p>
              <div class="location"><span class="material-icons-round">place</span>台北</div>
              <p>忠孝復興站</p>
            </div>
            <p>不限時｜低消一杯飲料｜插座｜Wi-fi｜鹹食好吃</p>
          </div>
        </div>
        <button class="btn btn-primary" type="button">
          點我看更多<span class="material-icons-round">keyboard_arrow_right</span></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CafePromotionComponent',
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="sass">
.cafe_promotion_card_wrapper
  .image
    width: 100%
    max-width: 562px
    overflow: hidden
    border-radius: 16px
    img
      width: 100%
      height: auto
  .info_block
    .top_block
      border-bottom: 1px solid #695F55
      .main_title
        font-size: 2rem
        font-weight: 500
      .tags
        ul
          li
            color: #695F55
            border: 1px solid #695F55
            background: #FFF
            border-radius: 16px
            padding: 4px 16px
      .describe
        text-align: justify
    .bottom_block
      .comment_block
        .avatar_image
          width: 80px
          height: 80px
          border-radius: 50%
          background: #FFF
          border: 2px solid #695F55

</style>
