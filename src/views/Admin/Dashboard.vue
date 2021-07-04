<!-- 後台主要畫面，這邊會放後台固定會出現的東西 -->
<template>
  <AdminNavComponent @sign-out="signOut" />
  <router-view v-if="isCheckPass"></router-view>
  <FooterComponent/>
</template>

<script>
// 引入後台共用的 Navbar
import AdminNavComponent from '../../components/Admin/AdminNav.vue';
import FooterComponent from '../../components/Core/Layout/Footer.vue';

export default {
  name: 'Dashboard',
  components: {
    AdminNavComponent,
    FooterComponent,
  },
  data() {
    return {
      isCheckPass: false,
    };
  },
  methods: {
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
          document.cookie = 'HexSchoolAPIToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
