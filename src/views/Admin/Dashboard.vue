<!-- 後台主要畫面，這邊會放後台固定會出現的東西 -->
<!-- 在驗證有沒有登入、登出，token 這塊都是在這裡做 -->
<template>
  <div>我是後台的主要畫面</div>
  <button @click="signOut" class="sign_out_button">
    <span class="material-icons-round">logout</span>登出
  </button>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
    verifyToken() {
      const cookieValue = document.cookie;
      console.log('有執行到 verifyToken', cookieValue);
      if (cookieValue === '') {
        this.$router.push('/');
      }
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
