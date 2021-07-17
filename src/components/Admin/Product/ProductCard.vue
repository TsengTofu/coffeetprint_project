<template>
  <div class="modal fade" id="myModal" ref="modal" tabindex="-1">
    <div
      class="modal-xl
        modal-dialog
        modal-dialog-centered
        modal-dialog-scrollable
        wrapper"
    >
      <div
        class="modal-content
          product_card_wrapper"
      >
        <div class="modal-header header">
          <div class="left">
            <p>{{ status === 'post' ? '新增產品' : '編輯產品' }}</p>
            <span data-bs-dismiss="modal" aria-label="Close">
              <span class="material-icons-round">clear</span>
            </span>
          </div>
          <span>
            {{ status === 'post' ?
              '請輸入產品資訊，並設定產品相關圖片。' : '請編輯產品相關資訊。' }}
          </span>
        </div>
        <div class="modal-body outer">
          <div class="container">
            <div class="content">
              <ul>
                <!--  TODO  新增一塊是給折價券名字的，例如：xxx 雙人優惠券 -->
                <!-- 這邊會是咖啡廳的名稱 -->
                <li class="single">
                  <input
                    id="product_title"
                    type="text"
                    placeholder="請輸入產品標題"
                    v-model="tempProduct.title"
                  />
                  <label for="product_title" class="text">產品標題<span>*</span></label>
                </li>
                <li class="single">
                  <input
                    id="product_nearby"
                    type="text"
                    placeholder="請輸入鄰近的地標"
                    v-model="tempProduct.nearby"
                  />
                  <label for="product_nearby" class="text">鄰近地標<span>*</span></label>
                </li>
                <li>
                  <div class="half">
                    <input
                      id="product_category"
                      type="text"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                    <label for="product_category">分類<span>*</span></label>
                  </div>
                  <div class="half">
                    <input
                      id="product_unit"
                      type="text"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                    <label for="product_unit">單位<span>*</span></label>
                  </div>
                </li>
                <!--  NOTE  新增的區域 -->
                <li>
                  <div class="half">
                    <input
                      id="product_rate"
                      type="number"
                      min="1"
                      placeholder="請輸入星級評等"
                      v-model="tempProduct.star_rate"
                    />
                    <label for="product_rate">星級評等<span>*</span></label>
                  </div>
                  <!-- 價位、營業時間、定位 -->
                  <div class="half">
                    <input
                      id="product_website"
                      type="text"
                      placeholder="請輸入官方網站網址"
                      v-model="tempProduct.website"
                    />
                    <label for="product_website">官方網站<span>*</span></label>
                  </div>
                </li>
                <!-- 新增結束 -->
                <li>
                  <div class="half">
                    <input
                      id="product_area"
                      type="text"
                      placeholder="請輸入地區"
                      v-model="tempProduct.area"
                    />
                    <label for="product_area">地區<span>*</span></label>
                  </div>
                  <!-- 電話、地址、價位、營業時間、社群、幾顆星、定位 -->
                  <div class="half">
                    <input
                      id="product_phone"
                      type="text"
                      placeholder="請輸入電話"
                      v-model="tempProduct.phone"
                    />
                    <label for="product_phone">電話<span>*</span></label>
                  </div>
                </li>
                <li class="single">
                  <input
                    id="product_address"
                    type="text"
                    placeholder="請輸入地址"
                    v-model="tempProduct.address"
                  />
                  <label for="product_address" class="text">地址<span>*</span></label>
                </li>
                <li>
                  <div class="half">
                    <input
                      id="origin_price"
                      type="number"
                      min="0"
                      placeholder="請輸入原價"
                      v-model.number="tempProduct.origin_price"
                    />
                    <label for="origin_price">原價<span>*</span></label>
                  </div>
                  <div class="half">
                    <input
                      id="product_price"
                      type="number"
                      min="0"
                      placeholder="請輸入售價"
                      v-model.number="tempProduct.price"
                    />
                    <label for="product_price">售價<span>*</span></label>
                  </div>
                </li>
                <li class="single">
                  <textarea
                    id="product_description"
                    type="text"
                    placeholder="請輸入說明內容"
                    v-model="tempProduct.description"
                  ></textarea>
                  <label for="product_description">咖啡廳描述</label>
                </li>
                <li class="single">
                  <textarea
                    id="product_content"
                    type="text"
                    placeholder="請輸入說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                  <label for="product_content">折價券內容</label>
                </li>
                <li class="checkbox">
                  <div class="switch">
                    <input
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                    />
                    <span class="slider"></span>
                  </div>
                  <span>是否啟用此產品</span>
                </li>
              </ul>
              <!-- 圖片部分 -->
              <ul>
                <li class="single">
                  <input
                    id="product_main_pic"
                    type="text"
                    placeholder="請輸入單位"
                    v-model="tempProduct.imageUrl"
                  />
                  <label for="product_main_pic">主要圖片</label>
                </li>
                <li>
                  <p><span class="material-icons-round">collections</span>多圖新增</p>
                  <button class="add_new_pic_button" @click="addNewPic" type="button">新增圖片</button>
                </li>
                <template v-if="tempProduct.imagesUrl !== undefined
                  && tempProduct.imagesUrl.length > 0">
                  <li class="single" v-for="(item, key) in tempProduct.imagesUrl" :key="key">
                    <img
                      v-if="tempProduct.imagesUrl[key]"
                      :src="tempProduct.imagesUrl[key]" alt="" width="150" height="150" />
                    <img v-else
                      src="../../../assets/images/default_img.png"
                      alt="" width="150" height="150"
                    />
                    <div class="edit_part">
                      <input
                        :id="`product_images_` + key"
                        type="text"
                        placeholder="請輸入圖片網址"
                        v-model="tempProduct.imagesUrl[key]"
                      />
                      <label :for="`product_images_` + key">圖片網址</label>
                      <button class="remove_pic_button"
                        type="button" @click="removeCurrentPic(key)">
                        <span class="material-icons-round">delete</span>
                      </button>
                    </div>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-footer button_block">
          <button class="cancel" data-bs-dismiss="modal" type="button">取消</button>
          <button v-if="status === 'post'" @click="addNewProduct" type="button">確認</button>
          <button v-else @click="editProduct" type="button">確認</button>
        </div>
      </div>
    </div>
  </div>
  <!-- <button class="clear_all_products">清除全部</button> -->
