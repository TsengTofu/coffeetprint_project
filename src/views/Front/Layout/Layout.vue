<template>
  <div class="layout">
    <HeaderComponent />
    <div class="main-content">
      <router-view></router-view>
    </div>
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/Core/Layout/Header.vue';
import FooterComponent from '@/components/Core/Layout/Footer.vue';
</script>
