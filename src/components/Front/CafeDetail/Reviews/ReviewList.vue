<template>
  <div>
    <!--  TODO  備註：這個備註要統一放在這個區塊的最底 -->
    <span>評論資料擷取時間 2021-07-17 ~ 2021-07-18｜DataCredit - GoogleMapPlaceAPI</span>
    <!-- 這邊的版型需要再回頭調整 -->
    <div class="container">
      <template v-for="(review, key) in reviews_data" :key="'review_' + key">
        <SingleReviewComponent :single_review="review" />
      </template>
    </div>
  </div>
</template>
<script>
import SingleReviewComponent from './SingleReview.vue';

export default {
  name: 'ReviewListComponent',
  props: {
    reviews_data: Array,
  },
  components: {
    SingleReviewComponent,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="sass" scoped></style>
