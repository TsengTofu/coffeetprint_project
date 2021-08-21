<template>
  <AnimationTextComponent
    v-if="isAnimation"
    class="title"
    :origin_text="title"
  />
  <h4
    class="title"
    :style="{ color: color }"
  >{{ title }}</h4>
</template>
<script>
import AnimationTextComponent from '../../Animation/AnimationText.vue';

export default {
  name: 'TitleComponent',
  props: {
    title: String,
    isAnimation: Boolean,
    color: String,
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
  line-height: 1.6
  text-align: left
</style>
