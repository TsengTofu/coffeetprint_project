<template>
  <div class="tab_wrapper">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li
        class="nav-item" role="presentation"
        v-for="(tab, key) in tab_config_list"
        :key="'tab_'+ tab.tab_name + key"
      >
        <button
          class="nav-link"
          :class="tab.selected ? 'active': null"
          :id="tab.tab_name + '-tab'"
          data-bs-toggle="tab"
          :data-bs-target="'#' + tab.tab_name"
          type="button"
          role="tab"
          :aria-controls="tab.tab_name"
          :aria-selected="tab.selected"
          @click="getCurrentTab(tab.tab_name)"
        >
          {{ tab.tab_chinese_name }}
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <TabContentComponent
        :tab_name="tab_name"
      >
        <!-- 這邊的 template 不知道有沒有更好的寫法 -->
        <template v-slot:cafe_basic_info>
          <BasicInfoComponent
            :basic_info="basic_info"
            :detail_data="detail_data"
          />
        </template>
        <template v-slot:cafe_menu>
          <!--  FIXME  餐廳菜單還沒處理 -->
          餐廳菜單
        </template>
        <template v-slot:coupon_content>
          <!--  FIXME  折價券還沒處理 -->
          折價券的內容
        </template>
        <template v-slot:cafe_reviews>
          網友評論的內容
          <ReviewListComponent
            :reviews_data="reviews"
          />
        </template>
      </TabContentComponent>
    </div>
  </div>
</template>

<script>
import TabContentComponent from './TabContent.vue';
import BasicInfoComponent from '../BasicInfo.vue';
import ReviewListComponent from '../Reviews/ReviewList.vue';

export default {
  name: 'TabWrapperComponent',
  props: {
    reviews: Array,
    basic_info: Object,
    detail_data: Object,
  },
  components: {
    TabContentComponent,
    BasicInfoComponent,
    ReviewListComponent,
  },
  data() {
    return {
      // 目前點擊到的
      tab_name: 'cafe_basic_info',
      // 產品詳細頁會有的所有 tab
      tab_config_list: [
        {
          tab_name: 'cafe_basic_info',
          tab_chinese_name: '餐廳資訊',
          selected: true, // 預設是 false
        },
        // 第二組
        {
          tab_name: 'cafe_menu',
          tab_chinese_name: '餐廳菜單',
          selected: false, // 預設是 false
        },
        {
          tab_name: 'coupon_content',
          tab_chinese_name: '折價券內容',
          selected: false, // 預設是 false
        },
        {
          tab_name: 'cafe_reviews',
          tab_chinese_name: '網友評論',
          selected: false, // 預設是 false
        },
      ],
    };
  },
  methods: {
    getCurrentTab(tabName) {
      this.tab_name = tabName;
    },
  },
  mounted() {},
};
</script>

<style lang="sass" scoped>
.tab_wrapper
  // width: 100%
  // max-width: 1200px
  // margin: 0 auto
</style>
