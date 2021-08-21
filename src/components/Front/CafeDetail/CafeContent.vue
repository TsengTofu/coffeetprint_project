<template>
  <div class="container">
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
      :src="map_source"
    >
    </iframe>
  </div>
</template>

<script>
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
  watch: {
    detail_data() {
      // 先轉換資料
      const {
        photos,
        reviews,
        price_level: priceLevel,
        rating,
        place_id: placeId,
        opening_hours: openingHours,
        website,
        formatted_address: formattedAddress,
        formatted_phone_number: formattedPhoneNumber,
      } = this.detail_data;
      this.basic_info.photos = photos;
      this.basic_info.price_level = priceLevel;
      this.basic_info.rating = rating;
      this.basic_info.opening_hours = openingHours.weekday_text.map((element) => {
        const openingData = element.replace(':', ' ').replace('星期', ' ').split('  ');
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
