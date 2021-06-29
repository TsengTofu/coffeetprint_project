<template>
  <p>基本上這個元件可以刪除，替換掉了</p>
  <!-- 這個之後要替換掉，這遍是原本的產品列表的單張卡片 -->
  <!-- <li @click="goToCafeDetail(single_cafe.id)"> -->
    <!-- <p>咖啡廳名稱：{{ single_cafe.title }}</p> -->
    <!-- <p>地區：{{ single_cafe.area }}</p> -->
    <!-- <p>分類：{{ single_cafe.category }}</p> -->
    <!-- <p>產品編號：{{ single_cafe.id }}</p> -->
    <!-- <p>剩餘數量：{{ single_cafe.num }}</p> -->
    <!-- <p>{{ single_cafe.content }}</p> -->
    <!-- <p>{{ single_cafe.description }}</p> -->
    <!-- <p>{{ single_cafe.origin_price }}</p> -->
    <!-- <p>{{ single_cafe.price }}</p> -->
  </li>
</template>

<script>
export default {
  name: 'CafeCardComponent',
  // 產品列表頁
  components: {},
  props: {
    singleCafe: Object,
  },
  data() {
    return {
      single_cafe: this.singleCafe,
    };
  },
  methods: {
    goToCafeDetail(id) {
      console.log('有點到我喔');
      this.$router.push(`/detail/${id}`);
    },
  },
  mounted() {
    console.log(this.single_cafe);
  },
};
</script>
<style scoped lang="sass">
li
  background: #000
  color: #fff
  width: 30%
  margin: 10px
</style>
