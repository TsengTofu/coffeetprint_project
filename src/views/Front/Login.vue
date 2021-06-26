<!-- 登入的畫面 -->
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
  components: {
    LoginFormComponent,
  },
};
</script>
<style lang="sass" scoped></style>
