<template>
  <div class="checkout_step_wrapper">
    <ul class="row">
      <li class="col-3">
        <span class="material-icons">shopping_cart</span>
        <span>STEP.1</span>
        <p>確認購物車</p>
      </li>
      <li class="col-3">
        <span class="material-icons">format_list_bulleted</span>
        <span>STEP.2</span>
        <p>填寫預定資料</p>
      </li>
      <li class="col-3">
        <span class="material-icons">local_post_office</span>
        <span>STEP.3</span>
        <p>確認結帳</p>
      </li>
      <li class="col-3">
        <span class="material-icons">done</span>
        <span>STEP.4</span>
        <p>訂購成功</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CheckoutStepComponent',
  props: {},
  components: {},
  data() {
    return {};
  },
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
      // width: 20%
      flex-direction: column
      align-items: center
      // margin: 0 90px 0 0
      position: relative
      &:after
        content: ""
        position: absolute
        top: 49px
        right: -60px
        display: block
        width: 5rem
        height: 2px
        background: #000
      &:last-child
        margin: 0px
        &:after
          display: none
      span
        font-size: 20px
        line-height: 27px
        margin: 8px 0 0 0
      p
        font-size: 16px
        line-height: 22px
      .material-icons
        border-radius: 50%
        width: 70px
        height: 70px
        line-height: 70px
        border: 3px solid #000
        font-size: 35px
        text-align: center
        vertical-align: middle
        margin: 0px
</style>
