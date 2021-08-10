<template>
  <div>
    <p>上傳圖片區塊</p>
    <form enctype="multipart/form-data" method="post">
      <input
        type="file"
        name="file-to-upload"
        @change="uploadImage"
      />
    </form>
    <p>網址位置</p>
    <input
      type="text"
      v-model="url"
      ref="imageUrl"
    >
    <button
      type="button"
      @click="copyImageUrl"
    >
      點我複製網址
    </button>
  </div>
</template>

<script>
export default {
  name: 'UploadImageComponent',
  props: {},
  components: {},
  data() {
    return {
      url: '',
    };
  },
  methods: {
    uploadImage(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/upload`;
      this.axios
        .post(requestUrl, formData)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            this.$swal('成功上傳');
            this.url = response.data.imageUrl;
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
    copyImageUrl() {
      this.$refs.imageUrl.select();
      this.$refs.imageUrl.setSelectionRange(0, 99999);
      document.execCommand('copy');
    },
  },
  mounted() {},
};
</script>

<style scoped lang="sass"></style>
