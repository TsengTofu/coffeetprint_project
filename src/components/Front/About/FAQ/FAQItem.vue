<template>
  <div class="card border-0">
    <div
      class="card-header py-4 border border-bottom-0
        border-top border-start-0 border-end-0"
      :id="'headingTwo_' + order"
      data-bs-toggle="collapse"
      :data-bs-target="'#collapseTwo_' + order"
    >
      <div
        class="d-flex justify-content-between align-items-center pe-1 question_block"
        @click="toggleQuestion"
        :class="isOpen ? 'active' : ''"
      >
        <h6 class="mb-0 justify">Q{{ order + 1 }}. {{ faq_data.question }}</h6>
        <span class="material-icons-round">expand_more</span>
      </div>
    </div>
    <div
      :id="'collapseTwo_' + order"
      class="collapse"
      :aria-labelledby="'headingTwo_' + order"
      :data-bs-parent="'#headingTwo_' + order"
    >
      <div class="card-body pb-5 justify">
        {{ faq_data.answer }}
      </div>
    </div>
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
.card
  height: auto
  background: none
  .card-header
    background: none
.question_block
  .material-icons-round
    transform: rotate(0deg)
    transition: all .5s
  &.active
    .material-icons-round
      transform: rotate(180deg)
</style>
