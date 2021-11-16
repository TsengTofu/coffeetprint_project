<template>
  <!-- 這個是 PopUp -->
  <!-- 用在哪邊要找一下 -->
  <!-- 命名的話不需要針對 cafe，要改掉 -->
  <div class="modal fade" id="detailModal" tabindex="-1" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            折價券名稱<slot name="cafe_coupon_name"></slot>
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
          <slot name="cafe_content"></slot>
        </div>
        <div class="modal-footer">
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
  name: 'DetailModalComponent',
  props: {
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>

<style scoped lang="sass">

 </style>
