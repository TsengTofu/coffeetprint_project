<template>
  <div>
    <p>這是貼文編輯的地方</p>
     <div class="modal fade" id="couponModal" ref="modal" tabindex="-1">
    <div
      class="modal-xl
        modal-dialog
        modal-dialog-centered
        modal-dialog-scrollable
        wrapper"
    >
      <div
        class="modal-content
          product_card_wrapper"
      >
        <div class="modal-header header">
          <div class="left">
            <p>{{ status === 'post' ? '新增產品' : '編輯產品' }}</p>
            <span data-bs-dismiss="modal" aria-label="Close">
              <span class="material-icons-round">clear</span>
            </span>
          </div>
          <span>
            {{ status === 'post' ?
              '請輸入產品資訊，並設定產品相關圖片。' : '請編輯產品相關資訊。' }}
          </span>
        </div>
        <div class="modal-body outer">
          <div class="container">
            <!--  TODO  這邊要放內容 -->
          </div>
        </div>
        <div class="modal-footer button_block">
          <button class="cancel" data-bs-dismiss="modal" type="button">取消</button>
          <button v-if="status === 'post'" @click="addNewProduct" type="button">確認</button>
          <button v-else @click="editProduct" type="button">確認</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  //  TODO  卡片是不是要改成 Modal 的形容會比較好？
  name: 'PostCardComponent',
  props: {},
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
