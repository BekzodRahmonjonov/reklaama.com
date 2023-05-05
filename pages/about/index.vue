<template>
  <div class="about">
    <div class="mini-container">
      <div class="about-wrapper">
        <div class="about-wrapper-home">
          <div class="content" data-aos="fade-right" data-aos-duration="500">
            <h2>{{$t("aboutTitle")}}</h2>
            <p>
              {{$t("aboutSubtitle")}}
            </p>
            <span
              >{{$t("aboutDescription")}}</span
            >
          </div>
          <div class="images" data-aos="fade-left" data-aos-duration="500">
            <img src="~assets/images/about-banner.png" alt="about" />
          </div>
        </div>
        <div class="about-wrapper-partners">
          <h2>{{$t("partnerTitle")}}</h2>
          <client-only>
            <swiper :options="swiperOptions2">
              <swiper-slide
                v-for="(item, index) in partnerList"
                :key="index"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="300"
                :data-aos-delay="index * 250 + 1350"
                data-aos-anchor=".home-service"
              >
                <div class="about-wrapper-partners-item">
                  <img :src="item.url" alt="parner" />
                </div>
              </swiper-slide>
            </swiper>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions2: {
        autoplay: true,
        loop: true,
        slidesPerView: 5,
        spaceBetween: 85,
        breakpoints: {
          1552: {
            slidesPerView: 5,
            spaceBetween: 32,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          0: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
        },
      },
      partnerList: [
        { url: require("~/assets/icons/partner1.svg") },
        { url: require("~/assets/icons/partner2.svg") },
        { url: require("~/assets/icons/partner3.svg") },
        { url: require("~/assets/icons/partner4.svg") },
        { url: require("~/assets/icons/partner5.svg") },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
