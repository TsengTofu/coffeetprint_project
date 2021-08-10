<template>
  <div>
    <p>這個是給文章列表用的頁面</p>
    <!--  TODO  單篇文章的資料 -->
    {{ post_list }}
  </div>
</template>
<script>
export default {
  name: 'Posts',
  components: {},
  data() {
    return {
      // 回傳的資料
      post_list: [],
      pagination: {},
    };
  },
  methods: {
    // 抓取全部的文章
    getAllPostList() {
      // 一樣要做 pagination 的切換
      //  TODO  後面的 queryPage 要改成參數
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/articles?page=1`;
      this.axios.get(requestUrl)
        .then((response) => {
          const { success } = response.data;
          console.log(response.data);
          if (success) {
            const { articles, pagination } = response.data;
            this.post_list = articles;
            this.pagination = pagination;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    // 先抓取全部的文章
    this.getAllPostList();
  },
};
</script>
<style lang="sass" scoped>
</style>
