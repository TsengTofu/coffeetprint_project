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
              #{{ item }}
            </li>
          </ul>
        </div>
        <p class="describe" v-html="post_data.description"></p>
      </div>
      <div class="bottom_block">
        <!-- <p>網友評論</p> -->
        <div class="row comment_block">
          <!-- 頭像 -->
          <div class="user col-md-auto">
            <div class="avatar_image">
              <img
                :src="post_data.avatar"
                alt="評論者大頭貼"
              >
            </div>
            <span>{{ post_data.author }}</span>
          </div>
          <!-- 咖啡廳相關資訊介紹 -->
          <div class="comment_detail col-md-auto">
            <div class="comment_cafe_info row">
              <span class="col-6">{{ post_data.cafe_name }}</span>
              <div class="location col-6 d-flex">
                <span class="material-icons-round">place</span>
                {{ post_data.area }} <small>{{ post_data.nearby }}</small>
              </div>
            </div>
            <p>{{ post_data.suggestion }}</p>
            <figcaption>
              評論發表於
              {{ $dayjs.unix(post_data.create_at).format('YYYY-MM-DD') }}
            </figcaption>
            <button
              type="button"
              class="btn btn-primary d-flex"
            >
              點我看更多
              <span class="material-icons-round">keyboard_arrow_right</span>
            </button>
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
.image
  display: block
  width: 100%
  max-width: 562px
  height: 425px
  background-position: 0% 80%
  background-size: cover
  border-radius: 16px
  img
    width: 100%
    height: auto
.info_block
  padding: 1rem 2rem
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
      line-height: 2
  .bottom_block
    .comment_block
      .comment_cafe_info
        text-align: justify
      .user
        text-align: center
        font-size: 14px
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
