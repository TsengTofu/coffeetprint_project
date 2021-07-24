<template>
  <div class="container">
    <p>這是要編輯的時候會用到的貼文詳細頁面</p>
    <UploadImageComponent />
    <!-- 先暫時這樣寫 -->
    <!-- 地區 -->
    <!-- 靠近哪裏 -->
     <div class="mb-3">
      <label for="area" class="form-label">縣市</label>
      <input
        type="text"
        class="form-control"
        id="area"
        v-model="tempArticle.area"
        placeholder="縣市"
      />
    </div>
    <div class="mb-3">
      <label for="nearby" class="form-label">靠近地標</label>
      <input
        type="text"
        class="form-control"
        id="nearby"
        v-model="tempArticle.nearby"
        placeholder="請輸入靠近地標"
      />
    </div>
    <div class="mb-3">
      <label for="avatar" class="form-label">頭貼網址</label>
      <input
        type="text"
        class="form-control"
        id="avatar"
        v-model="tempArticle.avatar"
        placeholder="請輸入頭貼網址"
      />
    </div>
    <div class="mb-3">
      <label for="cafe_name" class="form-label">主推薦店家名稱</label>
      <input
        type="text"
        class="form-control"
        id="cafe_name"
        v-model="tempArticle.cafe_name"
        placeholder="請輸入主推薦店家名稱"
      />
    </div>
    <div class="mb-3">
      <label for="suggestion" class="form-label">店家描述</label>
      <input
        type="text"
        class="form-control"
        id="suggestion"
        v-model="tempArticle.suggestion"
        placeholder="店家描述"
      />
    </div>
    <div class="row">
      <div class="col-sm-4">
        <div class="mb-3">
          <label for="title" class="form-label">標題</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="tempArticle.title"
            placeholder="請輸入標題"
          />
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">輸入圖片網址</label>
          <input
            type="text"
            class="form-control"
            id="image"
            v-model="tempArticle.imageUrl"
            placeholder="請輸入圖片連結"
          />
        </div>
        <div class="mb-3">
          <label for="author" class="form-label">作者</label>
          <input
            type="text"
            class="form-control"
            id="author"
            v-model="tempArticle.author"
            placeholder="請輸入標題"
          />
        </div>
        <div class="mb-3">
          <label for="create_at">文章建立日期</label>
          <input type="date" class="form-control" id="create_at" v-model="create_at" />
        </div>
      </div>
      <div class="col-sm-8">
        <label for="tag" class="form-label">標籤</label>
        <div class="row gx-1 mb-3">
          <div class="col-md-2 mb-1" v-for="(label, key) in tempArticle.tag" :key="key">
            <div class="input-group input-group-sm">
              <input
                type="text"
                class="form-control form-control"
                id="tag"
                v-model="tempArticle.tag[key]"
                placeholder="請輸入標籤"
              />
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="tempArticle.tag.splice(key, 1)"
              >
                <i class="bi bi-x"></i>
              </button>
            </div>
          </div>
          <div
            class="col-md-2 mb-1"
            v-if="tempArticle.tag[tempArticle.tag.length - 1] || !tempArticle.tag.length"
          >
            <button
              class="btn btn-outline-primary btn-sm d-block w-100"
              @click="tempArticle.tag.push('')"
            >
              新增標籤
            </button>
          </div>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">文章描述</label>
          <textarea
            type="text"
            class="form-control"
            id="description"
            v-model="tempArticle.description"
            placeholder="請輸入文章描述"
          ></textarea>
        </div>
        <div class="mb-3">
          <!-- <ckeditor
            :editor="editor"
            :config="editorConfig"
            class="test"
            v-model="tempArticle.content"
          ></ckeditor> -->
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="tempArticle.isPublic"
              id="isPublic"
            />
            <label class="form-check-label" for="isPublic">
              是否公開
            </label>
          </div>
        </div>
      </div>
    </div>
    <ckeditor
            :editor="editor"
            :config="editorConfig"
            class="test"
            v-model="tempArticle.content"
          ></ckeditor>
    <!-- 按鈕區域 -->
    <button
      type="button"
      @click="editPost"
    >
    確認編輯
    </button>
  </div>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadImageComponent from '../../../components/Admin/UploadImage.vue';

export default {
  name: 'AdminPostDetail',
  props: {},
  components: {
    UploadImageComponent,
  },
  data() {
    return {
      tempArticle: {
        tag: [''],
        create_at: 1555459220,
      },
      //  FIXME  這邊的日期要做轉換，目前是都先寫死
      create_at: 1555459220,
      // 參考：https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html#editor
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'typing', 'bold', 'italic', '|', 'link'],
      },
    };
  },
  methods: {
    getSinglePostContent() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/article/${this.$route.params.id}`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            const { article } = response.data;
            this.tempArticle = article;
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
    // 編輯文章
    editPost() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/article/${this.tempArticle.id}`;
      this.axios
        .put(requestUrl, { data: this.tempArticle })
        .then((response) => {
          if (response.data.success) {
            // this.$emit('emit-data', this.tempArticle);
            // this.modal.hide();
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
  },
  mounted() {
    this.getSinglePostContent();
  },
};
</script>

<style lang="sass" scoped>
.test
  height: 500px
</style>
