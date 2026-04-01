<template>
  <div class="flex flex-wrap">
    <div class="w-full sm:w-1/2">
      <div
        class="promotion-image block w-full max-w-[585px] h-[420px] bg-cover rounded-2xl sm:h-[420px] max-sm:h-[200px]"
        :style="{ backgroundImage: 'url(' + post_data.imageUrl + ')' }"
      ></div>
    </div>
    <div class="w-full sm:w-1/2 mt-4 sm:mt-0 sm:pl-4">
      <div class="flex flex-col items-start border-b border-[#695F55] pb-4 max-sm:border-0">
        <p class="text-[2rem] font-semibold mb-2 max-sm:text-[1.5rem]" v-html="post_data.title"></p>
        <div class="flex flex-wrap gap-1 mb-2">
          <span
            v-for="(item, key) in post_data.tag"
            :key="'tag_' + key"
            class="text-[#695F55] border border-[#695F55] bg-white rounded-full px-4 py-1 text-sm font-bold"
          >
            # {{ item }}
          </span>
        </div>
        <p class="text-justify leading-loose mb-0 max-sm:leading-snug" v-html="post_data.description"></p>
      </div>

      <!-- 手機版按鈕 -->
      <button
        type="button"
        class="hidden max-sm:flex items-center gap-1 mt-3 px-4 py-2 bg-[#88664D] text-white rounded"
      >
        點我看更多
        <span class="material-icons-round">keyboard_arrow_right</span>
      </button>

      <!-- 桌機版評論區 -->
      <div class="pt-5 text-justify max-sm:hidden">
        <div class="flex flex-wrap">
          <div class="w-full md:w-1/6 text-center text-sm mb-4 md:mb-0">
            <div class="rounded-full border-2 border-[#695F55] overflow-hidden mb-2">
              <img :src="post_data.avatar" class="w-full h-auto" alt="評論者大頭貼" />
            </div>
            <span>{{ post_data.author }}</span>
          </div>
          <div class="w-full md:w-5/6 md:pl-4">
            <div class="flex flex-wrap items-center gap-4 mb-2">
              <span class="font-bold">{{ post_data.cafe_name }}</span>
              <span class="flex items-center gap-1 text-sm">
                <span class="material-icons-round text-sm">place</span>
                {{ post_data.area }}
                <span class="text-sm border rounded-full px-2 ml-1">{{ post_data.nearby }}</span>
              </span>
            </div>
            <p class="mb-2">{{ post_data.suggestion }}</p>
            <button
              type="button"
              class="flex items-center gap-1 px-4 py-2 bg-[#88664D] text-white rounded"
            >
              點我看更多
              <span class="material-icons-round">keyboard_arrow_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  post_data: Object,
});
</script>
