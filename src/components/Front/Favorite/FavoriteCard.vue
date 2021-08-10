<template>
  <div class="col-md-4 mb-5">
    <div class="card" @click="addToCart(cafe.id)">
      <div class="card-body">
        <!-- 包一層 -->
        <div
          class="image col-9"
          :style="{ backgroundImage: 'url(' + cafe.imageUrl + ')' }"
        >
        </div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div class="content col-3">
          <a
            type="button"
            class="dot_button"
          >
          </a>
        </div>
        <div class="text_block">
          <p>
            <span class="material-icons-round">place</span> {{ cafe.area }}
          </p>
          <h5 class="card_title d-flex align-items-center">
            {{ cafe.title }}
            <span class="material-icons-round">add_circle</span>
          </h5>
        </div>
      </div>
      <div
        type="button"
        class="remove_button"
        @click.stop="removeFromFavoriteList(cafe.id)"
      >
        <span class="material-icons-round">clear</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavoriteCardComponent',
  props: {
    cafe: Object,
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    // 加入購物車的按鈕
    addToCart(id) {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      this.axios
        .post(requestUrl, {
          data: {
            product_id: id,
            qty: 1,
          },
        })
        .then((response) => {
          const { success } = response.data;
          if (success) {
            this.$swal('成功加入購物車！');
            this.emitter.emit('updateCartList');
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
    removeFromFavoriteList(id) {
      this.emitter.emit('updateFavoriteList', id);
    },
  },
};
</script>

<style lang="sass" scoped>
.card
  height: 160px
  overflow: hidden
  border: none
  &:hover
    .card-body
      .image
        filter: grayscale(0)
      .content
        .dot_button
          transform: scale(18)
      .text_block
        .card_title
          span
            opacity: 1
            transform: scale(1)
  .remove_button
    position: absolute
    padding: 1rem
    right: 0px
    top: 0px
    color: #fff
  .card-body
    position: relative
    &:before
      content: ""
      z-index: 99
      position: absolute
      top: -10px
      left: 32px
      display: block
      width: 16px
      height: 16px
      border-radius: 16px
      background-color: #f0ebe5
    &:after
      content: ""
      z-index: 99
      position: absolute
      bottom: -10px
      left: 32px
      display: block
      width: 16px
      height: 16px
      border-radius: 16px
      background-color: #f0ebe5
    ul
      z-index: 99
      position: absolute
      left: 7px
      top: 5px
      list-style-type: none
      li
        width: 2px
        height: 2px
        border-radius: 2px
        margin: 6px 0
        background-color: #fff
    .image
      position: absolute
      height: 100%
      background-position: center
      background-size: cover
      top: 0px
      left: 0px
      bottom: 0px
      filter: grayscale(.5)
      transition: all .5s
    .content
      background: #fff
      position: absolute
      top: 0px
      bottom: 0px
      right: 0px
      .dot_button
        width: 30px
        height: 30px
        background: #88664d
        border-radius: 50%
        transition: all .5s
        mix-blend-mode: multiply
        position: absolute
        bottom: 1rem
    .text_block
      position: absolute
      bottom: 0px
      right: 18%
      p
        text-align: left
        margin: 0px
        color: #fff
        font-weight: bold
        display: flex
        font-size: 1rem
      .card_title
        font-weight: 800
        font-size: 1.2rem
        color: #fff
        padding: 0px .8rem 1rem 0px
        margin: 0px
        span
          margin: 0 0 0 .6rem
          transform: scale(0)
          opacity: 0
          transition: all .5s
          font-size: 2rem
</style>
