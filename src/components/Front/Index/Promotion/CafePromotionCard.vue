<template>
  <div class="row">
    <div class="image_wrapper col-sm-6">
      <div
        class="image"
        :style="{ backgroundImage: 'url(' + post_data.imageUrl + ')' }"
      >
      </div>
    </div>
    <div class="info_block col-sm-6">
      <div class="top_block d-flex flex-column align-items-start">
        <p class="main_title" v-html="post_data.title"></p>
        <div class="tags">
          <ul class="list-unstyled d-inline-flex">
            <li
              v-for="(item, key) in post_data.tag"
              :key="'tag_' + key"
            >
              # {{ item }}
            </li>
          </ul>
        </div>
        <p class="describe" v-html="post_data.description"></p>
      </div>
      <!-- 手機版 -->
      <button
        type="button"
        class="btn btn-primary btn_common common_row_align mobile"
      >
        點我看更多
        <span class="material-icons-round">keyboard_arrow_right</span>
      </button>
      <!-- 手機版要藏起來 -->
      <div class="bottom_block container-fluid">
        <div class="row comment_block">
          <!-- 頭像 -->
          <div class="user col-md-2">
            <div class="avatar_image mb-2">
              <img
                :src="post_data.avatar"
                alt="評論者大頭貼"
              >
            </div>
            <span>{{ post_data.author }}</span>
          </div>
          <!-- 咖啡廳相關資訊介紹 -->
          <div class="comment_detail col-md-10">
            <div class="comment_cafe_info common_row_align mb-2">
              <div class="col-md-auto cafe_name me-5">{{ post_data.cafe_name }}</div>
              <div class="location col-md-auto common_row_align">
                <span class="material-icons-round">place</span>
                {{ post_data.area }} <span class="nearby">{{ post_data.nearby }}</span>
              </div>
            </div>
            <p class="mb-2">{{ post_data.suggestion }}</p>
            <div class="common_row_align">
              <button
                type="button"
                class="btn btn-primary btn_common common_row_align"
              >
                點我看更多
                <span class="material-icons-round">keyboard_arrow_right</span>
              </button>
              <!-- <span>
                {{ $dayjs.unix(post_data.create_at).format('YYYY-MM-DD') }}
              </span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { h } from 'vue';
// import LoadingComponent from '../../../Core/Loading.vue';

export default {
  name: 'CafePromotionComponent',
  components: {
    // LoadingComponent,
  },
  props: {
    post_data: Object,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // 之後再回頭來想樣式
    //  FIXME  這邊是 Loading 的部分
    // const loader = this.$loading.show({
    //   color: 'blue',
    // }, {
    //   default: h(LoadingComponent),
    // });
    // setTimeout(() => {
    //   loader.hide();
    // }, 3000);
    //  FIXME  結束
  },
};
</script>

<style scoped lang="sass">
.mobile
  display: none
  @media (max-width: 525px)
    display: flex
.nearby
  font-size: 0.875rem
  border: 1px solid
  border-radius: 1rem
  padding: .05rem .5rem
  margin: 0 0 0 .4rem
.cafe_name
  font-weight: bold
.image
  display: block
  width: 100%
  max-width: 585px
  height: 420px
  background-position: 0% 80%
  background-size: cover
  border-radius: 16px
  @media (max-width: 525px)
    height: 200px
  img
    width: 100%
    height: auto
.info_block
  .top_block
    border-bottom: 1px solid #695F55
    @media (max-width: 525px)
      border: none
    .main_title
      font-size: 2rem
      font-weight: 600
      @media (max-width: 525px)
        font-size: 1.5rem
    .tags
      ul
        li
          color: #695F55
          border: 1px solid #695F55
          background: #FFF
          border-radius: 16px
          padding: 4px 16px
          font-size: .875rem
          font-weight: bold
          margin: 0 .4rem 0 0
          &:last-child
            margin: 0
    .describe
      text-align: justify
      line-height: 2
      @media (max-width: 525px)
        line-height: 1.6
  .bottom_block
    text-align: justify
    padding: 1.4rem 0
    @media (max-width: 525px)
      display: none
    .comment_block
      .comment_detail
        p
          margin: 0 0 .5rem
        .comment_cafe_info
          text-align: justify
      .user
        text-align: center
        font-size: 14px
        .avatar_image
          width: 100%
          height: auto
          border-radius: 50%
          background: #FFF
          border: 2px solid #695F55
          img
            width: 100%
            height: auto

</style>
