<template>
  <div class="animation_text_wrapper">
    <transition-group
      name="text"
      appear
      @before-enter="beforeEnter"
      @enter="enter"
      :css="false"
    >
      <span
        class="text"
        v-for="(letter, key) in letter_list"
        :key="key"
        :data-index="key"
      >
        {{ letter }}
      </span>
    </transition-group>
  </div>
</template>

<script>

import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
// https://greensock.com/docs/v3/Installation?checked=core,customEase
// 安裝說明可以參考 net niga vue3 transition

gsap.registerPlugin(CustomEase);
CustomEase.create('test', '0.12, 0.97, 0.72, 1.17');

export default {
  name: 'AnimationTextComponent',
  props: {
    origin_text: String,
  },
  data() {
    return {
      string_length: '',
      letter_list: [],
      final_list: [],
    };
  },
  methods: {
    beforeEnter(el) {
      const target = el;
      target.style.display = 'inline-block';
      target.style.transform = 'translateY(100%) rotate(40deg)';
      target.style['transform-origin'] = 'top left';
      target.style['backface-visibility'] = 'hidden';
      target.style['will-change'] = 'transform';
      target.style.opacity = 0;
    },
    enter(el, done) {
      // el 會是每個被綁定的元素
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        rotation: 0,
        delay: el.dataset.index * 0.08,
        ease: 'test',
        // ease: 'bounce', // 這邊可以自定義，但要額外上官網登入會員之後重新 npm install
        onComplete: done, // 告訴他結束
      });
    },
  },
  mounted() {
    this.letter_list = this.origin_text.split('');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
// v-enter-from: 定義元素在進場「之前」的樣式。
// v-enter-active: 定義元素在進場「過程」的樣式。
// v-enter-to: 定義元素在進場「結束時」的樣式。
.animation_text_wrapper
  overflow: hidden
  width: fit-content
</style>
