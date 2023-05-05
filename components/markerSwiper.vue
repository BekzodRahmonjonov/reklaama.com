<template>
  <div id="swiper">
    <client-only>
      <swiper :options="swiperOption2" class="swiper">
        <swiper-slide  v-for="item in list" :key="item.id">
          <div v-if="list.length>0">
            <img :src="`${baseUrlImg}${item}`" alt="banner" />
          </div>
          <div v-else>
            <img src="~/assets/images/detail-banner.jpg" alt="detail" />
          </div>
        </swiper-slide>
        <div slot="button-prev" class="swiper-button-prev swiper-button-prev-marker" id="swiper-button-prev-marker"></div>
        <div slot="button-next" class="swiper-button-next swiper-button-next-marker" id="swiper-button-next-marker"></div>
      </swiper>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      swiperOption2: {
        slidesPerView: 1,
        spaceBetween: 12,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next-marker",
          prevEl: ".swiper-button-prev-marker",
        },
      },
    };
  },
  computed: {
    ...mapGetters("home", ["baseUrlImg"]),
  },
};
</script>

<style lang="scss" scoped></style>
