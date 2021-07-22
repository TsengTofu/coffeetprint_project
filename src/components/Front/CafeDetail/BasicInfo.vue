<template>
  <div class="row">
    <div class="info col-md-6">
      <h4>
        <a :href="basic_info.website" target="_blank">{{ detail_data.title }}</a>
      </h4>
      <p class="d-flex stars">
        <span
          v-for="(n, index) in parseInt(basic_info.rating)"
          :key="'star_' + index"
          class="material-icons-round"
          >star</span
        >
        <span
          v-for="(n, index) in 5 - parseInt(basic_info.rating)"
          :key="'star_' + index"
          class="material-icons-round"
          >star_border</span
        >
      </p>
      <!-- FIXME 這個有可能有沒有的狀態 -->
      <p>
        價位等級：
        <span v-for="(level, key) in basic_info.price_level" :key="'level_' + key">$</span>
      </p>
      <!-- 上面這裡要放 icon -->
      <p>
        <span class="material-icons-round">phone_in_talk</span>
        電話：{{ basic_info.formatted_phone_number }}
      </p>
      <p>
        <span class="material-icons-round">home</span>
        地址：{{ basic_info.formatted_address }}
      </p>
      <p v-html="detail_data.description"></p>
      <!--  TODO  這邊必須重新處理資料 -->
      <table class="table">
        <thead>
          <tr>
            <th
              v-for="(hour, key) in basic_info.opening_hours" :key="'hour' + key"
              >
              {{ hour.days }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              v-for="(hour, key) in basic_info.opening_hours" :key="'hour' + key"
              >{{ hour.time }}</th>
          </tr>
        </tbody>
      </table>
      <!-- <p v-for="(hour, key) in basic_info.opening_hours" :key="'hour' + key">
        <span>{{ hour.days }}</span>
        <span>{{ hour.time }}</span>
      </p> -->
    </div>
    <!--  TODO  先在這邊引入 Swiper-->
    <div class="reviewer_swiper col-md-6">
      <!--  NOTE  這邊要注意一下 CallAPI 次數 -->
      <swiper
        :slides-per-view="1"
        :space-between="50"
        navigation
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="(photo, key) in basic_info.photos" :key="'photo_' + key">
          <div
            class="reviewer_image"
            :style="{
              backgroundImage:
                'url(' +
                'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=' +
                photo.photo_reference +
                '&key=AIzaSyCbpSIzbqpOjgsr9hmBcc9xvowFhCenqew' +
                ')',
            }"
          >
          <!-- TODO  這邊要把超過的字串隱藏 -->
            <p
              v-html="'Photo Credit - ' + photo.html_attributions[0]"
              class="credit_user"
            ></p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
// Swiper 相關
import SwiperCore, {
  Navigation, A11y,
} from 'swiper';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';

// install Swiper modules
SwiperCore.use([Navigation, A11y]);

export default {
  name: 'BasicInfoComponent',
  props: {
    basic_info: Object,
    //  FIXME  這個傳了很多層，之後要回來修正
    detail_data: Object,
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      weekdays_opening_hour: [],
    };
  },
  methods: {
    // Swiper 相關的內容
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log('slide change');
    },
  },
  mounted() {},
};
</script>

<style lang="sass" scoped>
th
  font-size: 12px
.reviewer_swiper
  // width: 40%
  .reviewer_image
    background-size: cover
    background-position: center
    height: 400px
    position: relative
    .credit_user
      background: rgba(0,0,0, .4)
      color: #fff
      font-size: 13px
      font-weight: bold
      width: 100%
      position: absolute
      bottom: 0px
      right: 0px
      padding: .5rem
      margin: 0px
</style>
