<template>
  <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true" ref="modal">
    <!-- 為何這裡要寫 ref="modal", modal 不能自己命名嗎？ -->
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            確定要刪除此項<slot name="delete_item"></slot>嗎？
          </h5>
          <button
            class="btn-close"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <p>品項相關資訊</p>
          <slot name="delete_content"></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            type="button"
            data-bs-dismiss="modal"
            @click="confirm(false)"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="confirm(true)"
          >
            確認
          </button>
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
  emits: [
    'emit-delete',
  ],
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

<style scoped lang="sass">

 </style>
