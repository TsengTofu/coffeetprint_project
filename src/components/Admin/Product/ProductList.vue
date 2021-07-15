<template>
  <!--  TODO  這邊的 table 要改成用 bootstrap5 -->
  <div class="container product_list_wrapper">
    <div class="header">
      <div class="left">
        <p>產品清單</p>
        <span><span class="material-icons-round">view_list</span></span>
      </div>
      <div class="right">
          <!-- 新增產品 -->
        <button class="add_new_product_button"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
          @click="setStatus('post', {})"
        >
          <span class="material-icons-round">add</span> 新增產品
        </button>
      </div>
    </div>
    <!-- 搜尋與篩選 -->
    <div class="tool_wrapper">
      <p class="summary_text">此頁有 <span>{{ productData.length }}</span> 項產品</p>
      <div class="filter_dropdown">
        <label for="category_filter">分類篩選：</label>
        <!--  TODO  分類篩選的資料 -->
        <select name="" id="category_filter">
          <template v-for="(item, key) in category_list" :key="'item' + key">
            <option :value="item">{{ item }}</option>
          </template>
        </select>
      </div>
      <!-- 搜尋 -->
      <div class="search_part">
        <input type="text" placeholder="請輸入關鍵字">
        <button type="button"><span class="material-icons-round">search</span></button>
      </div>
    </div>
    <div class="table_wrapper">
      <table>
        <thead>
          <tr>
            <td width="150">分類</td>
            <td width="100">地區</td>
            <td width="400">產品名稱</td>
            <td width="150">原價</td>
            <td width="150">售價</td>
            <td width="80">啟用</td>
            <td width="50">編輯</td>
            <td width="50">刪除</td>
          </tr>
        </thead>
        <tbody v-if="productData !== undefined &&
          productData.length > 0">
          <tr v-for="(item, key) in productData" :key="key">
            <td>{{ item.category }}</td>
            <td>{{ item.area }}</td>
            <td>{{ item.title }}</td>
            <td><span>NT$</span> {{ item.origin_price.toLocaleString() }}</td>
            <td><span>NT$</span> {{ item.price.toLocaleString() }}</td>
            <td>
              <div class="switch">
                <input
                  type="checkbox"
                  :checked="item.is_enabled"
                  disabled
                />
                <span class="slider"></span>
              </div>
            </td>
            <td>
              <button class="icon_btn"
                type="button"
                @click="setStatus('put', item)"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                <span class="material-icons-round">edit</span>
              </button>
            </td>
            <td>
              <button class="icon_btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#confirmModal"
                @click="targetItem = item"
              >
                <span class="material-icons-round">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ProductCardComponent
      ref="modal"
      id="myModal"
      :token="token"
      :status="status"
      @emit-data="getData"
    />
    <ConfirmModalComponent
      ref="confirm_modal"
      id="confirmModal"
      @emit-delete="deleteCurrentProduct(targetId)"
    >
      <!-- 參考文章： https://medium.com/itsems-frontend/vue-slot-21e1ec9968f8 -->
      <!-- https://medium.com/unalai/%E8%A4%87%E7%94%A8%E5%85%83%E4%BB%B6%E7%9A%84%E5%A5%BD%E5%B9%AB%E6%89%8B-vue-slot-v-slot-scoped-slots-5364a0048ab7 -->
      <!-- 或是考慮用 is 處理 -->
      <template v-slot:delete_item>產品：{{ targetItem.title }}</template>
      <template v-slot:delete_content>
        <!-- TODO  這邊的版面要重新寫過 -->
        <div class="img_part"></div>
          <div class="info_detail">
            標題名稱：<p>{{ targetItem.title }}</p>
            分類：<p>{{ targetItem.category }}</p>
            說明內容：<p>{{ targetItem.content }}</p>
            產品描述：<p>{{ targetItem.description }}</p>
            單位：<p>{{ targetItem.unit }}</p>
            原價：<p>{{ targetItem.origin_price }}</p>
            售價：<p>{{ targetItem.price }}</p>
            數量：<p>{{ targetItem.num }}</p>
            是否啟用：<p>{{ targetItem.is_enable }}</p>
          </div>
      </template>
    </ConfirmModalComponent>
    <!-- Pagination -->
    <PaginationComponent
      :pagination_object="pagination"
      @emit-change-page="getData"
    />
  </div>
</template>
<script>
import ProductCardComponent from './ProductCard.vue';
import ConfirmModalComponent from '../../Core/Modal/ConfirmModal.vue';
import PaginationComponent from '../../Core/Modal/Pagination.vue';

