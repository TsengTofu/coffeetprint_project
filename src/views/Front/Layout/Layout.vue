<template>
  <div class="layout">
    <HeaderComponent />
    <div class="main_content">
      <router-view></router-view>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '../../../components/Core/Layout/Header.vue';
import FooterComponent from '../../../components/Core/Layout/Footer.vue';

export default {
  name: 'Layout',
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style lang="sass" scoped>
.main_content
</style>
