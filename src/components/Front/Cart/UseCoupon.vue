<template>
  <div>
    <Form v-slot="{ errors }">
      <div class="input-group mb-3">
        <Field
          id="coupon_code"
          name="coupon_code"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['coupon_code'] }"
          placeholder="請輸入折扣碼"
          rules="required"
          v-model="coupon_code"
          aria-label="coupon_code"
          aria-describedby="button-addon2"
        />
        <button
          class="btn btn-secondary"
          type="button"
          id="button-addon2"
          :disabled="subscribe_email === ''"
          @click="getDiscount"
        >
          套用
        </button>
      </div>
      <div class="error_msg">
        <error-message name="email" class="invalid-feedback"> </error-message>
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
      console.log('有套用優惠券喔', this.coupon_code);
      // const requestUrl = ``;
      // this.axios.post()
      // 寫一下
      // 相關的 API
      //       percent 會轉數字格式
      // [API]: /api/:api_path/coupon
      // [方法]: post
      // [說明]: Coupon 套用時，全部統一套用
      // [參數]: @api_path: 'thisismycourse2'
      // {
      //     "data": {
      //       "code": "testCode"
      //     }
      //   }
    },
  },
  mounted() {},
};
</script>

<style lang="sass" scoped></style>
