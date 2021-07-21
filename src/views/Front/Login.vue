<!-- 處理 cookie 會碰到的參考：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie -->
<template>
  <div>
    <LoginFormComponent />
  </div>
</template>

<script>
import LoginFormComponent from '../../components/Front/Login/LoginForm.vue';

export default {
  name: 'Login',
  props: {},
  components: {
    LoginFormComponent,
  },
  data() {
    return {};
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)HexSchoolAPIToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (token) {
      this.$router.push('/admin');
    }
  },
};
</script>
<style lang="sass" scoped></style>
