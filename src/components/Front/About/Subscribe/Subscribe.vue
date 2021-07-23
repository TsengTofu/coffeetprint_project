<template>
  <div class="wrapper">
    <div class="subscribe_wrapper d-flex align-items-center">
      <div class="container-sm row">
        <div class="content col-xl-4 col-md-4 col-sm-8 ms-auto">
          <p class="title">訂閱最新消息</p>
          <Form v-slot="{ errors }">
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
                :disabled="subscribe_email === ''"
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
//  FIXME  只是暫時這樣寫
const localStorageMethods = {
  save(favorite) {
    const favoriteString = JSON.stringify(favorite);
    localStorage.setItem('CoffeetPrintSubscribe', favoriteString);
  },
  get() {
    return JSON.parse(localStorage.getItem('CoffeetPrintSubscribe'));
  },
};

export default {
  name: 'SubscribeComponent',
  props: {},
  components: {},
  data() {
    return {
      subscribe_email: '',
      // 從 localStorage 撈出來的資料
      subscribe_email_list: localStorageMethods.get() || [],
    };
  },
  methods: {
    getSubscribe() {
      if (this.subscribe_email_list.includes(this.subscribe_email)) {
        this.$swal('已經加入訂閱，請輸入別的 E-mail');
      } else {
        this.subscribe_email_list.push(this.subscribe_email);
        this.$swal('已成功加入訂閱！');
        localStorageMethods.save(this.subscribe_email);
      }
    },
  },
  mounted() {},
};
</script>

<style lang="sass" scoped>
.wrapper
  position: relative
  .subscribe_wrapper
    // width: 100%
    height: 400px
    background-image: url('../../../../../public/subscribe_bg.jpg')
    background-position: center
    background-size: cover
    background-repeat: no-repeat
    background-attachment: fixed
    top: 0px
    left: 0px
    right: 0px
    bottom: 0px
    position: relative
    .content
      color: #fff
      text-align: justify
      // width: 100%
      // max-width: 400px
      // display: flex
      // flex-direction: column
      // align-items: flex-start
      // position: absolute
      // right: 18rem
      // top: 6rem
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
