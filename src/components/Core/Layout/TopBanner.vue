<template>
  <div class="top-banner">
    <div class="describe">
      <p>{{ main_title }}</p>
      <span>{{ vice_title }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  main_title: String,
  vice_title: String,
});
</script>

<style lang="sass" scoped>
.top-banner
  padding: 0px
  height: 350px
  background-image: url('../../../../public/images/cart.jpg')
  background-size: cover
  background-position: bottom
  display: flex
  align-items: center
  justify-content: center
  position: relative
  @media (max-width: 525px)
    background-image: url('../../../../public/images/cart_s.jpg')
  &::after
    content: ''
    background-position: top
    background-image: url('../../../assets/images/wave.svg')
    background-size: cover
    display: block
    width: 100%
    height: 150px
    position: absolute
    bottom: -80px
    z-index: 1
  @media (max-width: 525px)
    &::after
      background-image: url('../../../assets/images/wave_s.svg')
  .describe
    text-align: justify
    @media (max-width: 525px)
      background: rgba(255, 255, 255, .8)
      padding: 1rem
    p
      font-weight: bold
      font-size: 2rem
      margin: 0 0 .5rem
    span
      font-weight: 500
</style>
