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
            <p>訂單詳細內容</p>
            <span data-bs-dismiss="modal" aria-label="Close">
              <span class="material-icons-round">clear</span>
            </span>
          </div>
          <span>
            編號 {{ currentOrder.id }}
          </span>
        </div>
        <div class="modal-body outer">
          <div class="container">
            <div class="content">
              <!-- TODO  這邊是放內容 -->
              日期{{ currentOrder.create_at }}
              <!-- 下面這邊是純粹複製 -->
              是否付款{{ currentOrder.is_paid }}
              顧客留言{{ currentOrder.message }}
              付款日期{{ currentOrder.paid_date }}
              最終金額{{ currentOrder.total }}
              使用者相關：<br>
              <p v-if="currentOrder.user">
                <span>{{ currentOrder.user.name }}</span>
                <span>{{ currentOrder.user.email }}</span>
                <span>{{ currentOrder.user.tel }}</span>
                <!-- address -->
              </p>
              <!-- <p>{{ currentOrder.user.email }}</p>
              <p>{{ currentOrder.user.name }}</p>
              <p>{{ currentOrder.user.tel }}</p> -->
              <br>
              產品
                <div v-for="(product, key) in currentOrder.products"
                  :key="'product_' + key">
                  <p>{{ product.qty }}</p>
                  <p>{{ product.product.category }}</p>
                  <p>{{ product.product.title }}</p>
                  <p>{{ product.product.imageUrl }}</p>
                  <p>{{ product.final_total }}</p>
                  <!-- <p>{{ product.product }}</p> -->
                  <!--  {{ currentOrder.products[product] }} -->
                </div>
            </div>
          </div>
        </div>
        <div class="modal-footer button_block">
          <button
            class="cancel"
            data-bs-dismiss="modal"
            type="button"
          >
            取消
          </button>
          <button
            type="button"
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
  name: 'OrderDetailCardComponent',
  props: {
    status: String,
  },
  data() {
    return {
      currentOrder: {},
    };
  },
  methods: {},
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
<style scoped lang="sass">
@use '../theme.sass' as *
.wrapper
  .product_card_wrapper
    background: #fafafa
    max-height: 500px
    margin: 45px auto
    position: relative
    border-radius: 16px
    border: none
    box-shadow: 2px 4px 10px rgba(#4c443a ,0.05)
    &::before
      content: ''
      display: block
      width: 6px
      height: 32px
      background: #4c443a
      position: absolute
      left: 0px
      top: 32px
      z-index: 100
    .header
      display: flex
      flex-direction: column
      align-items: flex-start
      padding: 32px
      box-sizing: border-box
      background: #fafafa
      border-bottom: 1px solid  #ddd
      .left
        display: flex
        width: 100%
        align-items: center
        margin: 0 0 8px
        justify-content: space-between
        p
          color: #4c443a
          font-size: 24px
          line-height: 32px
          font-weight: 800
          text-align: justify
          margin: 0px
        span
          cursor: pointer
      span
        font-size: 14px
        font-weight: 600
        color: #5d5d5d
    .outer
      .container
        display: flex
        flex-direction: column
        padding: 0px
        .content
          display: flex
          width: 100%
          ul
            padding: 16px
            display: flex
            flex-direction: column
            flex: 1
            margin: 0px
            li
              display: flex
              width: 100%
              margin: 0 0 8px
              align-items: flex-start
              justify-content: space-between
              p
                display: flex
              &.single
                flex-direction: column-reverse
                .edit_part
                  display: flex
                  width: 100%
                  flex-direction: column-reverse
                  align-items: flex-start
                  position: relative
                  .remove_pic_button
                    position: absolute
                    background: none
                    cursor: pointer
                    border: none
                    right: .1rem
                    line-height: 100%
                    top: 50%
                    &:hover
                      i
                        color: #a97f4a
              &.checkbox
                // 這段開始是 switch 按鈕
                justify-content: flex-start
                align-items: center
                span
                  padding: 0 0 0 8px
                .switch
                  position: relative
                  display: inline-block
                  width: 40px
                  height: 20px
                  vertical-align: middle
                  input
                    opacity: 0
                    width: 100%
                    height: 100%
                    z-index: 999
                    position: absolute
                    left: 0px
                    margin: 0px
                    &:checked + .slider
                      background-color: #4c443a
                      &:before
                        transform: translateX(20px)
                    &:focus + .slider
                      box-shadow: 0 0 1px #2196F3
                  .slider
                    position: absolute
                    cursor: pointer
                    top: 0
                    left: 0
                    right: 0
                    bottom: 0
                    background-color: #ccc
                    transition: .4s
                    border-radius: 34px
                    &:before
                      position: absolute
                      content: ""
                      height: 14px
                      width: 14px
                      left: 3px
                      bottom: 3px
                      background-color: white
                      transition: .4s
                      border-radius: 50%
                      // 結束
              &:last-child
                margin: 0px
              .add_new_pic_button
                border: none
                background: #4c443a
                color: #fff
                border-radius: 24px
                padding: 8px 16px
                text-align: center
              label
                margin: 0 0 8px
                font-weight: 500
                font-size: 14px
                color: #8a8a8a
                transition: all .2s
                span
                  color: #bb925e
              input
                padding: 8px 16px
                border-radius: 8px
                border: 1px #ddd solid
                width: 100%
                transition: all .2s
                color: #4c443a
                &:focus
                  outline: none
                  border: 1px solid #cabaa7
                  background: #f5f1ed
                  ~ label
                    color: #ad9272
              textarea
                border-radius: 8px
                border: 1px #ddd solid
                width: 100%
                padding: 10px 15px
                resize: none
                font-family: 'Noto Sans TC'
                &:focus
                  outline: none
                  border: 1px solid #cabaa7
                  background: #ebe5df
                  ~ label
                    color: #ad9272
              .half
                display: flex
                align-items: flex-start
                flex-direction: column-reverse
                width: 48%
    .button_block
      display: flex
      width: 100%
      // position: absolute
      // bottom: 0px
      background: #fafafa
      // left: 0px
      border-top: 1px solid  #ddd
      padding: 10px 32px
      justify-content: flex-end
      button
        display: block
        padding: 8px 16px
        background: #4c443a
        color: #fff
        border-radius: 8px
        border: none
        font-size: 16px
        font-weight: bold
        margin: 0 0 0 10px
        &.cancel
          background: none
          color: #4c443a
          border: 1px solid #4c443a
        &:hover
          background: #a97f4a
.clear_all_products
  width: 20%
  display: block
  padding: 15px
  margin: 0px auto 45px
  background: #000
  color: #fff
  border-radius: 5px
  border: none
  font-size: 16px
  font-weight: bold
  &:hover
    background: #352a2a
</style>
