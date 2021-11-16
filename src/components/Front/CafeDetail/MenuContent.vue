<template>
  <div class="menu_content_wrapper">
    <p>這個是菜單的部分</p>
    <!-- 這是左半邊的菜單 -->
    <!-- 需要放標題、還有分類項目 -->
    <ul class="list-unstyled d-flex">
      <li
        v-for="(item, key) in category_list" :key="'category' + key"
        class="menu_category m-1"
      >
        <button
          type="button"
          v-if="item !== 'all'"
          class="btn"
          :class="current_category === item ? 'btn-primary' : 'btn-outline-primary'"
          @click="getCurrentMenuCategory(item)"
        >
          {{ item }}
        </button>
        <!-- 如果是全部 -->
        <button
          type="button"
          class="btn"
          :class="current_category === item ? 'btn-primary' : 'btn-outline-primary'"
          v-else
          @click="getCurrentMenuCategory(item)"
        >
          全部品項
        </button>
      </li>
    </ul>
    <ul class="list-unstyled">
      <!-- 這邊開始是菜單的項目 -->
      <template
        v-for="(item, key) in JSON.parse(menu_data)"
        :key="'menu_' + key"
      >
        <li
          class="menu_item"
          v-if="current_category === item.food_category"
        >
          <div class="item_name_price">
            <p class="name">
              <b v-if="item.is_recommend">店長推薦</b>
              {{ item.food_name }}
            </p>
            <p>NT$ {{ item.price.toLocaleString() }}</p>
          </div>
          <span>{{ item.note_description }}</span>
        </li>
        <!-- 全部 -->
        <li
          class="menu_item"
          v-if="current_category === 'all'"
        >
          <div class="item_name_price">
            <p class="name">
              <b v-if="item.is_recommend">店長推薦</b>
              {{ item.food_name }}
            </p>
            <p>NT$ {{ item.price.toLocaleString() }}</p>
          </div>
          <span>{{ item.note_description }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'MenuContentComponent',
  props: {
    menu_data: String,
  },
  data() {
    return {
      all_menu_data: [],
      current_category: 'all',
      category_list: [],
    };
  },
  methods: {
    // 預設顯示全部的菜單
    getAllMenuCategoryList() {
      this.all_menu_data.forEach((menuItem) => {
        if (this.category_list.indexOf(menuItem.food_category) === -1) {
          this.category_list.push(menuItem.food_category);
        }
      });
      console.log(this.category_list); // 這邊就是全部的分類了
      this.category_list.unshift('all');
    },
    // 點擊按鈕之後
    getCurrentMenuCategory(categoryName) {
      console.log(categoryName);
      this.current_category = categoryName;
      // categoryName
      // this.all_menu_data
    },
  },
  mounted() {
    this.all_menu_data = JSON.parse(this.menu_data);
    this.getAllMenuCategoryList();
  },
};
</script>
<style lang="sass" scoped>
.menu_content_wrapper
  background: #fafafa
  padding: 2rem
  .menu_category
  .menu_item
    display: flex
    flex-direction: column
    .item_name_price
      display: flex
      justify-content: space-between
      position: relative
      &::before
        content: ''
        border: 1px dashed rgba(120, 128, 120, .3)
        display: block
        width: 100%
        height: 1px
        position: absolute
        top: 50%
      p
        margin: 0px
      .name
    span
      text-align: left
</style>
