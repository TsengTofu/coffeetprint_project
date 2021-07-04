<template>
  <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true" ref="modal">
    <!-- 為何這裡要寫 ref="modal", modal 不能自己命名嗎？ -->
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
          確定刪除此品項：{{ target_item.title }}嗎？
          <!--  NOTE  這樣寫還可以從外面傳值近來欸 -->
          <slot name="delete_item"></slot>
        </h5>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>品項相關資訊</p>
        <!-- TODO  如果有更新能加入的項目，也要跟著連動，樣式待修 -->
        <div class="product_info_container">
          <div class="img_part"></div>
          <div class="info_detail">
            <!--  TODO  這邊也可以改成 slot -->
            標題名稱：<p>{{ target_item.title }}</p>
            分類：<p>{{ target_item.category }}</p>
            說明內容：<p>{{ target_item.content }}</p>
            產品描述：<p>{{ target_item.description }}</p>
            單位：<p>{{ target_item.unit }}</p>
            原價：<p>{{ target_item.origin_price }}</p>
            售價：<p>{{ target_item.price }}</p>
            數量：<p>{{ target_item.num }}</p>
            是否啟用：<p>{{ target_item.is_enable }}</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn-secondary"
          type="button"
          data-bs-dismiss="modal"
          @click="confirm(false)">取消</button>
        <button
          type="button"
          class="btn btn-primary"
          @click="confirm(true)">確認</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'ConfirmModalComponent', // 都要加上後綴
  props: {
    target_item: Object,
  },
  data() {
    return {};
  },
  methods: {
    confirm(isDelete) {
      if (isDelete) {
        this.$emit('emit-delete');
        this.modal.hide();
      }
      return false;
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

 </style>
