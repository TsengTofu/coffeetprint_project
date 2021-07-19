<template>
  <!-- 訂閱送出 email -->
  <!--  NOTE  這個在關於我們那部分也用得到 -->
  <div class="subscribe_wrapper">
    <div class="content">
      <p class="title">訂閱最新消息</p>
      <Form v-slot="{ errors }">
      <div class="input-group mb-3">
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
        <error-message
          name="email"
          class="invalid-feedback">
        </error-message>
      </div>
      </Form>
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
  mounted() {
  },
  // watch: {
  //   subscribe_email() {},
  // },
};
</script>

<style lang="sass" scoped>
.subscribe_wrapper
  width: 100%
  height: 400px
  display: block
  background-image: url('../../../../../public/subscribe_bg.png')
  background-position: 0% 26%
  background-size: cover
  background-repeat: no-repeat
  background-attachment: fixed
  position: relative
  .content
    color: #fff
    width: 100%
    max-width: 400px
    display: flex
    flex-direction: column
    align-items: flex-start
    position: absolute
    right: 18rem
    top: 6rem
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
