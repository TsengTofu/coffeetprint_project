<template>
  <div class="footer_wrapper">
      <div class="content">
        <p>Copyright © 2020 CoffeetPrint.</p>
        <div class="detail">
          <p> 僅個人作品練習，無商業用途。</p>
          <ul>
              <!-- 放那隻貓的 icon -->
              <li><a href="">Github</a></li>
              <!-- Linkdn icon -->
              <li><a href="">Linkedin</a></li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent', // 都要加上後綴
  // props: {
  //     msg: String,
  // },
  data() {
    return {};
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.footer_wrapper
  background: #000
  width: 100%
  color: #fff
  display: flex
  .content
    width: 100%
    max-width: 1200px
    margin: 0 auto
    display: flex
    justify-content: center
    flex-direction: column
    padding: 1rem
    .detail
      display: flex
      justify-content: center
      margin: .5rem 0
      ul
        display: flex
        li
</style>
