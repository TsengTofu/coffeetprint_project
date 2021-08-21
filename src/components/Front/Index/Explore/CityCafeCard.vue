<template>
  <li
    class="col-md-3"
    v-for="(city, key) in area_data_list"
    :key="'city_' + key"
    data-aos="zoom-in"
    :data-aos-duration="key * 300"
  >
    <div class="card">
      <div class="city_image">
        <img
          :src="city.city_image_url"
          class="card-img-top"
          alt="城市主圖"
        >
      </div>
      <h5 class="title common_row_align">
        <span class="material-icons-round">place</span>
        {{ city.city }}
      </h5>
    </div>
  </li>
</template>

<script>
export default {
  name: 'CityCafeCardComponent',
  props: {},
  data() {
    return {
      area_data_list: [
        {
          city: '台北',
          city_image_url: 'https://storage.googleapis.com/vue-course-api.appspot.com/tofutseng/1629073575197.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=U0KWjzezGlG0aS5t6QXykFkQ%2F4Ee4NlI9LW0su7awjJnzCbMi6iuNhRWCkuBj390IK3uSDdB5v%2BYAdugxo85IlMBi%2FIA4soZY%2F6K4iwkhAOH18Ee3%2B0JjxE%2FogXyFOeHC8QWLM5Qjuf1ZiHVAoLpwURX2vRHcEsW4KWnVEwYVkY8KAEJla1%2B2DvYHS%2FPMhiPZKBPkGFYM7pdA2QWzr5yNrFB%2B1MKH5b5gLU1%2BYUydyW3TIyhLX1%2Fjv3sRv7GAhG%2FTgEfEa2Q9S%2BrsU8WhTH7T7nGoUzZcY0%2BcYUNuNAtUfNP%2FWk69H3m7X0mDOPaWjJxI0P5i66wQ9XSm384PWU4%2FQ%3D%3D',
        },
        {
          city: '桃園',
          city_image_url: 'https://storage.googleapis.com/vue-course-api.appspot.com/tofutseng/1629073597379.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Y0Xmhkjpi%2BDPsCZPiZ8wmNR07tm%2B2%2FGbphZxBG1WFQVLqibv%2FHDvT3OnLwgtTjIfDNjJgGzf5XuO%2BIF%2BKu9cNJphLon0pZbzaSKpRkrwmJAlKxhD0OXLRnF9ZKap%2BlWQUuW1P7WOlAjd4ogRdcZPmWZOSK%2BnqWCxo2RtP4e13dDfZVSj1XYEnT5cpZpGQcShEpQRJkeOOJfYVHAJcd5E7UCaRLe5RgGDcJn5ZWnHnz0MQFOcT7xbg0yl3rvvRWrMP4o5g8wI1%2B3bHaU6CQjUPHNc%2Fcydy%2BOBHKspSyB0tbq2mltNzsjXmqHTDRmsCe8OZB2%2FtiAiZTQ2xJ9fcwJr%2FA%3D%3D',
        },
        {
          city: '台中',
          city_image_url: 'https://storage.googleapis.com/vue-course-api.appspot.com/tofutseng/1629073619107.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=A5b1bFi%2FZ5M%2FS0sgihNwJbg9pw6Y3KbHkLc5VQsr6%2FeEAG4zmKd0Emlndk073cd6HcFLKSP%2BsljAoLyugslhm7eAUexpycDl1P1Ec1VELE7NioIJ87YGfaA%2FUKM8yuvK1j8kkGbyVl7p1m1ZckFDCkKoFggQipgOXQJDzfUXrcPPnbvx%2FseUx8Iti29qVvN955k03kLw%2FsrFFtk7c%2BUgGNadIBJ909CZrImlC3MFop%2BAoKrQlAqewgZMPKStLt6HEPJSkStZuadNOXU6%2BzVY2ULg0TpSxUC88vIwi8ulW0w%2FjWa6krpMvYyaBrSdTO7CgQOM4GJp6rVCzs%2FUoxViZw%3D%3D',
        },
        {
          city: '新北',
          city_image_url: 'https://storage.googleapis.com/vue-course-api.appspot.com/tofutseng/1629073633744.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=YcGYTltRVBClO5F57S%2FQ0CMbCPmnc6go2gdZeyn4F1srugOFoluzykXdK5FFY%2BbVdOXi04DJtpQgNvRQSjs%2FmxglgfYhm9OFUjfRDtfxqRVq32ditDN7OIuwCTefdboLTzwS1RbAx3cSLz%2BR0hwIcuSSNzEXN1NFmsXzAuRijweWYygRZZlgZbMBwyf9HeTG43DV8A9JlzEr0ccZf6hYNfg6AblwlaUVVuTyczMV8ybaiq%2FiK3I4Jvy0jSR7%2FfR1UJo11Z8af6HWCEfLgKQQWevSHh33zyE7blEO9eEsWHIt9Fc0CI8QHBtcboxgtP%2FpaSSytP1Ti3coK2bW8eQ7yw%3D%3D',
        },
      ],
    };
  },
  methods: {},
  mounted() {

  },
};
</script>

<style scoped lang="sass">
.title
  margin: 0 1rem 1rem
li
  cursor: pointer
  .card
    border: none
    border-radius: 8px
    .city_image
      margin: 1rem
      img
        width: 100%
        height: auto
</style>
