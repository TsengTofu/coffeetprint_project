<template>
  <div class="col-md-4 mb-4">
    <div class="single_review_wrapper p-4">
      <a
        class="author_block common_row_align"
        :href="single_review.author_url"
        target="_blank"
      >
        <div
          class="author_avatar"
          :style="{ backgroundImage: 'url(' + single_review.profile_photo_url + ')' }"
        >
        </div>
        <span>{{ single_review.author_name }}</span>
      </a>
      <div class="col-sm-12 comment_block">
        <p class="d-flex stars">
          <span
            v-for="(n, index) in parseInt(single_review.rating)"
            :key="'star_' + index"
            class="material-icons-round"
            >star
          </span>
          <span
            v-for="(n, index) in parseInt(5 - parseInt(single_review.rating))"
            :key="'star_' + index"
            class="material-icons-round"
            >star_border
          </span>
        </p>
        <p class="review_content">{{ single_review.text }}</p>
        <small>評論發表時間：{{ $dayjs.unix(single_review.time).format('YYYY-MM-DD') }}</small>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SingleReviewComponent',
  props: {
    single_review: Object,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="sass" scoped>
.single_review_wrapper
  border-radius: 16px
  border: 1px solid #c5bdb6
  background: #fdfdfd
.comment_block
  text-align: justify
.author_avatar
  display: block
  width: 30px
  height: 30px
  border-radius: 50%
  background-position: center
  background-size: cover
.review_content
  white-space: pre-line
small
  color: #a9a4a0
</style>
