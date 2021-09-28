<template>
  <HeaderComponent/>
  <div class="container-fluid">
    <div class="error_image"></div>
    <button
      type="button"
      class="btn btn-primary"
      @click="directToPage()"
    >
      回首頁
    </button>
  </div>
  <FooterComponent/>
</template>
<script>
import HeaderComponent from '../../components/Core/Layout/Header.vue';
import FooterComponent from '../../components/Core/Layout/Footer.vue';

export default {
  name: 'NotFound',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  methods: {
    directToPage() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped lang="sass">
.error_image
  background: url('../../assets/images/404/error.svg')
  background-size: cover
  background-position: center
  width: 100%
  height: 600px
</style>
