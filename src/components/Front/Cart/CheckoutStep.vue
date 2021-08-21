<template>
  <div class="checkout_step_wrapper container">
    <ul class="row">
      <li
        class="col"
        :class="step === 'check_cart' ? 'active' : null"
        style="--step: '確認品項'"
      >
        <span class="material-icons">shopping_cart</span>
      </li>
      <li style="--step: '確認品項'">
        <div
          class="line"
          :class="step === 'check_cart' ? 'active' : null"
        ></div>
      </li>
      <li
        class="col"
        :class="step === 'order_info' ? 'active' : null"
        style="--step: '填寫資料'"
      >
        <span class="material-icons">format_list_bulleted</span>
      </li>
      <li style="--step: '確認結帳'">
        <div
          class="line"
          :class="step === 'order_info' ? 'active' : null"
        ></div>
      </li>
      <li
        class="col"
        :class="step === 'order_payment' ? 'active' : null"
        style="--step: '確認結帳'"
      >
        <span class="material-icons">local_post_office</span>
      </li>
      <li style="--step: '訂購成功'">
        <div
          class="line"
          :class="step === 'order_payment' ? 'active' : null"
        ></div>
      </li>
      <li class="col"
      :class="step === 'order_complete' ? 'active' : null"
        style="--step: '訂購成功'"
      >
        <span class="material-icons">done</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CheckoutStepComponent',
  props: {
    step: String,
  },
  components: {},
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style scoped lang="sass">
.checkout_step_wrapper
  ul
    padding: 0px
    margin: 0 auto
    display: flex
    li
      display: flex
      width: 20%
      flex-direction: column
      align-items: center
      position: relative
      justify-content: center
      color: #d2d2d2
      &:nth-child(even)
        &:after
          content: var(--step)
          display: block
          padding: .5rem
          opacity: 0
      &:nth-child(odd)
        &:after
          content: var(--step)
          padding: .5rem
          display: block
          font-weight: 500
      &.active
        color: #88664D
        .material-icons
          color: #fff
          background: #88664D
          border: 2px solid #88664D
          box-shadow: 0 0 0 rgba(136,102,77, 0.4)
          animation: pulse 2s infinite
      &:last-child
        margin: 0px
      span
        font-size: 1rem
        line-height: 27px
        margin: 8px 0 0 0
      p
        font-size: 1rem
        line-height: 22px
      .material-icons
        border-radius: 50%
        width: 4.5rem
        height: 4.5rem
        line-height: 4rem
        border: 3px solid #d2d2d2
        font-size: 2rem
        text-align: center
        vertical-align: middle
        margin: 0px
.line
  width: 100%
  height: 2px
  background: #d2d2d2
  display: block
  &.active
    background: #88664D
@media (max-width: 525px)
  .checkout_step_wrapper
    ul
      li
        padding: 0px
        .material-icons
          width: 2.5rem
          height: 2.5rem
          line-height: 2.5rem
          font-size: 1.2rem
        &:nth-child(even)
          width: 10%
          &:after
            content: var(--step)
            display: block
            padding: 0px
            opacity: 0
            font-size: .8rem
        &:nth-child(odd)
          &:after
            content: var(--step)
            padding: 0px
            display: block
            font-weight: 500
            font-size: .8rem
// 動畫的部分
@keyframes pulse
  0%
    box-shadow: 0 0 0 0 rgba(136,102,77, 0.4)
  70%
    box-shadow: 0 0 0 10px rgba(136,102,77, 0)
  100%
    box-shadow: 0 0 0 0 rgba(136,102,77, 0)

</style>
