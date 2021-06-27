<template>
  <div class="footer_wrapper">
    <div class="d-flex flex-row align-items-center justify-content-between content">
      <a class="navbar-brand logo" href="#"></a>
      <p>Copyright © 2020 CoffeetPrint. 僅個人作品練習，無商業用途。</p>
      <div class="detail">
        <ul class="list-unstyled d-flex link">
          <li>
            <p><span class="material-icons-round">account_circle</span>後台登入</p>
          </li>
          <li>
            <a href="">
              <img src="../../../assets/images/icon/github.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="">
              <img src="../../../assets/images/icon/linkedin.svg" alt="" />
            </a>
          </li>
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
  background: #535252
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
    .logo
      width: 160px
      height: 40px
      display: block
      background-position: center
      background-image: url('../../../assets/images/logo_coffeetprint.svg')
      background-size: contain
      background-repeat: no-repeat
    p
      margin: 0px
      font-size: 0.875rem
    .detail
      display: flex
      justify-content: center
      margin: .5rem 0
      .link
        li
          a
            width: 20px
            height: 20px
            display: block
            img
              width: 100%
              height: auto
</style>
