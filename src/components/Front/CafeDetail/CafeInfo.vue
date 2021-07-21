<template>
  <div class="container info_wrapper row">
    <!-- 我是產品詳細頁上半部的卡片 -->
    <SwiperModalComponent
      class="col-7"
      :pic_list="cafe_image_list"
    />
    <div class="right_info col-5">
      <h3>
        <span>{{ detail_data.category }}</span>
        {{ detail_data.title }}
      </h3>
      <small>{{ detail_data.id }}</small>
      <p><span class="material-icons-round">place</span>{{ detail_data.area }}｜台灣</p>
      <p v-html="detail_data.content"></p>
      <p>NT$ {{ detail_data.origin_price.toLocaleString() }}</p>
      <p>NT$ {{ detail_data.price.toLocaleString() }}</p>
      <!-- 加入購物車、數量 -->
      <p>剩餘數量：{{ detail_data.num }}</p>
      <!-- 數量的 input -->
      <!-- 如果可購買量大於 0 才顯示 -->
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
          <input type="text" class="form-control" :value="item_qty" aria-label="數量" />
          <button
            class="btn btn-outline-secondary"
            :class="item_qty === parseInt(detail_data.num) ? 'disabled' : ''"
            type="button"
            @click="modifyNum('add')"
          >
            <span class="material-icons-round">add</span>
          </button>
        </div>
        <!-- 加上補充說明文字 -->
        <p v-if="item_qty === parseInt(detail_data.num)">沒有更多數量囉！</p>
        <p v-if="item_qty === 1">至少購買一個！</p>
      </template>
      <!-- 如果已經沒有數量了，就要顯示無法購買 -->
      <!-- 樣式要再調整 -->
      <template v-else>
        <div>
          <button type="button">貨到通知</button>
        </div>
      </template>

      <button type="button" class="btn btn-primary" @click="addToCart(detail_data.id)">
        <span class="material-icons-round">shopping_cart</span>
        加入購物車
      </button>
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
    };
  },
  methods: {
    modifyNum(operation) {
      if (operation === 'add') {
        if (this.item_qty < Number(this.detail_data.num)) {
          this.item_qty += 1;
        }
      }

      if (operation === 'minus') {
        if (this.item_qty > 1) {
          this.item_qty -= 1;
        }
      }
    },
    // 加入購物車的按鈕
    addToCart(id) {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      this.axios
        .post(requestUrl, {
          data: {
            product_id: id,
            qty: this.item_qty,
          },
        })
        .then((response) => {
          if (response.data.success) {
            //  TODO  options 樣式之後再回來設定
            this.$swal('成功加入購物車！');
            // 更新的 modal 的購物車
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
  mounted() {
  },
  watch: {
    detail_data() {
      this.cafe_image_list.push(this.detail_data.imageUrl);
      if (this.detail_data.imagesUrl) {
        this.cafe_image_list.concat(this.detail_data.imagesUrl);
      }
    },
  },
};
</script>
<style scoped lang="sass">
.right_info
  width: 40%
</style>
