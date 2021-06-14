<!-- 登入的畫面 -->
<!-- 處理 cookie 會碰到的參考：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie -->
<template>
  <div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../../components/Front/LoginForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
};
</script>
<style lang="sass" scoped></style>
