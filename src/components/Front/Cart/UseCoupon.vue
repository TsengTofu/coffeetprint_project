<template>
  <div>
    <Form>
      <div class="input-group mb-3">
        <Field
          id="coupon_code"
          name="coupon_code"
          type="text"
          class="form-control"
          placeholder="請輸入折扣碼"
          rules="required"
          v-model="coupon_code"
          aria-label="coupon_code"
          aria-describedby="button-addon2"
        />
        <button
          type="button"
          id="button-addon2"
          class="btn btn-secondary"
          :disabled="coupon_code === ''"
          @click="getDiscount"
        >
          套用
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'UseCouponComponent',
  props: {},
  data() {
    return {
      coupon_code: '',
    };
  },
  methods: {
    getDiscount() {
      const requestUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/coupon`;
      this.axios.post(requestUrl, { data: { code: this.coupon_code } })
        .then((response) => {
          const { success, message } = response.data;
          if (success) {
            this.$swal(message);
            // 通知外層更新資料
            this.emitter.emit('updateCartList');
          } else {
            this.$swal(message);
          }
        }).catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
  },
  mounted() {},
};
</script>

<style lang="sass" scoped></style>
