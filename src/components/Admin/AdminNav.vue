<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link
          to="/admin"
          class="nav-link">
          後台管理
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <!-- aria-current="page" 這個參數不知道是做什麼用的 -->
              <router-link to="/admin/orders" class="nav-link">訂單</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/products" class="nav-link">產品</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/coupons" class="nav-link">優惠券</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/posts" class="nav-link">文章列表</router-link>
            </li>
            <li class="nav-item">
              <button
                class="btn nav-link"
                @click="signOut"
                type="button"
              >
                <span class="material-icons-round">logout</span>登出
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'AdminNavComponent',
  props: {},
  emits: [
    'signOut',
  ],
  components: {},
  data() {
    return {};
  },
  methods: {
    signOut() {
      this.$emit('signOut');
    },
  },
  mounted() {},
};
</script>