export default {
  name: 'ProductListComponent',
  props: {
    token: String,
  },
  components: {
    ProductCardComponent,
    ConfirmModalComponent,
    PaginationComponent,
  },
  data() {
    return {
      productData: [],
      productString: '',
      action: '',
      targetId: '',
      targetItem: {},
      status: '',
      pagination: {},
      //  TODO  這邊還沒有做完
      // 分類的資料，這邊只做了一遍
      category_list: [],
      // 篩選之後要呈現的資料
      filterCafeData: [],
    };
  },
  methods: {
    // 改變傳入 Modal 的 Status
    setStatus(axiosMethod, data) {
      this.status = axiosMethod;
      // 為什麼可以這樣寫？
      this.$refs.modal.tempProduct = JSON.parse(JSON.stringify(data));
    },
    // 取得所有產品的資料
    getAllCafeData() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products/all`;
      this.axios.get(requestUrl).then((response) => {
        const { success, products } = response.data;
        // 如果成功
        if (success) {
          // 處理分類要顯示的項目
          products.forEach((cafe) => {
            if (this.category_list.indexOf(cafe.category) === -1) {
              this.category_list.push(cafe.category);
            }
          });
          console.log(this.category_list);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getData(queryPage = 1 /* 預設值 */) {
      //  TODO  待查：這邊寫小駝峰會報錯，為何？
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/products?page=${queryPage}`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          if (response.data.success) {
            const { products, pagination } = response.data;
            this.productData = products;
            this.pagination = pagination;
          } else {
            console.log('出了點錯誤，請稍後再嘗試，謝謝。');
          }
        })
        .catch((error) => {
          console.log(error, 'getDataError');
        });
    },
    // 刪除功能
    deleteCurrentProduct() {
      let newIndex = 0;
      this.targetId = this.targetItem.id;
      this.productData.forEach((item, key) => {
        if (this.targetId === item.id) {
          newIndex = key;
        }
      });
      this.deleteProductAPI();
      this.productData.splice(newIndex, 1);
    },
    deleteProductAPI() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/product/${this.targetId}`;
      this.axios
        .delete(requestUrl)
        .then((response) => {
          if (response.data.success) {
            console.log('有正常刪除啦');
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
    this.getAllCafeData();
    this.getData();
  },
};
</script>

<style scoped lang="sass">
@use '../theme.sass' as *
.product_list_wrapper
  background: #fafafa
  padding: 0px 32px 32px
  width: 100%
  max-width: 1200px
  border-radius: 16px
  box-shadow: 2px 4px 10px rgba(#4c443a ,0.05)
  position: relative
  &::before
    content: ''
    display: block
    width: 6px
    height: 32px
    background: #4c443a
    position: absolute
    left: 0px
    top: 37px
    z-index: 100
  .header
    display: flex
    align-items: center
    justify-content: space-between
    padding: 32px 0 16px
    .left
      display: flex
      align-items: center
      span
        margin: 0 0 0 4px
        i
          color: #4c443a
      p
        color: #4c443a
        font-size: 24px
        line-height: 32px
        font-weight: 800
        text-align: justify
        display: flex
        align-items: center
        margin: 0px
    .right
      display: flex
      button
        border-radius: 24px
        font-weight: bold
        font-size: 16px
        padding: 8px 16px
        cursor: pointer
        display: flex
        align-items: center
        margin: 0 0 0 8px
      .add_new_product_button
        border: none
        background: #4c443a
        color: #fff
        i
          color: #fff
        &:hover
          background: #a97f4a
  .tool_wrapper
    display: flex
    align-items: center
    padding: 0px 0px 8px
    .summary_text
      margin: 0px 32px 0px 0px
    .filter_dropdown
      margin: 0px 32px 0px 0px
      label
        font-weight: bold
      select
        border: 1px solid #ddd
        border-radius: 20px
        padding: 8px 16px
        &:focus
          outline: none
    .search_part
      background: #fff
      border-radius: 20px
      border: 1px solid #ddd
      display: flex
      align-items: center
      padding: 0 6px 0 0
      input
        border-radius: 20px
        border: none
        padding: 8px 16px
        &:focus
          outline: none
      button
        padding: 4px
        background: #ddd
        border-radius: 50%
        width: 30px
        height: 30px
        display: flex
        align-items: center
        border: none
  .table_wrapper
    width: 100%
    margin: 0 auto
    table
      width: 100%
      font-size: 16px
      margin: 0px 0px 20px
      text-align: justify
      thead
        font-weight: bold
        tr
          border-bottom: 1px solid #ddd
          td
            padding: 8px
      tbody
        tr
          &:nth-child(odd)
            background: #eee
          td
            padding: 8px
            vertical-align: middle
            .switch
              position: relative
              display: inline-block
              width: 50px
              height: 30px
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
                  height: 20px
                  width: 20px
                  left: 5px
                  bottom: 5px
                  background-color: white
                  transition: .4s
                  border-radius: 50%
            .icon_btn
              background: none
              border: none
              &:hover
                i
                  color: #a97f4a
</style>
