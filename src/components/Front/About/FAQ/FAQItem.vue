<template>
  <div>
    <li>
        <div
          class="question_block"
          :class="isOpen ? 'active' : ''"
          @click="toggleQuestion"
        >
          <p>
            Q{{order + 1}}. {{ faq_data.question }}
            <span class="material-icons-round">expand_more</span>
          </p>
        </div>
        <!-- 回答區塊 -->
        <div class="answer_block" v-if="isOpen">
          <p>{{ faq_data.answer }}</p>
        </div>
      </li>
  </div>
</template>

<script>
export default {
  name: 'FAQItemComponent',
  props: {
    faq_data: Object,
    order: Number,
  },
  components: {},
  data() {
    return {
      // 開關的 status
      isOpen: false,
    };
  },
  methods: {
    // 點開來就展開答覆的功能
    toggleQuestion() {
      // 寫看看
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="sass" scoped>
.question_block
  border-bottom: 1px solid #000
  .material-icons-round
    transform: rotate(0deg)
    transition: all .5s
  &.active
    .material-icons-round
      transform: rotate(180deg)

</style>
