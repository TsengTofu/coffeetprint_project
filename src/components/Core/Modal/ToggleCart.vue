<template>
  <div class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">Offcanvas right</h5>
      <button type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"></button>
    </div>
  <!-- offcanvas 裡面的內容 -->
  <div class="offcanvas-body">
    <p>這邊要做一個假的購物車</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'ToggleCartComponent',
  props: {},
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {

  },
};
</script>

<style scoped lang="sass"></style>
