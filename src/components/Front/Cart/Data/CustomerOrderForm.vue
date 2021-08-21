<template>
  <div class="user_order_info_wrapper container">
    <h4>填寫預定資料</h4>
    <Form
      v-slot="{ errors }"
      @submit="onSubmit"
    >
      <div class="row">
        <div class="mb-3 common_column_align justify">
          <label for="name" class="form-label">姓名<span>*</span></label>
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="form.user.name"
          />
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3 common_column_align justify">
          <label for="email" class="form-label">信箱<span>*</span></label>
          <Field
            id="email"
            name="信箱"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['信箱'] }"
            placeholder="請輸入信箱"
            rules="email|required"
            v-model="form.user.email"
          />
          <error-message name="信箱" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3 common_column_align justify">
          <label for="tel" class="form-label">手機號碼<span>*</span></label>
          <Field
            id="tel"
            name="手機號碼"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['手機號碼'] }"
            placeholder="請輸入手機號碼"
            :rules="{ regex: /^(09)[0-9]{8}$/ }"
            v-model="form.user.tel"
          />
          <error-message name="手機號碼" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3 common_column_align justify">
          <label for="address" class="form-label">地址<span>*</span></label>
          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
          />
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3 common_column_align">
          <label for="message">留言</label>
          <textarea
            id="product_description"
            type="text"
            class="form-control"
            rows="3"
            placeholder="請輸入說明內容"
            v-model="form.message"
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        class="btn me-2 btn-outline-primary"
        :disabled="Object.keys(errors).length !== 0 || isEmpty"
      >
        送出預定資料
      </button>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'CustomerOrderFormComponent',
  // emits: [''],
  props: {},
  components: {
    // CheckoutStepComponent,
  },
  data() {
    return {
      // check
      isEmpty: true,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    // 檢查是否為空的
    checkIsEmpty() {
      const dataIsEmpty = Object.keys(this.form.user).filter((item) => this.form.user[item] === '');
      if (dataIsEmpty.length === 0) {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
    },
    onSubmit() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/order`;
      const data = this.form;
      this.axios
        .post(requestUrl, { data })
        .then((response) => {
          const { success } = response.data;
          if (success) {
            // 成功之後，就要告訴購物車的 Modal 要清空
            this.emitter.emit('clearCartList');
            const { orderId } = response.data;
            this.$router.push(`/order/${orderId}`);
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
  },
  watch: {
    form: {
      handler() {
        this.checkIsEmpty();
      },
      deep: true,
    },
  },
  mounted() {
    this.checkIsEmpty();
  },
};
</script>
<style lang="sass" scoped>
.user_order_info_wrapper
  padding: 3rem
  border: 1px solid #d2d2d2
  border-radius: 1rem
  background: #fafafa
  .container
    ul
      display: flex
      flex-direction: column
      li
        display: flex
        flex-direction: column
        margin: 0 0 20px 0
        label
          font-size: 16px
          line-height: 22px
          color: #212529
          margin: 0 0 6px 0
        input
          border: 1px solid #CED4DA
          border-radius: 4px
          padding: 8px 12px
          font-size: 16px
          line-height: 22px
        select
          border: 1px solid #CED4DA
          border-radius: 4px
          padding: 8px 12px
          font-size: 16px
          line-height: 22px
          color: #212529
        .alert_msg
          color: #C72424
          padding: 8px 0px 0px
    .send_user_order_info
      background: #000
      color: #fff
      width: 255px
      border-radius: 4px
      border: none
      padding: 10px 65px
      font-size: 20px
      line-height: 25px
      display: block
      margin: 0 auto
      cursor: pointer
      &:hover
        background: #301E5F
</style>
