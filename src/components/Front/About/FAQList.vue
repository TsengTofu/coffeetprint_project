<template>
  <div>
    <!--  TODO  這邊要來改版型 -->
    <p>這是關於我那一頁的「常見問題」</p>
    <ul class="list-unstyled">
      <!-- 這邊改傳資料 -->
      <FAQItemComponent />
    </ul>
  </div>
</template>
<script>
import FAQItemComponent from './FAQItem.vue';

export default {
  name: 'FAQListComponent',
  props: {},
  components: {
    FAQItemComponent,
  },
  data() {
    return {

    };
  },
  methods: {
  },
  mounted() {},
};
</script>

<style lang="sass" scoped>

</style>
