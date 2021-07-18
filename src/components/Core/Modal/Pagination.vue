<template>
  <nav aria-label="Page navigation example" ref="pagination">
    <ul class="pagination">
      <li class="page-item"
        :class="!pagination_object.has_pre ? 'disabled' : null"
        @click.prevent="onChangePage(pagination_object.current_page - 1)"
      >
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(item, key) in pagination_object.total_pages"
        :key="'page_' + key"
        :class="pagination_object.current_page === (key + 1) ? 'active' : null"
        @click.prevent="onChangePage(key + 1)"
      >
        <!-- a 連結的預設反應，要取消掉 -->
        <a class="page-link" href="#">{{ key + 1 }}</a>
      </li>
      <li class="page-item"
        :class="!pagination_object.has_next ? 'disabled' : null"
        @click.prevent="onChangePage(pagination_object.current_page + 1)"
      >
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    pagination_object: Object,
    // 為什麼 emit 的方法不需要在 props 宣告？
  },
  data() {
    return {
      current_page: this.pagination_object.current_page,
      page_alert_msg: '',
    };
  },
  methods: {
    onChangePage(page) {
      // 有時候會包成一個 function，有時候會寫在行內，有比較建議的方式嗎？
      if (page === 0 || page > this.pagination_object.total_pages) {
        return;
      }
      this.current_page = page;
      this.$emit('emit-change-page', this.current_page);
    },
  },
  mounted() {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.pagination
  margin: 0px
</style>
