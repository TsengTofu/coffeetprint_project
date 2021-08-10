<template>
  <div class="container">
    <!-- TODO  上傳的 UI 介面優化 -->
    <UploadImageComponent />
     <div class="mb-3">
      <label for="area" class="form-label">縣市</label>
      <input
        id="area"
        class="form-control"
        type="text"
        placeholder="縣市"
        v-model="tempArticle.area"
      />
    </div>
    <div class="mb-3">
      <label for="nearby" class="form-label">靠近地標</label>
      <input
        id="nearby"
        class="form-control"
        type="text"
        placeholder="請輸入靠近地標"
        v-model="tempArticle.nearby"
      />
    </div>
    <div class="mb-3">
      <label for="avatar" class="form-label">頭貼網址</label>
      <input
        id="avatar"
        class="form-control"
        type="text"
        v-model="tempArticle.avatar"
        placeholder="請輸入頭貼網址"
      />
    </div>
    <div class="mb-3">
      <label for="cafe_name" class="form-label">主推薦店家名稱</label>
      <input
        id="cafe_name"
        class="form-control"
        type="text"
        placeholder="請輸入主推薦店家名稱"
        v-model="tempArticle.cafe_name"
      />
    </div>
    <div class="mb-3">
      <label for="suggestion" class="form-label">店家描述</label>
      <input
        id="suggestion"
        class="form-control"
        type="text"
        placeholder="店家描述"
        v-model="tempArticle.suggestion"
      />
    </div>
    <div class="row">
      <div class="col-sm-4">
        <div class="mb-3">
          <label for="title" class="form-label">標題</label>
          <input
            id="title"
            class="form-control"
            type="text"
            placeholder="請輸入標題"
            v-model="tempArticle.title"
          />
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">輸入圖片網址</label>
          <input
            id="image"
            class="form-control"
            type="text"
            placeholder="請輸入圖片連結"
            v-model="tempArticle.imageUrl"
          />
        </div>
        <div class="mb-3">
          <label for="author" class="form-label">作者</label>
          <input
            id="author"
            class="form-control"
            type="text"
            placeholder="請輸入標題"
            v-model="tempArticle.author"
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
                id="tag"
                class="form-control form-control"
                type="text"
                placeholder="請輸入標籤"
                v-model="tempArticle.tag[key]"
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
              type="button"
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
            id="description"
            class="form-control"
            type="text"
            placeholder="請輸入文章描述"
            v-model="tempArticle.description"
          >
          </textarea>
        </div>
        <div class="mb-3">
          <!--  TODO  其實我也不懂為何這裡需要註解 -->
          <!-- <ckeditor
            :editor="editor"
            :config="editorConfig"
            class="test"
            v-model="tempArticle.content"
          >
          </ckeditor> -->
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input
              id="isPublic"
              class="form-check-input"
              type="checkbox"
              v-model="tempArticle.isPublic"
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
    >
    </ckeditor>
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
          const { success } = response.data;
          if (success) {
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
