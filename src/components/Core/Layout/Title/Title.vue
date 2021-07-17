<template>
  <AnimationTextComponent
    v-if="isAnimation"
    class="title"
    :origin_text="title"/>
  <!-- 普通的標題文字 -->
  <h4 class="title">
    {{ title }}
  </h4>
</template>
<script>
import AnimationTextComponent from '../../Animation/AnimationText.vue';

export default {
  name: 'TitleComponent',
  props: {
    title: String,
    isAnimation: Boolean,
  },
  components: {
    AnimationTextComponent,
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style lang="sass" scoped>
.title
  font-weight: bold
  font-size: 2rem
  padding: 0 2rem 2rem
</style>
