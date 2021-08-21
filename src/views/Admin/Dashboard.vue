<!-- 後台主要畫面，這邊會放後台固定會出現的東西 -->
<template>
  <AdminNavComponent
    @sign-out="signOut"
  />
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
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)HexSchoolAPIToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        const requestUrl = `${process.env.VUE_APP_API}/api/user/check`;
        this.axios.defaults.headers.common.Authorization = token;
        this.axios
          .post(requestUrl).then((response) => {
            const { success } = response.data;
            if (success) {
              this.$swal('驗證成功');
              this.isCheckPass = true;
            } else {
              this.isCheckPass = false;
              this.$router.push('/login');
            }
          }).catch(() => {
            // error
            this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
          });
      } else {
        this.$router.push('/login');
      }
    },
    signOut() {
      const requestUrl = `${process.env.VUE_APP_API}/logout`;
      this.axios
        .post(requestUrl)
        .then((response) => {
          const { success } = response.data;
          if (success) {
            document.cookie = 'HexSchoolAPIToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            this.$router.push('/login');
          }
        })
        .catch((error) => {
          console.log(error);
          // error 之後要回來看錯誤訊息
          this.$swal({ title: '出了點錯誤，請稍後再嘗試，謝謝。', icon: 'error' });
        });
    },
  },
  mounted() {
    this.verifyToken();
  },
};
</script>
<style lang="sass" scoped></style>
