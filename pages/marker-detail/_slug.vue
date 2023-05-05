<template>
  <div class="marker">
    <div class="container">
      <div class="marker-wrapper" v-if="detail">
        <a-row type="flex" :gutter="[24, 24]" class="contain">
          <a-col span="24" :xl="{ span: 16 }">
            <div class="marker-wrapper-left">
              <div class="marker-wrapper-left-carousel">
                <MarkerSwiper :list="detail.images" />
              </div>
            </div>
          </a-col>
          <a-col span="24" :xl="{ span: 8 }">
            <div class="marker-wrapper-right content content-between">
              <div class="building">
                <div>
                  <h2>{{ detail.type }}</h2>
                  <span>{{ $t("type") }}</span>
                </div>
                <div>
                  <h2>
                    {{ detail.registrationCode }}
                  </h2>
                  <span>{{ $t("regCode") }}</span>
                </div>
              </div>
              <div class="location">
                <div class="content-header">
                  <svgicon name="menuLightLocation"></svgicon>
                  {{ $t("location") }}
                </div>
                <p>
                  {{ detail.city }}
                </p>
              </div>
              <div class="company">
                <div class="content-header">
                  <svgicon name="menuLightProfile"></svgicon>
                  {{ $t("company") }}
                </div>
                <p>{{ detail.companyName }}</p>
              </div>
              <div class="spacial__keys">
                <div class="content-header">
                  <svgicon name="danger"></svgicon>
                  {{ $t("specialKeys") }}
                </div>
                <ul>
                  <li v-for="item in detail.special_key" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </a-col>
          <a-col span="24" :xl="{ span: 16 }">
            <div class="marker-wrapper-left">
              <div class="marker-wrapper-left-statistics content">
                <div class="content-header">
                  <svgicon name="statistics"></svgicon>
                  {{ $t("statistics") }}
                </div>
                <div class="content-main">
                  <div>
                    <h5>
                      <span>{{ $t("status") }}:</span> {{ detail.status }}
                    </h5>
                    <small>{{ $t("lastUpdate") }}: {{ detail.updateAt }}</small>
                  </div>
                  <div v-if="detail.expire">
                    <h5>
                      <span>{{ $t("expireText") }}:</span> {{ detail.expire }}
                    </h5>
                    <small>{{ $t("lastUpdate") }}: {{ detail.updateAt }}</small>
                  </div>
                  <div>
                    <h5>
                      <svgicon name="see" />
                      {{ Number(detail.seeCount).toLocaleString("en-US") }}
                    </h5>
                  </div>
                  <div>
                    <h5>
                      <svgicon name="bookmarkBold" />
                      {{ Number(detail.saved).toLocaleString("en-US") }}
                    </h5>
                  </div>
                  <div v-if="detail.bright">
                    <h5>
                      <svgicon name="bright" />
                      {{ Number(detail.bright).toLocaleString("en-US") }}
                      Nit
                    </h5>
                  </div>
                  <div v-if="detail.height">
                    <h5>
                      <svgicon name="floor" />
                      {{ detail.height }} floor
                    </h5>
                  </div>
                </div>
              </div>
              <div class="request_join" v-if="billboardType == 3 && !width_md">
                <a-button class="booking" v-if="!is_booking" @click="booking">
                  {{ $t("booking") }}</a-button
                >
                <div v-else class="contact">
                  <div class="contact-info">
                    <a-button type="secondary">
                      <svgicon name="phone" />
                      <span>{{ $t("number") }}:</span>
                    </a-button>
                    <small>
                      <a :href="`tel: ${detail.phone}`">{{ detail.phone }}</a>
                    </small>
                  </div>
                  <div class="contact-info">
                    <a-button type="secondary">
                      <svgicon name="email" />
                      <span>{{ $t("mail") }}:</span>
                    </a-button>
                    <small>
                      <a
                        :href="`mailto: ${detail.email}?subject = Murojaat`"
                        target="_blank"
                      >
                        {{ detail.email }}</a
                      >
                    </small>
                  </div>
                </div>

                <a-button
                  :class="{ saved: is_saved }"
                  type="secondary"
                  @click="saveMarker"
                >
                  <svgicon name="bookmark" />
                  {{ is_saved ? $t("saved") : $t("save") }}</a-button
                >
              </div>
            </div>
          </a-col>
          <a-col span="24" :xl="{ span: 8 }">
            <div class="marker-wrapper-right content">
              <div class="cost__amount">
                <div v-if="billboardType == 3">
                  <div class="content-header">
                    <strong class="time__rolling">
                      <svgicon name="time-roll" />
                      {{ $t("roll_time") }}
                    </strong>
                  </div>
                  <a-slider
                    class="time-slider"
                    :marks="marks"
                    :max="max_slider"
                    :min="5"
                    :tip-formatter="null"
                    :step="5"
                    @change="onAfterChange"
                  />
                </div>
                <div class="content-header">
                  <svgicon name="wallet"></svgicon>
                  {{ $t("cost") }}
                </div>
                <h4>
                  {{
                    Number(detail.price[active_mark]).toLocaleString("en-US")
                  }}
                  {{ $t("cost_permonth") }}
                </h4>
                <small>{{ $t("lastUpdate") }}: {{ detail.updateAt }}</small>
              </div>
              <div v-if="billboardType != 3 || width_md">
                <a-button class="booking" v-if="!is_booking" @click="booking">
                  {{ $t("booking") }}</a-button
                >
                <div v-else class="contact">
                  <div class="contact-info">
                    <a-button type="secondary">
                      <svgicon name="phone" />
                      <span>{{ $t("number") }}:</span>
                    </a-button>
                    <small>
                      <a :href="`tel: ${detail.phone}`">{{ detail.phone }}</a>
                    </small>
                  </div>
                  <div class="contact-info">
                    <a-button type="secondary"
                      >393
                      <svgicon name="email" />
                      <span>{{ $t("mail") }}:</span>
                    </a-button>
                    <small>
                      <a
                        :href="`mailto: ${detail.email}?subject = Murojaat`"
                        target="_blank"
                      >
                        {{ detail.email }}</a
                      >
                    </small>
                  </div>
                </div>

                <a-button
                  :class="{ saved: is_saved }"
                  type="secondary"
                  @click="saveMarker"
                >
                  <svgicon name="bookmark" />
                  {{ is_saved ? $t("saved") : $t("save") }}</a-button
                >
              </div>
            </div>
          </a-col>
        </a-row>

        <div class="recommondation" v-if="filterList && filterList.length > 0">
          <h2>{{ $t("ourRecommended") }}</h2>
          <div class="recommondation-swiper">
            <swiper :options="swiperOptionRecommondation" class="swiper">
              <swiper-slide v-for="item in filterList" :key="item.id">
                <nuxt-link :to="localePath(`/marker-detail/${item.id}`)">
                  <div class="filter-item">
                    <img :src="`${baseUrlImg}${item.images[0]}`" alt="filter" />
                    <p class="price">
                      {{
                        Number(item.price[5] || 0).toLocaleString(
                          "en-US"
                        )
                      }}
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
            <div
              slot="button-prev"
              class="swiper-button-prev swiper-button-prev-recomondation"
            ></div>
            <div
              slot="button-next"
              class="swiper-button-next swiper-button-next-recomondation"
            ></div>
          </div>
        </div>
      </div>
      <loader v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        did: "",
        id: "",
      },
      filterList: null,
      is_booking: false,
      is_saved: false,
      max_slider: 30,

      marks: {
        5: "5 s",
        10: "10 s",
        15: "15 s",
        20: "20 s",
        25: "25 s",
        30: "30 s",
      },
      active_mark: 5,
      width_md: false,
      swiperOptionRecommondation: {
        slidesPerView: 4,
        spaceBetween: 12,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next-recomondation",
          prevEl: ".swiper-button-prev-recomondation",
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
  computed: {
    ...mapGetters("home", ["detail", "filterDetail", "baseUrlImg"]),
    ...mapGetters("constants", ["billboards"]),

    billboardType() {
      let type = 0;
      this.billboards.map((item, index) => {
        if (item.title[this.$i18n.locale] == this.detail.type) {
          type = index;
        }
      });
      return type;
    },
  },
  methods: {
    ...mapActions("home", [
      "getDetail",
      "markerCreate",
      "getDetailByFilter",
      "bookingDisplay",
      "saved",
    ]),
    async saveMarker() {
      this.form.did = this.$route.params.slug;
      this.form.id = localStorage.getItem("user_id") || "";
      try {
        const data = await this.markerCreate(this.form);

        if (!this.form.id) {
          localStorage.setItem("user_id", data.data.id);
        }
        this.$message.success(
          !this.is_saved ? this.$t("addMarker") : this.$t("removeMarker")
        );
        this.getData();
      } catch (e) {
        this.$message.error(this.$t("seeError"));
      }
    },
    async booking() {
      await this.bookingDisplay(this.$route.params.slug);
      this.is_booking = true;
    },
    filterByDetail(key) {
      const data = Object.values(this.filterDetail);
      this.filterList = data[key];
    },
    onAfterChange(value) {
      this.active_mark = value;
    },
    async getData() {
      await this.getDetail({ params: { id: this.$route.params.slug } });
      await this.getDetailByFilter(this.$route.params.slug);
      if (localStorage.getItem("user_id")) {
        const {
          status: { data },
        } = await this.saved({
          params: {
            displayId: this.$route.params.slug,
            id: localStorage.getItem("user_id"),
          },
        });
        this.is_saved = data;
      }
      if (this.detail && this.detail.price) {
        this.marks = {};
        this.max_slider = 5;
        Object.entries(this.detail.price).map((item) => {
          if (this.max_slider < item[0]) {
            this.max_slider = item[0];
          }
          if (item[1]) {
            this.marks[item[0]] = item[0] + " s";
          }
        });
      }
    },
  },
  async mounted() {
    await this.getData();
    await this.filterByDetail(0);

    if (window.innerWidth <= 1200) {
      this.width_md = true;
    } else {
      this.width_md = false;
    }
    if (document) {
      let clientHeight =
        document.querySelector(".marker-wrapper-right").clientHeight || "";
      let clientWidth =
        document.querySelector(".marker-wrapper-right").clientWidth || "";

      document.querySelector(
        ".marker-wrapper-left"
      ).style.maxHeight = `${clientHeight}px`;
      document.querySelector(
        ".marker-wrapper-right"
      ).style.maxHeight = `${clientHeight}px`;

      document.querySelector(
        ".request_join"
      ).style.maxWidth = `${clientWidth}px`;
    }
  },
};
</script>

<style lang="scss" scoped></style>
