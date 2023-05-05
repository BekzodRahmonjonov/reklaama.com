<template>
  <div class="recommondation-swiper">
    <client-only>
      <swiper :options="swiperOption" class="swiper">
        <swiper-slide v-for="item in list" :key="item.id">
          <nuxt-link :to="localePath(`/marker-detail/${item.id}`)">
            <div class="filter-item">
              <img :src="`${baseUrlImg}${item.images[0]}`" alt="filter" />
              <p class="price">
                {{ Number(item.price[5] || 0).toLocaleString("en-US") }}
                uzs
              </p>
              <div class="filter-item-event">
                <p class="type">{{ $t("type") }} | {{ item.type }}</p>
                <h5>{{ $t("street") }} | {{ item.street }}</h5>
              </div>
            </div>
          </nuxt-link>
        </swiper-slide>
      </swiper>
    </client-only>
    <div slot="button-prev" class="swiper-button-prev"></div>
    <div slot="button-next" class="swiper-button-next"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 12,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1200: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          575: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 12,
          },
        },
      },
    };
  },
  mounted() {},
  methods: {
    handleChange(value) {
      this.showBanner = value;
    },
    handleGetPhoto(value) {
      this.myBannerPhoto = value;
    },
  },
  computed: {
    ...mapGetters("home", ["baseUrlImg"]),
  },
};
</script>

<style lang="scss" scoped></style>
