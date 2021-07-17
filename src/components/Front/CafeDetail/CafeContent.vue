<template>
  <div>
    <TabWrapperComponent
      :reviews="reviews"
    />
    <p>折價券使用須知</p>
    <iframe
      width="100%"
      height="450"
      style="border:0" loading="lazy" allowfullscreen
      :src="map_source">
    </iframe>
  </div>
</template>

<script>
// 整個 Tab 區塊
import TabWrapperComponent from './Tab/TabWrapper.vue';

export default {
  name: 'CafeContentComponent',
  props: {
    detail_data: Object,
  },
  components: {
    TabWrapperComponent,
  },
  data() {
    return {
      place_json: '',
      // 剩下的是要撈出來的資料
      // 對應的是 google Place API 的資料
      photos: [],
      //  NOTE  圖片的前綴：https://lh5.googleusercontent.com/p/
      // photos [array] 裡面的 photo_reference
      reviews: [],
      price_level: '',
      rating: '',
      place_id: '',
      opening_hours: {},
      // iframeSource
      map_source: '',
    };
  },
  methods: {
    // 這是要測試 googleAPI
    getLocationDetail() {
      const apiKey = 'AIzaSyCbpSIzbqpOjgsr9hmBcc9xvowFhCenqew';
      const name = '品都';
      // 透過搜索字串拿 ID
      const requestUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&key=${apiKey}`;
      // const requestUrl = `https://maps.googleapis.com/maps/api/place/details/json?input=${name}&inputtype=textquery&key=${apiKey}`;
      this.axios.get(requestUrl)
        .then((response) => {
          console.log('hello', response);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },
  mounted() {
    // 這是要測試 googleAPI
    // this.getLocationDetail();
  },
  watch: {
    detail_data() {
      console.log(process.env);
      this.place_json = JSON.parse(this.detail_data.place_json);
      const {
        photos,
        reviews,
        // 這個真的可以這樣寫嗎？
        price_level: priceLevel,
        rating,
        place_id: placeId,
        opening_hours: openingHours,
      } = this.place_json.result;
      //  一個一個帶入
      this.photos = photos;
      this.reviews = reviews;
      this.price_level = priceLevel;
      this.rating = rating;
      this.place_id = placeId;
      this.opening_hours = openingHours;

      // iframe 的來源網址
      this.map_source = `https://www.google.com/maps/embed/v1/place?q=place_id:${this.place_id}&key=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
