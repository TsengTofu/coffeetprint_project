<template>
  <div class="container d-flex flex-column align-items-center justify-content-center">
    <div class="row login_form_wrapper">
      <div class="col-md-6 img_wrapper">
        <div class="content"></div>
        <div class="welcome_text">
          <p>WELCOME!</p>
          <span>Please Login <span class="material-icons-round">double_arrow</span></span>
        </div>
      </div>
      <!-- Form 表單 -->
      <form class="col-md-6 login_form" @submit="loginSystem">
        <!-- @submit 同時可以兼顧 @keyup.enter + 按鈕點擊 -->
        <ul>
          <li>
            <input
              id="email_account"
              type="email" placeholder="請輸入帳號"
              v-model="userEmailAccount" />
            <label for="email_account">
              <span class="material-icons-round">account_circle</span>帳號
              <p class="error_msg"></p>
            </label>
          </li>
          <li>
            <input id="password_value" type="password" v-model="userPassword" placeholder="請輸入密碼" />
            <label for="password_value">
              <span class="material-icons-round">lock</span> 密碼
            </label>
          </li>
          <li class="remember_me">
              <label for="remember_me">記住我的帳號
                <input id="remember_me" type="checkbox" />
                <span></span>
              </label>
          </li>
        </ul>
        <button class="login_btn">登入</button>
        <p class="error_msg" v-html="errorMsg"></p>
      </form>
    </div>
    <p class="copyright">© 2021~∞ - 六角學院 - Tofu Tseng</p>
  </div>
</template>

<script>

export default {
  name: 'LoginFormComponent',
  components: {
  },
  data() {
    return {
      userEmailAccount: '',
      userPassword: '',
      errorMsg: '',
    };
  },
  methods: {
    loginSystem() {
      const isPass = this.checkIsEmpty();
      if (isPass) {
        const postData = { username: this.userEmailAccount, password: this.userPassword };
        this.sendLoginRequest(postData);
      }
    },
    // 確認是否為空值
    checkIsEmpty() {
      //  TODO  後續要針對不同的空值狀態給錯誤訊息
      return true;
    },
    // SendLoginRequest
    sendLoginRequest(data) {
      const requestUrl = `${process.env.VUE_APP_API}/admin/signin`;
      this.axios
        .post(requestUrl, data)
        .then((response) => {
          const {
            token, expired, success, message, error,
          } = response.data;
          //  message, error
          // 拿到 Token & Expired 之後
          if (success) {
            // 存到 Cookie
            document.cookie = `HexSchoolAPIToken=${token};expires=${new Date(expired)}; path=/`;
            this.$router.push('/admin'); //  TODO  找看看有沒有其他方式
          } else {
            this.errorMsg = `<span>${message}！請檢查帳號或密碼，重新登入。<br>${error.message}</span>`;
          }
        })
        .catch(() => {
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.container
  max-width: 800px
  height: 100vh
  .copyright
    margin: 1rem
    color: #4c443a
    font-size: 14px
    font-weight: 400
  .login_form_wrapper
    display: flex
    width: 100%
    min-height: 400px
    background: #fafafa
    border-radius: 16px
    font-size: 18px
    font-weight: 400
    box-shadow: 2px 4px 10px rgba(#4c443a ,0.05)
    overflow: hidden
    .img_wrapper
      // width: 60%
      height: 400px
      display: block
      overflow: hidden
      position: relative
      padding: 0px
      .welcome_text
        display: flex
        flex-direction: column
        align-items: flex-start
        position: absolute
        z-index: 100
        font-size: 2.5rem
        padding: 16px 45px
        font-weight: 900
        top: 24px // 暫時
        color: #fff
        margin: 0px
        opacity: 0
        transform: translateX(-100px)
        transition: all .5s
        p
          margin: 0px 0px 8px
        span
          font-size: 1.2rem
          i
            color: #fff
      .content
        display: block
        width: 100%
        height: 100%
        background: url('../../../assets/images/login_bg.jpg')
        background-size: cover
        transition: all .5s
        &::after
          content: ''
          display: block
          background: #4c443a
          opacity: 0
          width: 100%
          height: 100%
          transition: all .5s
        &:hover
          transform: scale(1.05)
          ~.welcome_text
            transform: translateX(0px)
            opacity: 1
          &::after
            opacity: .5
    .login_form
      // width: 40%
      padding: 2rem 2rem 0
      box-sizing: border-box
      ul
        display: flex
        flex-direction: column
        width: 100%
        padding: 0px
        margin: 0px
        li
          width: 100%
          display: flex
          flex-direction: column-reverse
          margin: 0 0 16px 0
          // 記得我 Checkbox
          &.remember_me
            display: flex
            flex-direction: row
            align-items: center
            label
              margin: 0px
              display: block
              position: relative
              padding-left: 32px
              cursor: pointer
              user-select: none
              line-height: 22px
              color: #4c443a
              input
                margin: 0 8px 0 0
                position: absolute
                opacity: 0
                cursor: pointer
                height: 100%
                width: 100%
                left: 0px
                top: 0px
                &:checked
                  ~ span
                    background-color: #a97f4a
                    &::after
                      display: block
              span
                position: absolute
                top: 0
                left: 0
                height: 22px
                width: 22px
                background-color: #eee
                border-radius: 4px
                &::after
                  content: ""
                  position: absolute
                  display: none
                  left: 8px
                  top: 4px
                  width: 7px
                  height: 11px
                  border: solid white
                  border-width: 0 3px 3px 0
                  -webkit-transform: rotate(45deg)
                  -ms-transform: rotate(45deg)
                  transform: rotate(45deg)
                  // 記得我 Checkbox
          label
            margin: 0 0 8px 0
            display: flex
            align-items: center
            font-weight: 500
            font-size: 16px
            transition: all .5s
            i
              margin: 0 2px 0 0
              font-size: 20px !important
          input
            border: 1px solid #ddd
            border-radius: 8px
            padding: 8px 16px
            font-size: 18px
            transition: all .5s
            color: #4c443a
            &:focus
              outline: none
              border: 1px solid #cabaa7
              background: #f5f1ed
              ~ label
                color: #ad9272
                i
                  color: #ad9272
      .login_btn
        background: #4c443a
        border: none
        border-radius: 8px
        color: #fff
        width: 100%
        font-size: 20px
        font-weight: bold
        padding: 15px 0
        cursor: pointer
        &:hover
          background: #a97f4a
      .error_msg
        color: #c38536
        font-size: 12px
        font-weight: bold
        text-align: left
        line-height: 16px
        margin: 1rem 0px
</style>