</template>

<script>
import { Modal } from 'bootstrap';

//  TODO  打開 Modal 的時候要有習慣先清空
export default {
  name: 'ProductCardComponent',
  props: {
    status: String,
  },
  data() {
    return {
      tempProduct: {
        title: '',
        category: '',
        origin_price: 0,
        imagesUrl: [],
      },
      targetID: '',
    };
  },
  methods: {
    // 新增圖片
    addNewPic() {
      if (this.tempProduct.imagesUrl !== undefined) {
        if (this.tempProduct.imagesUrl.length < 5) {
          this.tempProduct.imagesUrl.push('');
        }
      } else {
        this.tempProduct.imagesUrl = [];
        this.tempProduct.imagesUrl.push('');
      }
      return false;
    },
    removeCurrentPic(key) {
      this.tempProduct.imagesUrl.splice(key, 1);
    },
    // 最後新增一個產品
    addNewProduct() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/product`;
      this.axios
        .post(requestUrl, { data: this.tempProduct })
        .then((response) => {
          if (response.data.success) {
            // 要把資料傳遞出去
            this.$emit('emit-data', this.tempProduct);
            this.modal.hide();
          } else {
            console.log('出了點錯誤，請稍後再嘗試，謝謝。');
          }
        })
        .catch((error) => {
          console.log(error, 'deleteProductAPIError');
        });
    },
    editProduct() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/product/${this.tempProduct.id}`;
      this.axios
        .put(requestUrl, { data: this.tempProduct })
        .then((response) => {
          if (response.data.success) {
            this.$emit('emit-data', this.tempProduct);
            this.modal.hide();
          } else {
            console.log('出了點錯誤，請稍後再嘗試，謝謝。');
          }
        })
        .catch((error) => {
          console.log(error, 'deleteProductAPIError');
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
    // 從 cookie 取得 token
    // const token =
    // document.cookie.replace(/(?:(?:^|.*;\s*)HexSchoolAPIToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // this.axios.defaults.headers.common.Authorization = token;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@use '../theme.sass' as *
.wrapper
  .product_card_wrapper
    background: #fafafa
    max-height: 500px
    margin: 45px auto
    position: relative
    border-radius: 16px
    border: none
    box-shadow: 2px 4px 10px rgba(#4c443a ,0.05)
    &::before
      content: ''
      display: block
      width: 6px
      height: 32px
      background: #4c443a
      position: absolute
      left: 0px
      top: 32px
      z-index: 100
    .header
      display: flex
      flex-direction: column
      align-items: flex-start
      padding: 32px
      box-sizing: border-box
      background: #fafafa
      border-bottom: 1px solid  #ddd
      .left
        display: flex
        width: 100%
        align-items: center
        margin: 0 0 8px
        justify-content: space-between
        p
          color: #4c443a
          font-size: 24px
          line-height: 32px
          font-weight: 800
          text-align: justify
          margin: 0px
        span
          cursor: pointer
      span
        font-size: 14px
        font-weight: 600
        color: #5d5d5d
    .outer
      .container
        display: flex
        flex-direction: column
        padding: 0px
        .content
          display: flex
          width: 100%
          ul
            padding: 16px
            display: flex
            flex-direction: column
            flex: 1
            margin: 0px
            li
              display: flex
              width: 100%
              margin: 0 0 8px
              align-items: flex-start
              justify-content: space-between
              p
                display: flex
              &.single
                flex-direction: column-reverse
                .edit_part
                  display: flex
                  width: 100%
                  flex-direction: column-reverse
                  align-items: flex-start
                  position: relative
                  .remove_pic_button
                    position: absolute
                    background: none
                    cursor: pointer
                    border: none
                    right: .1rem
                    line-height: 100%
                    top: 50%
                    &:hover
                      i
                        color: #a97f4a
              &.checkbox
                // 這段開始是 switch 按鈕
                justify-content: flex-start
                align-items: center
                span
                  padding: 0 0 0 8px
                .switch
                  position: relative
                  display: inline-block
                  width: 40px
                  height: 20px
                  vertical-align: middle
                  input
                    opacity: 0
                    width: 100%
                    height: 100%
                    z-index: 999
                    position: absolute
                    left: 0px
                    margin: 0px
                    &:checked + .slider
                      background-color: #4c443a
                      &:before
                        transform: translateX(20px)
                    &:focus + .slider
                      box-shadow: 0 0 1px #2196F3
                  .slider
                    position: absolute
                    cursor: pointer
                    top: 0
                    left: 0
                    right: 0
                    bottom: 0
                    background-color: #ccc
                    transition: .4s
                    border-radius: 34px
                    &:before
                      position: absolute
                      content: ""
                      height: 14px
                      width: 14px
                      left: 3px
                      bottom: 3px
                      background-color: white
                      transition: .4s
                      border-radius: 50%
                      // 結束
              &:last-child
                margin: 0px
              .add_new_pic_button
                border: none
                background: #4c443a
                color: #fff
                border-radius: 24px
                padding: 8px 16px
                text-align: center
              label
                margin: 0 0 8px
                font-weight: 500
                font-size: 14px
                color: #8a8a8a
                transition: all .2s
                span
                  color: #bb925e
              input
                padding: 8px 16px
                border-radius: 8px
                border: 1px #ddd solid
                width: 100%
                transition: all .2s
                color: #4c443a
                &:focus
                  outline: none
                  border: 1px solid #cabaa7
                  background: #f5f1ed
                  ~ label
                    color: #ad9272
              textarea
                border-radius: 8px
                border: 1px #ddd solid
                width: 100%
                padding: 10px 15px
                resize: none
                font-family: 'Noto Sans TC'
                &:focus
                  outline: none
                  border: 1px solid #cabaa7
                  background: #ebe5df
                  ~ label
                    color: #ad9272
              .half
                display: flex
                align-items: flex-start
                flex-direction: column-reverse
                width: 48%
    .button_block
      display: flex
      width: 100%
      // position: absolute
      // bottom: 0px
      background: #fafafa
      // left: 0px
      border-top: 1px solid  #ddd
      padding: 10px 32px
      justify-content: flex-end
      button
        display: block
        padding: 8px 16px
        background: #4c443a
        color: #fff
        border-radius: 8px
        border: none
        font-size: 16px
        font-weight: bold
        margin: 0 0 0 10px
        &.cancel
          background: none
          color: #4c443a
          border: 1px solid #4c443a
        &:hover
          background: #a97f4a
.clear_all_products
  width: 20%
  display: block
  padding: 15px
  margin: 0px auto 45px
  background: #000
  color: #fff
  border-radius: 5px
  border: none
  font-size: 16px
  font-weight: bold
  &:hover
    background: #352a2a
</style>
