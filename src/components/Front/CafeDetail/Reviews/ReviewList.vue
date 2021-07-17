<template>
  <div>
    <p>評論的元件</p>
    {{ reviews_data }}
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
