<template>
  <!-- 這是共用的 CafeCardComponent -->
  <li class="col">
    <div class="card" @click="goToCafeDetail(singleCafe.id)">
      <div class="cafe_image">
        <div
          class="cafe_cover"
          :style="{ backgroundImage: 'url(' + singleCafe.imageUrl + ')' }"
        >
        </div>
        <button
          type="button"
          class="btn btn-primary d-flex"
          @click.stop="addToFavorite(singleCafe.id)"
        >
          <!-- TODO  favorite_id 這個要改寫 -->
          <span
            v-if="is_favorite"
            class="material-icons-round"
          >
            favorite
          </span>
          <span
            v-else
            class="material-icons-round"
          >
            favorite_border
          </span>
        </button>
      </div>
      <div class="card-body">
        <div
          class="card-title d-flex align-items-start flex-wrap justify-content-start">
          <b class="category">
            <span
              v-if="singleCafe.category === '餐廳'"
              class="material-icons-round"
            >
              restaurant
            </span>
            <span
              v-else
              class="material-icons-round"
            >
              free_breakfast
            </span>
          </b>
          <div class="right_title">
            <h5>
            {{ singleCafe.title }}
            </h5>
            <p class="d-flex stars">
              <!-- NOTE  star_rate 必須填寫，沒有填寫的話會直接跑不出來 -->
              <span
                v-for="(n, index) in parseInt(singleCafe.star_rate)"
                :key="'star_' + index"
                class="material-icons-round"
              >
                star
              </span>
              <span
                v-for="(n, index) in parseInt(5 - parseInt(singleCafe.star_rate))"
                :key="'star_' + index"
                class="material-icons-round"
              >
                star_border
              </span>
            </p>
          </div>
        </div>
        <p class="location d-flex align-items-center">
          <span class="material-icons-round">place</span>
          台灣｜{{ singleCafe.area }}
          <b class="nearby">{{ singleCafe.nearby }}</b>
        </p>
        <div class="d-flex justify-content-between bottom_block">
          <p class="rest_num">
            剩下 <span>{{ singleCafe.num }}</span> 張
          </p>
          <p class="price">
            NT$<span>{{ singleCafe.price.toLocaleString() }}</span>
          </p>
        </div>
        <button
          type="button"
          class="btn btn-primary d-flex justify-content-center add_to_cart"
          @click.stop="addToCart(singleCafe.id)"
        >
          <span class="material-icons-round">shopping_cart</span>加入購物車
        </button>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  name: 'CafeCardComponent',
  props: {
    singleCafe: Object,
    is_favorite: Boolean,
  },
  data() {
    return {
      isProcess: false,
    };
  },
  methods: {
    goToCafeDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
    addToCart(id) {
      if (this.isProcess) {
        return;
      }
      this.isProcess = true;
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      this.axios
        .post(requestUrl, {
          data: {
            product_id: id, qty: 1,
          },
        })
        .then((response) => {
          const { success } = response.data;
          if (success) {
            this.$swal('成功加入購物車！');
            // 更新的 modal 的購物車
            this.emitter.emit('updateCartList');
            this.isProcess = false;
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
  mounted() {
  },
};
</script>
<style scoped lang="sass">
li
  padding: .5rem
  margin: .5rem 0
  .card
    border-radius: 16px
    .cafe_image
      position: relative
      width: 100%
      height: 200px
      overflow: hidden
      border-radius: 16px 16px 0 0
      .cafe_cover
        width: 100%
        height: 200px
        background-position: top
        background-size: cover
        transform: scale(1)
        transition: all .5s
        &:hover
          transform: scale(1.15)
      button
        position: absolute
        top: 10px
        right: 10px
    .card-body
      .card-title
        h5
          text-align: left
          margin: 0px
          font-size: 16px
          font-weight: bold
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
          span
            font-size: 18px
        .stars
          margin: 0px
          .material-icons-round
            font-size: 18px
      .location
        font-size: 14px
        margin: 0px
        .nearby
          padding: 1px 8px
          border-radius: 20px
          border: 1px solid #000
          font-size: 12px
          font-weight: normal
          margin: 0 0 0 8px
        .material-icons-round
          font-size: 12px
      .card-text
        text-align: justify
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical

    .add_to_cart
      width: 100%
      position: relative
      bottom: 0px
      left: 0px
.bottom_block
  font-size: 12px
  p
    margin: .5rem
    span
      font-weight: bold
      font-size: 16px
      color: #88664D
</style>
