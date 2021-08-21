<template>
  <div class="container-fluid explore_cafe_wrapper">
    <div class="container">
      <TitleComponent
        title="＃探索城市"
        color="#FFFFFF"
      />
      <p class="common_row_align vice_title">
        <span class="material-icons-round">place</span>
        一起探索各地的咖啡廳吧！
      </p>
      <ul class="list-unstyled d-flex row">
        <CityCafeCardComponent />
      </ul>
    </div>
  </div>
</template>

<script>
import CityCafeCardComponent from './CityCafeCard.vue';
import TitleComponent from '../../../Core/Layout/Title/Title.vue';

export default {
  name: 'ExploreCafeComponent',
  props: {},
  components: {
    CityCafeCardComponent,
    TitleComponent,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {

  },
};
</script>

<style scoped lang="sass">
.explore_cafe_wrapper
  background: #406B5A
  padding: 20px 20px 180px
  position: relative
  top: -2px
  z-index: 50
  @media (max-width: 525px)
    padding: 20px 0px 150px
  .vice_title
    color: #ffffff
    margin: 0 0 2rem
</style>
