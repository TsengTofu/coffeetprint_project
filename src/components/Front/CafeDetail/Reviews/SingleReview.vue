<template>
  <div class="row">
    <!-- 作者圖像區塊 -->
    <a
      class="author_block col-sm-2"
      :href="single_review.author_url"
      target="_blank"
    >
      <div class="author_avatar">
        <img :src="single_review.profile_photo_url" alt="">
      </div>
      <p>{{ single_review.author_name }}</p>
    </a>
    <!-- 右半邊的內容 -->
    <div class="col-sm-10">
      <p class="d-flex stars">
      <span
        v-for="(n, index) in parseInt(single_review.rating)"
        :key="'star_' + index"
        class="material-icons-round"
        >star</span
      >
      <span
        v-for="(n, index) in 5 - parseInt(single_review.rating)"
        :key="'star_' + index"
        class="material-icons-round"
        >star_border</span
      >
      </p>
      <p>{{ single_review.text }}</p>
      <small>評論發表時間：{{ $dayjs.unix(single_review.time).format('YYYY-MM-DD') }}</small>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SingleReviewComponent',
  props: {
    single_review: Object,
  },
  data() {},
  methods: {},
  mounted() {},
};
</script>

<style lang="sass" scoped>

</style>
