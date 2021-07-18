<template>
  <p>這個是商家的基本資訊元件</p>
  {{ basic_info.opening_hours }}
  {{ basic_info.price_level }}
  {{ basic_info.rating }}
  {{ basic_info.website }}
  {{ basic_info.formatted_address }}
  {{ basic_info.formatted_phone_number }}
  <!--  NOTE  這邊要注意一下 CallAPI 次數 -->
  <p>網友拍攝的照片</p>
  <template v-for="(photo, key) in basic_info.photos" :key="'photo_' + key">
    <p v-html="photo.html_attributions[0]"></p>
    <!--  FIXME  這邊改成組合網址 -->
    <img
      :src="'https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=' + photo.photo_reference + '&key=AIzaSyCbpSIzbqpOjgsr9hmBcc9xvowFhCenqew'" alt="">
  </template>
</template>

<script>
export default {
  name: 'BasicInfoComponent',
  props: {
    basic_info: Object,
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="sass" scoped>

</style>
