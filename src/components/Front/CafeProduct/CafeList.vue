<template>
  <template v-if="switch_status === 'grid'">
    <ul class="list-none flex flex-wrap m-0 p-0">
      <CafeCard
        v-for="(cafe, key) in productData"
        :key="'cafe_' + key"
        :singleCafe="cafe"
        :isFavorite="favoriteList.includes(cafe.id)"
        view="grid"
      />
    </ul>
  </template>
  <template v-else>
    <ul class="list-none flex flex-col gap-3 m-0 p-0">
      <CafeCard
        v-for="(cafe, key) in productData"
        :key="'grid_' + key"
        :singleCafe="cafe"
        :isFavorite="favoriteList.includes(cafe.id)"
        view="list"
      />
    </ul>
  </template>
  <Pagination
    :pagination_object="pagination"
    @emit-change-page="getCafeListData"
  />
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import CafeCard from '@/components/Front/Index/CafeProduct/CafeCard.vue';
import Pagination from '@/components/Core/Modal/Pagination.vue';
import LocalStorageSupport from '@/Support/LocalStorageSupport';
import { emitter } from '@/emitter';

defineProps({
  switch_status: String,
});

const productData = ref([]);
const pagination = ref({});
const favoriteList = ref([]);

function getCafeListData(queryPage = 1) {
  const url = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_API_PATH}/products?page=${queryPage}`;
  axios.get(url)
    .then((response) => {
      if (response.data.success) {
        productData.value = response.data.products;
        pagination.value = response.data.pagination;
      } else {
        Swal.fire({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
      }
    })
    .catch(() => {
      Swal.fire({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
    });
}

function toggleFavorite(id) {
  const idx = favoriteList.value.indexOf(id);
  if (idx !== -1) {
    favoriteList.value.splice(idx, 1);
    Swal.fire({ title: '已成功移除我的最愛！', toast: true, position: 'top-center', showConfirmButton: false, timer: 3000, timerProgressBar: true });
  } else {
    favoriteList.value.push(id);
    Swal.fire({ title: '已成功加入我的最愛！', toast: true, position: 'top-center', showConfirmButton: false, timer: 3000, timerProgressBar: true });
  }
}

watch(favoriteList, () => {
  LocalStorageSupport('CoffeetPrintFavorite').saveItem(favoriteList.value);
}, { deep: true });

onMounted(() => {
  favoriteList.value = LocalStorageSupport('CoffeetPrintFavorite').getItem() || [];
  emitter.on('addToFavoriteList', toggleFavorite);
  getCafeListData();
});

onUnmounted(() => {
  emitter.off('addToFavoriteList', toggleFavorite);
});
</script>
