<template>
  <div class="product_list_wrapper">
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
        <select name="" id="category_filter">
          <option value="">放假的</option>
          <option value="">放假的</option>
          <option value="">放假的</option>
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
      :target_item="targetItem"
      @emit-delete="deleteCurrentProduct(targetId)"
    />
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
  name: 'ProductListComponent', // 都要加上後綴
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
    };
  },
  methods: {
    // 改變傳入 Modal 的 Status
    setStatus(axiosMethod, data) {
      this.status = axiosMethod;
      // 為什麼可以這樣寫？
      this.$refs.modal.tempProduct = JSON.parse(JSON.stringify(data));
    },
    getData(queryPage = 1 /* 預設值 */) {
      //  TODO  待查：這邊寫小駝峰會報錯，為何？
      console.log('getData');
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/products?page=${queryPage}`;
      this.axios
        .get(requestUrl, {
          // headers: {
          //   Authorization: this.token, // 這邊要補上 cookie 取出來的 token
          // },
        })
        // .then((response)=>  // 這樣居然可以正常
        .then((response) => {
          // 觀察一下為什麼這呼喚不到另一個函式
          // response.data.products -> array
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
        .delete(requestUrl, {
          // headers: {
          //   Authorization: `${this.token}`, // 這邊要補上 cookie 取出來的 token
          // },
        })
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
    // console.log(this.token);
    // if (this.token) {
    console.log('測試一下有沒有 token');
    this.getData();
    // }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
