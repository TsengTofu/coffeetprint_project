<template>
  <div class="layout">
    <HeaderComponent />
    <router-view></router-view>
    <FooterComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComponent from '../../../components/Core/Layout/Header.vue';
import FooterComponent from '../../../components/Core/Layout/Footer.vue';

export default {
  name: 'Layout',
  components: {
    HeaderComponent,
    FooterComponent,
    // HelloWorld, bind components
  },
};
</script>
