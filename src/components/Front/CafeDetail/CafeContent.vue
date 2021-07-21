<template>
  <div class="container">
    <!-- detail_data 也要一起傳進來嗎？ -->
    <TabWrapperComponent
      :reviews="reviews"
      :basic_info="basic_info"
      :detail_data="detail_data"
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
      // 對應的是 google Place API 的資料
      basic_info: {
        photos: [],
        price_level: '',
        rating: '',
        opening_hours: {},
        website: '',
        formatted_address: '',
        formatted_phone_number: '',
      },
      reviews: [],
      place_id: '',
      // iframeSource
      map_source: '',
    };
  },
  methods: {
  },
  mounted() {
  },
  watch: {
    detail_data() {
      // 先轉換資料
      this.place_json = JSON.parse(this.detail_data.place_json);
      const {
        photos,
        reviews,
        // 這個真的可以這樣寫嗎？
        price_level: priceLevel,
        rating,
        place_id: placeId,
        opening_hours: openingHours,
        website,
        formatted_address: formattedAddress,
        formatted_phone_number: formattedPhoneNumber,
      } = this.place_json.result;
      this.basic_info.photos = photos;
      this.basic_info.price_level = priceLevel;
      this.basic_info.rating = rating;
      // 這邊型別怪怪的
      this.basic_info.opening_hours = openingHours.weekday_text.map((element) => {
        const openingData = element.replace(':', ' ').split('  ');
        return { days: openingData[0], time: openingData[1] };
      });
      this.basic_info.website = website;
      this.basic_info.formatted_address = formattedAddress;
      this.basic_info.formatted_phone_number = formattedPhoneNumber;
      this.reviews = reviews;
      this.place_id = placeId;
      // iframe 的來源網址
      this.map_source = `https://www.google.com/maps/embed/v1/place?q=place_id:${this.place_id}&key=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
