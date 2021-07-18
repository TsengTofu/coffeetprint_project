<template>
  <div>
    <p>評論的元件</p>
    <!-- 備註：這個備註要統一放在這個區塊的最底 -->
    <span>評論資料擷取時間 2021-07-17 ~ 2021-07-18</span>
    <!-- 這邊的版型需要再回頭調整 -->
    <template
      v-for="(review, key) in reviews_data" :key="'review_' + key">
      <p>{{ review.author_name }}</p>
      <p>{{ review.author_url }}</p>
      <!-- 這是個人的頭貼 -->
      <div>
        <img :src="review.profile_photo_url" alt="">
      </div>
      <p>{{ review.rating }}</p>
      <p>{{ review.text }}</p>
      <p>{{ review.time }}</p>
    </template>
    <!-- 這邊撈的到資料 -->
  </div>
</template>
<script>
export default {
  name: 'ReviewListComponent',
  props: {
    reviews_data: Array,
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="sass" scoped>

</style>
