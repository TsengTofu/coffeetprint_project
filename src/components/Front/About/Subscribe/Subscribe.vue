<template>
  <div class="wrapper">
    <div class="d-flex align-items-center bg_cover subscribe_wrapper">
      <div class="container-sm row">
        <div class="content col-xl-4 col-md-4 col-sm-8 ms-auto">
          <p class="title">訂閱最新消息</p>
          <Form v-slot="{ errors }" ref="subscribe_form">
            <div class="input-group mb-5">
              <Field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="coffeet.print@gmail.com"
                rules="email|required"
                v-model="subscribe_email"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                class="btn btn-secondary"
                type="button"
                id="button-addon2"
                :disabled="subscribe_email === '' || errors.email"
                @click="getSubscribe"
              >
                <!-- 上面這個 id 要對應 aria-describedby -->
                訂閱
              </button>
            </div>
            <div class="error_msg">
              <error-message name="email" class="invalid-feedback"> </error-message>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocalStorageSupport from '../../../../Support/LocalStorageSupport';

export default {
  name: 'SubscribeComponent',
  props: {},
  components: {},
  data() {
    return {
      subscribe_email: '',
      subscribe_email_list: LocalStorageSupport('CoffeetPrintSubscribe').getItem() || [],
    };
  },
  methods: {
    getSubscribe() {
      if (this.subscribe_email_list.includes(this.subscribe_email)) {
        this.$swal('已經加入訂閱，請輸入別的 E-mail');
        this.$refs.subscribe_form.resetForm();
      } else {
        this.subscribe_email_list.push(this.subscribe_email);
        LocalStorageSupport('CoffeetPrintSubscribe').saveItem(this.subscribe_email);
        this.$swal('已成功加入訂閱！');
        this.$refs.subscribe_form.resetForm();
      }
      this.subscribe_email = '';
    },
  },
  mounted() {
  },
  watch: {
    subscribe_email_list: {
      handler() {
        LocalStorageSupport('CoffeetPrintSubscribe').saveItem(this.subscribe_email_list);
      },
      deep: true,
    },
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  position: relative
  .subscribe_wrapper
    height: 400px
    background-image: url('../../../../../public/subscribe_bg.jpg')
    background-position: center 25%
    .content
      color: #fff
      text-align: justify
      .title
        font-size: 1.5rem
        font-weight: bold
        letter-spacing: .1rem

  // 這邊只是給測試用的
  //  FIXME  這邊要調整位置
  .error_msg
    span
      display: block
</style>
