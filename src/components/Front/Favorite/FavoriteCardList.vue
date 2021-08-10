<template>
  <div class="container-md">
    <div class="row">
      <FavoriteCardComponent
        v-for="(cafe, key) in final_cafe_list"
        :key="'cafe_' + key"
        :cafe="cafe"
      />
    </div>
  </div>
</template>

<script>
import FavoriteCardComponent from './FavoriteCard.vue';

export default {
  name: 'FavoriteCardListComponent',
  props: {
    final_cafe_list: Array,
  },
  components: {
    FavoriteCardComponent,
  },
  data() {
    return {};
  },
};
</script>

<style lang="sass" scoped>

</style>
