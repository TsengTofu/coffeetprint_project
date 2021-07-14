<template>
  <div class="modal fade" id="orderDetailModal" ref="modal" tabindex="-1">
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
            <p>這是訂單詳細的卡片 PopUp</p>
            <!-- <p>{{ status === 'post' ? '新增產品' : '編輯產品' }}</p> -->
            <span data-bs-dismiss="modal" aria-label="Close">
              <span class="material-icons-round">clear</span>
            </span>
          </div>
          <span>
            mmmmmm
            <!-- {{ status === 'post' ?
              '請輸入產品資訊，並設定產品相關圖片。' : '請編輯產品相關資訊。' }} -->
          </span>
        </div>
        <div class="modal-body outer">
          <div class="container">
            <div class="content">
              <!-- TODO  這邊是放內容 -->
            </div>
          </div>
        </div>
        <div class="modal-footer button_block">
          <button class="cancel" data-bs-dismiss="modal" type="button">取消</button>
          <!--  TODO  下面這行應該不需要 -->
          <button v-if="status === 'post'" @click="addNewProduct" type="button">確認</button>
          <!-- 編輯產品的功能 -->
          <button v-else @click="editCurrentOrder" type="button">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  TODO  這段也需要先撈到該筆的資料
export default {
  name: 'OrderDetailCardComponent',
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
