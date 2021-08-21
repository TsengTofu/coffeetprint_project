<template>
  <div class="container-fluid cafe_list_block">
    <div class="common_row_space_between container">
      <div>
        <TitleComponent
          title="＃發現咖啡廳"
        />
        <p class="common_row_align">
          <span class="material-icons-round">coffee</span>
          一起看看哪些咖啡廳有提供優惠券吧！
        </p>
      </div>
      <div class="change_layout">
        <button
          type="button"
          class="btn btn-primary me-3"
          @click="switch_status = 'list'"
        >
          <span class="material-icons-round">view_list</span>
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="switch_status = 'grid'"
        >
          <span class="material-icons-round">grid_view</span>
        </button>
      </div>
    </div>
   <div class="container">
      <CafeListComponent
        :switch_status="switch_status"
      />
   </div>
  </div>
</template>

<script>
import TitleComponent from '../../../Core/Layout/Title/Title.vue';
import CafeListComponent from '../../CafeProduct/CafeList.vue';

export default {
  name: 'CafeListWrapperComponent',
  components: {
    TitleComponent,
    CafeListComponent,
  },
  data() {
    return {
      productData: [],
      pagination: {},
      // 切換狀態
      switch_status: 'grid',
    };
  },
  methods: {
    // 拿咖啡廳的資料
    getCafeListData(/* queryPage */) {
      // ${queryPage}
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products?page=1`;
      this.axios
        .get(requestUrl)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            const { products, pagination } = response.data;
            this.productData = products;
            this.pagination = pagination;
          } else {
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
  },
  mounted() {
    this.getCafeListData();
  },
};
</script>

<style scoped lang="sass">
.cafe_list_block
  background: #F0EBE6
  position: relative
  width: 100%
  padding: 0px
  z-index: 50
  &::before
      content: ''
      background-position: top
      background-image: url('../../../../assets/images/wave_coffee.svg')
      background-size: cover
      display: block
      width: 100%
      height: 150px
      position: absolute
      top: -130px
      z-index: -1
</style>
