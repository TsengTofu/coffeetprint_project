<template>
  <li class="col" @click="goToCafeDetail(singleCafe.id)">
    <div class="card">
      <div class="cafe_image">
        <!--  TODO  這邊要改成 bg image -->
        <img :src="singleCafe.imageUrl" class="card-img-top" alt="咖啡廳圖片" />
        <button class="btn btn-primary" type="button">
          <span class="material-icons-round">favorite_border</span>
        </button>
      </div>
      <div class="card-body">
        <div
          class="card-title d-flex align-items-start flex-wrap flex-column justify-content-start">
          <b class="category">{{ singleCafe.category }}</b>
          <h5>
            {{ singleCafe.title }}
          </h5>
        </div>
        <!-- 星星跟地點 -->
        <div class="location_stars">
          <p class="d-flex stars">
            <span v-for="(n, index) in parseInt(singleCafe.star_rate)"
              :key="'star_' + index" class="material-icons-round">star</span>
              <span v-for="(n, index) in (5 - parseInt(singleCafe.star_rate))"
              :key="'star_' + index" class="material-icons-round">star_border</span>
          </p>
          <p class="location">
            <span class="material-icons-round">place</span>
            <b class="nearby">{{ singleCafe.nearby }}</b> {{ singleCafe.area }}｜台灣</p>
        </div>
        <p class="card-text" v-html="singleCafe.description"></p>
        <!-- 剩下幾張與價格 -->
        <div class="d-flex justify-content-between bottom_block">
          <!-- 剩下幾張 -->
          <p class="rest_num">
            剩下 <span>{{ singleCafe.num }}</span> 張
          </p>
          <!-- 價格 -->
          <p class="price">
            NT$<span>{{ singleCafe.price }}</span>
          </p>
        </div>
      </div>
      <a href="#"
        class="btn btn-primary d-flex justify-content-center add_to_cart"
        @click="addToCart(singleCafe.id)">
          <span class="material-icons-round">shopping_cart</span>加入購物車
      </a>
    </div>
  </li>
</template>
<script>
export default {
  name: 'CafeCardComponent',
  props: {
    singleCafe: Object,
  },
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
            product_id: id, qty: 1,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.emitter.emit('updateCartList');
          } else {
            console.log('出了點錯誤，請稍後再嘗試，謝謝。');
          }
        })
        .catch((error) => {
          console.log(error, 'getDataError');
        });
    },
  },
  mounted() {},
};
</script>
<style scoped lang="sass">
li
  // width: 25%
  .card
    margin: 1rem
    border-radius: 16px
    .cafe_image
      position: relative
      button
        position: absolute
        top: 10px
        right: 10px
    .card-body
      .card-title
        h5
          text-align: left
          margin: 0px
        .category
          padding: .2rem .5rem
          font-size: 12px
          background: #000
          margin: 0px
          border-radius: 16px
          color: #fff
      .location_stars
        font-size: 12px
        .stars
          margin: 0px
        .location
          .nearby
            padding: 4px 8px
            border-radius: 20px
            border: 1px solid #000
          .material-icons-round
            font-size: 12px
      .card-text
        text-align: justify
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 3
        -webkit-box-orient: vertical

    .add_to_cart
      width: 100%
      position: relative
      bottom: 0px
      left: 0px
      border-radius: 0px 0px 16px 16px
</style>
