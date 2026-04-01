<template>
  <nav class="fixed top-0 w-full z-[100] bg-[#88664D] text-white" ref="navbar">
    <div class="w-full px-4 flex items-center justify-between py-2">
      <a class="logo block w-[225px] h-[40px] bg-no-repeat bg-contain bg-center flex-shrink-0" href="#"></a>

      <button
        class="lg:hidden p-1"
        type="button"
        aria-label="Toggle navigation"
        @click="toggleIsShow = !toggleIsShow"
      >
        <span class="material-icons-round">menu</span>
      </button>

      <div
        class="lg:flex items-center"
        :class="toggleIsShow
          ? 'flex flex-col absolute top-full left-0 right-0 bg-[#88664D] px-4 pb-4'
          : 'hidden'"
      >
        <ul class="lg:flex items-center gap-1 ml-auto">
          <li @click="toggleIsShow = false">
            <router-link
              to="/products"
              class="block px-3 py-2 font-bold text-white hover:text-gray-200"
            >產品列表</router-link>
          </li>
          <li @click="toggleIsShow = false">
            <router-link
              to="/about"
              class="block px-3 py-2 font-bold text-white hover:text-gray-200"
            >關於我們</router-link>
          </li>
          <li @click="toggleIsShow = false">
            <router-link
              to="/favorite"
              class="block px-3 py-2 font-bold text-white hover:text-gray-200"
            >收藏清單</router-link>
          </li>
          <li>
            <button
              class="flex items-center px-3 py-2 bg-[#4c443a] text-white rounded"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <span class="material-icons-round">shopping_cart</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <ToggleCart />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ToggleCart from '../Modal/ToggleCart.vue';

const toggleIsShow = ref(false);
const route = useRoute();

watch(route, () => {
  toggleIsShow.value = false;
});
</script>

<style scoped>
.logo {
  background-image: url('@/assets/images/logo_coffeetprint.svg');
}
</style>
