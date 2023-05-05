<template>
  <div class="home">
    <div class="container">
      <div class="home-wrapper">
        <div class="banner">
          <div
            class="banner-content"
            data-aos="fade-right"
            data-aos-duration="500"
          >
            <h1>{{ $t("bannerTitle") }}</h1>
            <p>
              {{ $t("bannerSubtitle") }}
            </p>
          </div>
          <div
            class="banner-carousel"
            data-aos="fade-left"
            data-aos-duration="500"
          >
            <div class="banner-carousel-img">
              <img src="~/assets/images/banner.png" alt="banner" />
            </div>
          </div>
        </div>
        <div class="overview">
          <h2 data-aos="zoom-in-down" data-aos-duration="500">
            {{ $t("platform") }}
          </h2>
          <p
            class="text"
            data-aos="zoom-in-down"
            data-aos-duration="500"
            v-html="$t('aboutPlatform')"
          ></p>

          <div class="platform">
            <a-row type="flex" :gutter="[32, 2]">
              <a-col
                span="24"
                :md="{ span: 12 }"
                v-for="(item, index) in platformInfo[$i18n.locale]"
                :key="index"
              >
                <div
                  class="platform-notice"
                  data-aos="zoom-in-down"
                  data-aos-duration="500"
                  :data-aos-delay="index * 150"
                >
                  <video width="80" height="80" loop autoplay muted playsinline>
                    <source :src="item.video" type="video/mp4" />
                  </video>
                  <span class="platform-notice-title">{{ item.title }}</span>
                </div>
              </a-col>
            </a-row>
          </div>
          <h2 data-aos="zoom-in-down" data-aos-duration="500">
            {{ $t("ourUnique") }}
          </h2>
          <p
            class="text _mb-140"
            data-aos="zoom-in-down"
            data-aos-duration="500"
          >
            {{ $t("platformSubtitle") }}
          </p>
          <div class="overview-video">
            <h2>{{ $t("videoTitle") }}</h2>
            <a-row type="flex" :gutter="[24, 24]">
              <a-col span="24" :md="{ span: 12 }">
                <div
                  class="overview-video-item"
                  data-aos="fade-up-right"
                  data-aos-duration="600"
                >
                  <div class="content">
                    <video width="100%" loop autoplay muted playsinline>
                      <source
                        :src="`${baseUrlImg}1-${device}`"
                        type="video/mp4"
                      />
                    </video>
                    <!-- <div class="play-btn-box">
                      <div class="play-button"><i class="fas fa-play"></i></div>
                      <div class="play-btn-line1" id="line1">
                        <div class="play-btn-line2" id="line2"></div>
                      </div>
                    </div> -->
                  </div>
                  <p>
                    {{ $t("video1Subtitle") }}
                  </p>
                </div>
              </a-col>
              <a-col span="24" :md="{ span: 12 }">
                <div
                  class="overview-video-item"
                  data-aos="fade-up-left"
                  data-aos-duration="600"
                >
                  <div class="content">
                    <video width="100%" loop autoplay muted playsinline>
                      <source
                        :src="`${baseUrlImg}2-${device}`"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  <p>
                    {{ $t("video2Subtitle") }}
                  </p>
                </div>
              </a-col>
            </a-row>
            <div class="billboard">
              <div
                v-for="(item, index) in billboards"
                :key="index"
                class="billboard-item"
                data-aos="flip-left"
                data-aos-easing="linear"
                data-aos-duration="400"
                :data-aos-delay="index * 250 + 250"
              >
                <span> {{ item.title[$i18n.locale] }} </span>
                <img :src="item.url" :alt="item.title[$i18n.locale]" />
                <div class="billboard-item-content">
                  <p class="info">
                    {{ item.info[$i18n.locale] }}
                  </p>
                </div>
              </div>
            </div>
            <div id="overview-map">
              <HomeMap />
            </div>
            <div class="recommondation top-locations" v-if="this.topList">
              <h2>{{ $t("mostViewed") }}</h2>
              <SwiperRecommondation :list="topList" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      device: "d",
    };
  },
  computed: {
    ...mapGetters("home", ["recommondation", "baseUrlImg"]),
    ...mapGetters("constants", ["platformInfo", "billboards"]),
    topList() {
      return this.recommondation && this.recommondation.seeCount;
    },
  },
  methods: {
    ...mapActions("home", ["getTopSeen"]),
    async getData() {
      await this.getTopSeen();
    },
  },
  mounted() {
    this.getData();

    if (window.innerWidth < 768) {
      this.device = "m";
    } else {
      this.device = "d";
    }
  },
};
</script>

<style lang="scss" scoped></style>
