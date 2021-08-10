<template>
  <li>
    <div class="card">
      <img
        src="../../../../assets/images/city/taipei.png"
        class="card-img-top"
        alt="城市主圖"
      >
      <div class="card-body">
        <h5 class="card-title">
          <span class="material-icons-round">place</span>台北
        </h5>
      </div>
    </div>
  </li>
</template>

<script>
// 專門給探索區塊用的
export default {
  name: 'CityCafeCardComponent',
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {

  },
};
</script>

<style scoped lang="sass">
.card
  margin: 1rem
  border: none
  border-radius: 16px
</style>
