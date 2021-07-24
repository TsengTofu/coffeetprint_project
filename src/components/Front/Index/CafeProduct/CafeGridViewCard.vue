<template>
  <li class="col">
    <div class="card"
      @click="goToCafeDetail(singleCafe.id)"
      style="max-width: 540px;">
      <div class="row g-0">
        <div class="col image">
          <div
            class="cover_image"
            :style="{ backgroundImage: 'url(' + singleCafe.imageUrl + ')' }"
          ></div>
          <button
            class="btn btn-primary add_to_favorite d-flex"
            type="button"
            @click.stop="addToFavorite(singleCafe.id)"
          >
            <span v-if="is_favorite" class="material-icons-round">
              favorite
            </span>
            <span v-else class="material-icons-round">
              favorite_border
            </span>
          </button>
        </div>
        <div class="col">
          <div class="card-body">
            <div class="d-flex title">
              <b class="category">
                <span v-if="singleCafe.category === '餐廳'" class="material-icons-round"
                  >restaurant</span
                >
                <span v-else class="material-icons-round">
                  free_breakfast
                </span>
              </b>
              <div class="right_text">
                <h5>{{ singleCafe.title }}</h5>
                <p class="d-flex stars">
                  <span
                    v-for="(n, index) in parseInt(singleCafe.star_rate)"
                    :key="'star_' + index"
                    class="material-icons-round"
                    >star</span
                  >
                  <span
                    v-for="(n, index) in 5 - parseInt(singleCafe.star_rate)"
                    :key="'star_' + index"
                    class="material-icons-round"
                    >star_border</span
                  >
                </p>
              </div>
            </div>
            <p class="card-text">
              <small class="text-muted location d-flex align-items-center">
                <span class="material-icons-round">place</span>
                台灣｜{{ singleCafe.area }}<b class="nearby">{{ singleCafe.nearby }}</b>
              </small>
            </p>
            <p class="card-text describe" v-html="singleCafe.description"></p>
            <div class="d-flex bottom_block">
              <div class="d-flex flex-column left_block">
                <p>剩下 <span>{{ singleCafe.num }}</span> 張</p>
                <p>NT$ <span>{{ singleCafe.price.toLocaleString() }}</span></p>
              </div>
              <button
                class="btn btn-primary d-flex justify-content-center align-items-center add_to_cart"
                @click.stop="addToCart(singleCafe.id)"
              >
                <span class="material-icons-round">shopping_cart</span>
                我要購買
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'CafeGridViewCardComponent',
  props: {
    singleCafe: Object,
    is_favorite: Boolean,
  },
  components: {},
  data() {
    return {
    };
  },
  methods: {
    goToCafeDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
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
            //  TODO  options 樣式之後再回來設定
            this.$swal('成功加入購物車！');
            // 更新的 modal 的購物車
            this.emitter.emit('updateCartList');
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
    // 加到我的最愛
    addToFavorite(id) {
      this.emitter.emit('addToFavoriteList', id);
    },
  },
  mounted() {},
};
</script>

<style lang="sass" scoped>
.image
  height: 100%
  position: relative
  overflow: hidden
  .cover_image
    display: block
    background-position: top
    background-size: cover
    width: 100%
    height: 100%
    transform: scale(1)
    transition: all .5s
    &:hover
      transform: scale(1.15)
  .add_to_favorite
    position: absolute
    top: 10px
    left: 10px
.describe
  font-size: 14px
  text-align: justify
  overflow: hidden
  text-overflow: ellipsis
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
.title
  .category
    padding: .2rem .5rem
    font-size: 12px
    background: #212529
    margin: 0px
    border-radius: 50%
    color: #fff
    width: 38px
    height: 38px
    display: flex
    justify-content: center
    align-items: center
    margin: 0 8px 0 0
  .right_text
    h5
      margin: 0px
.stars
  margin: 0px
  .material-icons-round
    font-size: 18px
.bottom_block
  .left_block
    p
      margin: 0px
  .add_to_cart
</style>
