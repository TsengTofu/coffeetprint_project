<template>
  <AnimationText v-if="isAnimation" class="title" :origin_text="title" />
  <h4 class="title font-bold text-[2rem] leading-relaxed text-left" :style="color ? { color } : {}">
    {{ title }}
  </h4>
</template>

<script setup>
import AnimationText from '@/components/Core/Animation/AnimationText.vue';

defineProps({
  title: String,
  isAnimation: Boolean,
  color: String,
});
</script>
