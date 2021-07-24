<template>
  <div class="cafe_outer">
    <CafeListComponent />
  </div>
</template>
<script>
import CafeListComponent from '../../components/Front/CafeProduct/CafeList.vue';

export default {
  name: '',
  components: {
    CafeListComponent,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="sass">
.cafe_outer
  padding: 120px 0 0 0
</style>
