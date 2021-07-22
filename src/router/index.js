import { createRouter, createWebHashHistory } from 'vue-router';

// router-view 是畫面顯示的地方：視圖
// router-link 類似於 <a></a> 的效果，可以連結到設定的 path
// path 通常小寫

const routes = [
  // 前台畫面
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/Front/Layout/Layout.vue'),
    children: [
      // 首頁
      {
        path: '',
        name: 'Entry',
        component: () => import('../views/Front/Entry.vue'),
      },
      // 產品列表頁
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/Front/Products.vue'),
        //  TODO  還是蠻好奇為什麼不能這樣寫 products/detail/id
        // 如果想要上面的格式
        // children: [
        //   {
        //     path: 'detail/:id',
        //     name: 'ProductDetail',
        //     component: () => import('../views/Front/ProductDetail.vue'),
        //   },
        // ],
      },
      // 產品詳細頁
      //  TODO  這邊是不是要改掉？
      {
        path: 'detail/:id',
        name: 'ProductDetail',
        component: () => import('../views/Front/ProductDetail.vue'),
      },
      // 購物車頁
      {
        path: 'cart',
        name: '',
        component: () => import('../views/Front/Cart/Cart.vue'),
      },
      // 填寫購物的人的資料
      {
        //  FIXME  其實這邊我是希望 cart/form
        path: 'cart/form',
        name: '',
        component: () => import('../views/Front/Cart/OrderForm.vue'),
      },
      // 回傳的訂單資料，連結點了之後會往下付款
      {
        path: 'order/:id',
        name: 'Order',
        component: () => import('../views/Front/Cart/OrderPayment.vue'),
      },
      // 關於我們
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/Front/About.vue'),
      },
      // 收藏列表頁
      //  TODO  這邊要處理的是 localStorage
      {
        path: '/favorite',
        name: 'Favorite',
        component: () => import('../views/Front/Favorite.vue'),
      },
      // 文章列表頁
      {
        path: '/posts',
        name: 'Posts',
        component: () => import('../views/Front/Post/Posts.vue'),
      },
      // 文章單頁面
      {
        path: '/post/detail/:id',
        name: 'PostDetail',
        component: () => import('../views/Front/Post/PostDetail.vue'),
      },
    ],
  },
  // 登入頁，不顯示在前台也沒關係
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Front/Login.vue'),
  },
  // 後台畫面
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/Admin/Dashboard.vue'),
    // 加入 Children 路由
    children: [
      // 子層不需要加上 /，直接指定路徑名稱
      //  FIXME  這支檔案要抽出來，我要在這邊放圖表
      {
        path: '',
        name: 'Admin_Entry',
        component: () => import('../views/Admin/Entry.vue'),
      },
      // 產品
      {
        path: 'products',
        name: '', //  TODO  name 這個參數是做什麼用的？
        component: () => import('../views/Admin/AdminProducts.vue'),
        // 如果下面這個是空的，但有這個參數，原本的 component 會被取代掉
        // components: {
        // 影片關鍵字：具名視圖
        // 這可以用來處理 Sidebar
        // 也可以放多個 router-view
        // 對應的會是 router view name 的屬性
        // [name]: () => import(''),
        // },
      },
      // 訂單列表頁
      {
        path: 'orders',
        name: '',
        component: () => import('../views/Admin/AdminOrders.vue'),
      },
      // 優惠券
      {
        path: 'coupons',
        name: '',
        component: () => import('../views/Admin/AdminCoupons.vue'),
      },
      // 文章列表
      {
        path: 'posts',
        name: '',
        component: () => import('../views/Admin/AdminPost/AdminPosts.vue'),
      },
      // 文章編輯頁面
      {
        path: 'post/detail/:id',
        name: '',
        component: () => import('../views/Admin/AdminPost/AdminPostDetail.vue'),
      },
    ],
  },
  // 錯誤頁面的做法 -> 404 頁面
  {
    path: '/:pathMatch(.*)*',
    name: '',
    component: () => import('../views/Core/NotFound.vue'),
  },
  // 重新導向
  {
    path: '/[page_name]/:pathMatch(.*)*',
    redirect: {
      name: '', // 導回首頁的話就是 'Home'
    },
  },
  // 動態路由
  // {
  //   path: '/:id', // 到頁面之後會透過 this.$route.params 取得網址帶的參數
  //   name: '',
  //   // component: () => import(''),
  // },
  // 動態路由 by props
  // {
  //   path: '/:id',
  //   name: '',
  //   // component: () => import(''),
  //   props: () => ({
  //     id: '', // 這寫法是直接指定，也就是說，在元件裡面不需要透過 this.$route.params 拿參數
  //   }),
  //   // 另外一種寫法
  //   // props: (route) => {
  //   //   return {
  //   //     id: route.params.id,
  //   //   };
  //   // },
  // },
];

// 路由設定
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 這邊可以自定義全部的樣式 class
  // 舉例來說，我自己定義 active 狀態是 .active
  // 那就可以指定 'active'
  //  TODO  這邊要回來設定
  linkActiveClass: '',
  // 觸發滾動行為
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);
    // to, form 都是路由地址
    // savedPosition 可為空
    // 可以在這裡判斷在某些特定的頁面要 scroll 到特定位置
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;

// 路由方法筆記：
// 當前頁面的網址參數
// console.log(this.$route);
// 能夠使用的路由方法
// console.log(this.$router);
// 切換頁面的方法：
// - push 包含歷史紀錄
// 寫法：this.$router.push({
//   name: '' // 對應到路由設定的名稱 name 屬性
// })
// - replace 不會有歷史紀錄
// - go 操作歷史紀錄
// 寫法：this.$router.go(-1)
// 回到上一頁，可以用在購物車的流程
// back 方法等同於 this.$router.go(-1)
// - addRoute
// 直接新增一個路由，臨時新增路由
// 後續新增的同名路由會被取代掉
