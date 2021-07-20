<template>
  <!-- 這段要改用資料的方式傳遞 -->
  <div class="d-flex cafe_promotion_card_wrapper">
    <div class="image"
      :style="{ backgroundImage: 'url(' + post_data.imageUrl + ')' }"
    >
    </div>
    <div class="info_block">
      <!-- 上半部 -->
      <div class="top_block d-flex flex-column align-items-start">
        <p class="main_title" v-html="post_data.title"></p>
        <div class="tags">
          <ul class="list-unstyled d-inline-flex">
            <li v-for="(item, key) in post_data.tag"
              :key="'tag_' + key"
            >
              #{{ item }}
            </li>
          </ul>
        </div>
        <p class="describe" v-html="post_data.description"></p>
      </div>
      <div class="bottom_block">
        <p>網友評論</p>
        <div class="d-flex comment_block">
          <!-- 頭像 -->
          <div class="avatar_image">
            <img :src="post_data.avatar" alt="">
          </div>
          <!-- 咖啡廳相關資訊介紹 -->
          <div class="comment_detail">
            <div class="comment_cafe_info d-flex">
              <p>{{ post_data.cafe_name }}</p>
              <div class="location">
                <span class="material-icons-round">place</span>
                {{ post_data.area }}
              </div>
              <p>{{ post_data.nearby }}</p>
            </div>
            <p>{{ post_data.suggestion }}</p>
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
  props: {
    post_data: Object,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="sass">
.cafe_promotion_card_wrapper
  .image
    display: block
    width: 100%
    max-width: 562px
    // background-attachment: fixed
    background-position: center
    background-size: cover
    // overflow: hidden
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
          img
            width: 100%
            height: auto

</style>
