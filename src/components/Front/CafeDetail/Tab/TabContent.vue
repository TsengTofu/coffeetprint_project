<template>
  <div
    class="tab-pane fade show active"
    :id="tab_name"
    role="tabpanel"
    :aria-labelledby="tab_name + '-tab'">
    <slot :name="tab_name"></slot>
  </div>
</template>

<script>
export default {
  name: 'TabContentComponent',
  props: {
    tab_name: String,
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="sass" scoped>

</style>
