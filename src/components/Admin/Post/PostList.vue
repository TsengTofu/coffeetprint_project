<template>
  <div>
    <p>貼文的清單</p>
    <!-- 懶得做 UI 了 -->
    {{ post_list }}
    <table class="table table-striped table-hover">
       <thead>
         <tr>
           <th>訂單編號</th>
           <th>建立時間</th>
           <th>編輯</th>
           <th>刪除</th>
         </tr>
      </thead>
      <tbody>
        <template v-if="post_list.length > 0">
          <tr v-for="(post, key) in post_list" :key="'post_' + key">
            <td>{{ post.id }}</td>
            <!-- <td>{{ $dayjs.unix(order.create_at).format('YYYY-MM-DD') }}</td> -->
            <!-- 編輯這邊改成換頁面 -->
            <td>
              <button class="icon_btn"
                type="button"
                @click="directToCurrentPostEdit(post.id)"
              >
                <span class="material-icons-round">edit</span>
              </button>
            </td>
            <td>
              <button class="icon_btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#confirmModal"
                @click="targetItem = post"
              >
                <span class="material-icons-round">delete</span>
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <!--  NOTE @@@  -->
     <button class="add_new_product_button"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
        @click="setStatus('post', {})"
      >
        <span class="material-icons-round">add</span> 新增產品
      </button>
    <PostCardComponent
      ref="modal"
      id="myModal"
      :status="status"
      :article_content="article_content"
    />
  </div>
</template>
<script>
import PostCardComponent from './PostCard.vue';

export default {
  name: 'PostListComponent',
  props: {},
  components: {
    PostCardComponent,
  },
  data() {
    return {
      post_list: [],
      status: '',
      // 暫時使用的 content
      article_content: '',
      targetItem: {},
      targetId: '',
    };
  },
  methods: {
    // 導頁
    directToCurrentPostEdit(currentPostId) {
      this.$router.push(`/admin/post/detail/${currentPostId}`);
    },
    getPostList() {
      //  TODO  這邊要記得放 page，page 的參數要改掉
      // 取得文章列表
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/articles?page=1`;
      this.axios.get(requestUrl)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            const { articles } = response.data;
            this.post_list = articles;
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
      // 注意：文章列表中不包含 content 屬性，請使用單筆文章 API 取得。
    },
    // 設定 status
    setStatus(axiosMethod, data) {
      this.status = axiosMethod;
      this.$refs.modal.tempArticle = JSON.parse(JSON.stringify(data));
    },
  },
  mounted() {
    this.getPostList();
  },
};
</script>
