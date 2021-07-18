<template>
  <div>
    <li>
        <!-- 問題區塊 -->
        <div
          class="question_block"
          @click="toggleQuestion"
        >
          <!-- 再來要把 arrow 加上去 -->
          <!--  TODO  樣式也要改 -->
          <p>Q1. 為什麼為什麼為什麼為什麼為什麼為什麼</p>
        </div>
        <!-- 回答區塊 -->
        <div class="answer_block" v-if="isOpen">
          <p>這邊是第一題的答案</p>
        </div>
      </li>
  </div>
</template>

<script>
export default {
  name: 'FAQItemComponent',
  props: {},
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

</style>
