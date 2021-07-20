<template>
  <!-- views 的 Name 都不會加上後綴 component -->
  <div>
    <p>哈囉我是後台貼文頁面</p>
    <PostListComponent />
  </div>
</template>
<script>
import PostListComponent from '../../../components/Admin/Post/PostList.vue';

export default {
  name: 'AdminPosts',
  props: {},
  components: {
    PostListComponent,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // 看是不是要在這裡先拿資料
  },
};
</script>
