<template>
  <!-- Grid 視圖（垂直卡片） -->
  <li v-if="view === 'grid'" class="p-2 my-2 w-1/2">
    <div class="card rounded-2xl cursor-pointer" @click="goToCafeDetail(singleCafe.id)">
      <div class="relative w-full h-[200px] overflow-hidden rounded-t-2xl">
        <div
          class="w-full h-full bg-top bg-cover scale-100 hover:scale-110 transition-transform duration-500"
          :style="{ backgroundImage: 'url(' + singleCafe.imageUrl + ')' }"
        ></div>
        <button
          type="button"
          class="absolute top-2.5 right-2.5 flex items-center px-2 py-1 bg-[#88664D] text-white rounded"
          @click.stop="addToFavorite(singleCafe.id)"
        >
          <span class="material-icons-round">{{ isFavorite ? 'favorite' : 'favorite_border' }}</span>
        </button>
      </div>
      <div class="p-3">
        <div class="flex items-start flex-wrap mb-1">
          <b class="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-[#212529] text-white mr-2 flex-shrink-0">
            <span class="material-icons-round text-[18px]">
              {{ singleCafe.category === '餐廳' ? 'restaurant' : 'free_breakfast' }}
            </span>
          </b>
          <div>
            <h5 class="text-left m-0 text-[16px] font-bold">{{ singleCafe.title }}</h5>
            <p class="flex m-0">
              <span v-for="(n, i) in parseInt(singleCafe.star_rate)" :key="'s_' + i" class="material-icons-round text-[18px]">star</span>
              <span v-for="(n, i) in 5 - parseInt(singleCafe.star_rate)" :key="'e_' + i" class="material-icons-round text-[18px]">star_border</span>
            </p>
          </div>
        </div>
        <p class="flex items-center text-sm m-0">
          <span class="material-icons-round text-[12px]">place</span>
          台灣｜{{ singleCafe.area }}
          <b class="ml-2 px-2 py-0 border border-black rounded-full text-xs font-normal">{{ singleCafe.nearby }}</b>
        </p>
        <div class="flex justify-between text-xs my-2">
          <p class="m-1">剩下 <span class="font-bold text-base text-[#88664D]">{{ singleCafe.num }}</span> 張</p>
          <p class="m-1">NT$<span class="font-bold text-base text-[#88664D]">{{ singleCafe.price.toLocaleString() }}</span></p>
        </div>
        <button
          type="button"
          class="w-full flex justify-center items-center gap-1 py-2 bg-[#88664D] text-white rounded"
          @click.stop="addToCart(singleCafe.id)"
        >
          <span class="material-icons-round">shopping_cart</span>加入購物車
        </button>
      </div>
    </div>
  </li>

  <!-- List 視圖（水平卡片） -->
  <li v-else class="w-full">
    <div class="card cursor-pointer" @click="goToCafeDetail(singleCafe.id)">
      <div class="flex">
        <div class="relative flex-1 overflow-hidden min-h-[180px]">
          <div
            class="w-full h-full bg-top bg-cover scale-100 hover:scale-110 transition-transform duration-500 absolute inset-0"
            :style="{ backgroundImage: 'url(' + singleCafe.imageUrl + ')' }"
          ></div>
          <button
            type="button"
            class="absolute top-2.5 left-2.5 flex items-center px-2 py-1 bg-[#88664D] text-white rounded"
            @click.stop="addToFavorite(singleCafe.id)"
          >
            <span class="material-icons-round">{{ isFavorite ? 'favorite' : 'favorite_border' }}</span>
          </button>
        </div>
        <div class="flex-1 p-3">
          <div class="flex items-center mb-2">
            <b class="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-[#212529] text-white mr-2 flex-shrink-0">
              <span class="material-icons-round text-[18px]">
                {{ singleCafe.category === '餐廳' ? 'restaurant' : 'free_breakfast' }}
              </span>
            </b>
            <div>
              <h5 class="m-0 text-[16px] font-bold">{{ singleCafe.title }}</h5>
              <p class="flex m-0">
                <span v-for="(n, i) in parseInt(singleCafe.star_rate)" :key="'s_' + i" class="material-icons-round text-[18px]">star</span>
                <span v-for="(n, i) in 5 - parseInt(singleCafe.star_rate)" :key="'e_' + i" class="material-icons-round text-[18px]">star_border</span>
              </p>
            </div>
          </div>
          <p class="text-sm text-gray-500 flex items-center mb-1">
            <span class="material-icons-round text-[12px]">place</span>
            台灣｜{{ singleCafe.area }}
            <b class="ml-2 px-2 border border-black rounded-full text-xs font-normal">{{ singleCafe.nearby }}</b>
          </p>
          <p class="text-sm text-justify overflow-hidden line-clamp-2 mb-2" v-html="singleCafe.description"></p>
          <div class="flex items-center justify-between">
            <div>
              <p class="m-0 text-sm">剩下 <span class="font-bold text-[#88664D]">{{ singleCafe.num }}</span> 張</p>
              <p class="m-0 text-sm">NT$ <span class="font-bold text-[#88664D]">{{ singleCafe.price.toLocaleString() }}</span></p>
            </div>
            <button
              type="button"
              class="flex items-center gap-1 px-3 py-2 bg-[#88664D] text-white rounded"
              @click.stop="addToCart(singleCafe.id)"
            >
              <span class="material-icons-round">shopping_cart</span>我要購買
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { emitter } from '@/emitter';

const props = defineProps({
  singleCafe: Object,
  isFavorite: Boolean,
  view: {
    type: String,
    default: 'grid',
  },
});

const router = useRouter();
const isProcess = ref(false);

function goToCafeDetail(id) {
  router.push(`/detail/${id}`);
}

function addToCart(id) {
  if (isProcess.value) return;
  isProcess.value = true;
  const url = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_API_PATH}/cart`;
  axios.post(url, { data: { product_id: id, qty: 1 } })
    .then((response) => {
      if (response.data.success) {
        Swal.fire({ title: '成功加入購物車！', toast: true, position: 'top-center', showConfirmButton: false, timer: 3000, timerProgressBar: true });
        emitter.emit('updateCartList');
      } else {
        Swal.fire({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
      }
      isProcess.value = false;
    })
    .catch(() => {
      Swal.fire({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
      isProcess.value = false;
    });
}

function addToFavorite(id) {
  emitter.emit('addToFavoriteList', id);
}
</script>
