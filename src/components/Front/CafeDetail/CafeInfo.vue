<template v-if="detail_data">
  <div class="container info_wrapper mb-4">
    <div class="row">
      <SwiperModalComponent
        class="col-sm-6"
        :pic_list="cafe_image_list"
      />
      <div class="right_info col-sm-6">
        <h2 class="common_row_align">
          <p class="category">{{ detail_data.category }}</p>
          {{ detail_data.title }}
        </h2>
        <small>{{ detail_data.id }}</small>
        <p class="d-flex stars" v-if="detail_data.star_rate">
          版主評價
          <span
            v-for="(n, index) in parseInt(detail_data.star_rate)"
            :key="'star_' + index"
            class="material-icons-round"
            >star
          </span>
          <span
            v-for="(n, index) in parseInt(5 - detail_data.star_rate)"
            :key="'star_' + index"
            class="material-icons-round"
            >star_border
          </span>
        </p>
        <p class="common_row_align">
          <span class="material-icons-round">place</span>
          {{ detail_data.area }}｜台灣 <b>{{ detail_data.nearby }}</b>
        </p>
        <h6>【{{ detail_data.title }} 雙人套餐折價券內容】</h6>
        <p v-html="detail_data.content"></p>
        <div v-html="detail_data.note"></div>
        <div class="d-flex">
          <p class="origin_price"><span>NT$ </span>{{ detail_data.origin_price }}</p>
          <p class="price"><span>NT$ </span>{{ detail_data.price }}</p>
        </div>
        <div class="common_row_align">
          <p>剩餘數量：{{ detail_data.num }} 張</p>
          <p
            v-if="item_qty === parseInt(detail_data.num)"
          >
            沒有更多數量囉！
          </p>
        </div>
        <!-- 數量的 input 如果可購買量大於 0 才顯示 -->
        <template v-if="parseInt(detail_data.num) > 0">
          <div class="input-group">
            <button
              type="button"
              class="btn btn-outline-secondary"
              :class="item_qty === 1 ? 'disabled' : ''"
              @click="modifyNum('minus')"
            >
              <span class="material-icons-round">remove</span>
            </button>
            <input
              type="text"
              class="form-control center"
              :value="item_qty"
              aria-label="數量"
            />
            <button
              class="btn btn-outline-secondary"
              :class="item_qty === parseInt(detail_data.num) ? 'disabled' : ''"
              type="button"
              @click="modifyNum('add')"
            >
              <span class="material-icons-round">add</span>
            </button>
          </div>
        </template>
        <!-- 如果已經沒有數量了，就要顯示無法購買 -->
        <template v-else>
          <div>
            <button type="button">貨到通知</button>
          </div>
        </template>
       <div class="btn_area common_row_align">
          <button
          type="button"
          class="btn btn-primary common_row_align"
          @click="addToCart(detail_data.id)">
          <span class="material-icons-round">shopping_cart</span>
          加入購物車
        </button>
        <!-- 加到最愛的按鈕 -->
        <button
          type="button"
          class="btn btn-primary common_row_align"
        >
          <!-- <span class="material-icons-round">favorite</span> -->
          <span class="material-icons-round">favorite_border</span>
          加入收藏
        </button>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import SwiperModalComponent from '../../Core/Swiper/SwiperModal.vue';

export default {
  name: 'CafeInfoComponent',
  props: {
    detail_data: Object,
  },
  components: {
    SwiperModalComponent,
  },
  data() {
    return {
      item_qty: 1,
      // 設定最後的圖片傳入
      cafe_image_list: [],
      isProcess: false,
    };
  },
  methods: {
    modifyNum(operation) {
      switch (operation) {
        case 'add':
          if (this.item_qty < Number(this.detail_data.num)) {
            this.item_qty += 1;
          }
          break;
        case 'minus':
          if (this.item_qty > 1) {
            this.item_qty -= 1;
          }
          break;
        default:
      }
    },
    // 加入購物車的按鈕
    addToCart(id) {
      if (this.isProcess) {
        return;
      }
      this.isProcess = true;
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      this.axios
        .post(requestUrl, {
          data: {
            product_id: id,
            qty: this.item_qty,
          },
        })
        .then((response) => {
          const { success } = response.data;
          if (success) {
            this.$swal('成功加入購物車！');
            // 更新的 modal 的購物車
            this.emitter.emit('updateCartList', Number(this.this.detail_data.num));
            this.isProcess = false;
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
  },
  watch: {
    detail_data() {
      const tempList = this.detail_data.imagesUrl || [];
      this.cafe_image_list = tempList.concat(this.detail_data.imageUrl);
    },
  },
  mounted() {
  },
};
</script>
<style scoped lang="sass">
.right_info
  text-align: left
  .category
    display: block
    border-radius: 16px
    border: #000 1px solid
    font-size: 1.2rem
    width: fit-content
    padding: .2rem .5rem
    margin: 0 .5rem 0 0
h2
  font-weight: bold
.origin_price
  font-size: 1rem
.price
  font-size: 2rem
  font-weight: bold
  color: #88664D

</style>
