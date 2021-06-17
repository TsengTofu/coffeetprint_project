<!-- 後台主要畫面，這邊會放後台固定會出現的東西 -->
<!-- 在驗證有沒有登入、登出，token 這塊都是在這裡做 -->
<template>
  <div>我是後台的主要畫面</div>
  <button @click="signOut" class="sign_out_button">
    <span class="material-icons-round">logout</span>登出
  </button>
  <router-view v-if="isCheckPass"></router-view>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {
  },
  data() {
    return {
      isCheckPass: false,
    };
  },
  methods: {
    //  TODO  驗證登入
    verifyToken() {
      // console.log('verifyToken');
      const requestUrl = `${process.env.VUE_APP_API}/api/user/check`;
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)HexSchoolAPIToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.axios.defaults.headers.common.Authorization = token;
      this.axios
        .post(requestUrl).then((res) => {
          console.log(res);
          if (res.data.success) {
            console.log('驗證成功');
            this.isCheckPass = true;
          } else {
            this.$router.push('/');
          }
        }).catch((error) => {
          console.log(error);
        });
    },
    signOut() {
      const requestUrl = `${process.env.VUE_APP_API}/logout`;
      this.axios
        .post(requestUrl)
        .then((response) => {
          console.log(response, '已登出');
          this.$router.push('/login');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.verifyToken();
  },
};
</script>
<style lang="sass" scoped></style>
