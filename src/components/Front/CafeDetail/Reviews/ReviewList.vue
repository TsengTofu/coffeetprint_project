<template>
  <div>
    <div class="container mt-4">
      <div class="row">
        <template v-for="(review, key) in reviews_data" :key="'review_' + key">
          <SingleReviewComponent
            :single_review="review"
          />
        </template>
      </div>
    </div>
    <span>評論資料擷取時間 2021-07-17 ~ 2021-07-18｜DataCredit - GoogleMapPlaceAPI</span>
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
