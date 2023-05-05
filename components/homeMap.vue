<template>
  <div>
    <div data-aos="zoom-out-up" data-aos-duration="600">
      <div class="overview-filter">
        <div class="overview-filter-left">
          <div @click="clearMyFilter">
            <svgicon
              class="filter"
              :name="filterProgress.length > 0 ? 'delete' : 'filter'"
            />
          </div>

          <form @submit="(e) => e.preventDefault()" class="search-form">
            <input
              type="text"
              v-model="myFilter.search_text"
              class="search-form-input"
              @keypress.enter="mapFilter('search_text', '')"
              on-focus="true"
            />
            <div
              class="input-placeholder"
              :class="{ active: myFilter.search_text }"
            >
              <div class="text-typing">
                <ul class="dynamic-txt">
                  <li>
                    <span> {{ placeholderExchange }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <svgicon name="search" @click="mapFilter('search_text', '')" />
          </form>
        </div>
        <div class="overview-filter-right">
          <a-dropdown :trigger="['click']">
            <div
              class="ant-dropdown-link link"
              @click="(e) => e.preventDefault()"
              :class="{ active: myFilter.displayType }"
            >
              <svgicon name="select-angle-down" />
              {{ $t("type") }}
            </div>
            <a-menu slot="overlay">
              <a-menu-item :key="0" @click="mapFilter('displayType', null)">
                <span style="font-size: 18px">{{ $t("all") }}</span>
              </a-menu-item>
              <a-menu-item
                v-for="(item, index) in billboards"
                :key="index + 1"
                @click="mapFilter('displayType', index)"
              >
                <span style="font-size: 18px">{{
                  item.title[$i18n.locale]
                }}</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown :trigger="['click']">
            <div
              class="ant-dropdown-link link"
              @click="(e) => e.preventDefault()"
              :class="{ active: myFilter.district }"
            >
              <svgicon name="select-angle-down" />
              {{ $t("district") }}
            </div>
            <a-menu slot="overlay">
              <a-menu-item :key="0" @click="mapFilter('district', null)">
                <span style="font-size: 18px">{{ $t("all") }}</span>
              </a-menu-item>
              <a-menu-item
                v-for="(item, index) in districts[$i18n._vm.locale]"
                :key="index + 1"
                @click="mapFilter('district', index)"
              >
                <span style="font-size: 18px">{{ item }}</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown
            :trigger="['click']"
            @visibleChange="myVisibleChange"
            :visible="is_visible"
          >
            <div
              class="ant-dropdown-link link"
              @click="(e) => e.preventDefault()"
              :class="{ active: myFilter.price_from || myFilter.price_to }"
            >
              <svgicon name="select-angle-down" />
              {{ $t("price") }}
            </div>
            <a-menu slot="overlay">
              <a-menu-item key="0" class="price-range">
                <div class="filter-price">
                  <div class="filter-price-slider">
                    <a-slider
                      range
                      :marks="marks"
                      :default-value="[0, 10000000]"
                      :max="10000000"
                      :step="500000"
                      @afterChange="onAfterChange"
                    />
                    <a-button
                      class="filter-price-slider-btn"
                      @click="mapFilter('price', ' ')"
                      >{{ $t("search") }}</a-button
                    >
                  </div>
                </div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown :trigger="['click']">
            <div
              class="ant-dropdown-link link"
              @click="(e) => e.preventDefault()"
              :class="{ active: myFilter.company }"
            >
              <svgicon name="select-angle-down" />
              {{ $t("company") }}
            </div>
            <a-menu slot="overlay">
              <a-menu-item :key="0" @click="mapFilter('company', null)">
                <span style="font-size: 18px">{{ $t("all") }}</span>
              </a-menu-item>
              <a-menu-item
                v-for="(item, index) in companyCounter"
                :key="index + 1"
                @click="mapFilter('company', item.companyName)"
              >
                <span style="font-size: 18px">{{ item.companyName }}</span>
                <span class="companyCount">{{item.counter }}</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <div
            class="ant-dropdown-link link"
            @click="mapFilter('displayType', 8)"
            :class="{ active: myFilter.user_id }"
          >
            {{ $t("saved") }}
          </div>
        </div>
      </div>
    </div>
    <div class="overview-map" data-aos="zoom-out-up" data-aos-duration="600">
      <client-only>
        <yandex-map
          :coords="coords"
          zoom="12"
          :settings="settings"
        >
          <ymap-marker
            v-if="currentLocation"
            key="my-location"
            marker-type="placemark"
            :coords="[currentLocation.longitude, currentLocation.latitude]"
            markerId="my-location"
            cluster-name="my-location"
            geoObjectOpenBalloonOnClick="false"
            :icon="{
              layout: 'default#imageWithContent',
              imageHref: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Yandex_Maps_icon.svg/1200px-Yandex_Maps_icon.svg.png`,
              imageSize: [36, 36],
               imageOffset: [-20, -35],
            }"
          >
            <div slot="balloon">{{ $t("myLocation") }}</div>
          </ymap-marker>
          <ymap-marker
            v-for="(item, index) in list && list"
            :key="index"
            marker-type="placemark"
            :coords="[item.location.latitude, item.location.longitude]"
            :marker-id="index"
            @balloonopen="bindListener"
            @balloonclose="unbindListener"
            :icon="{
              layout: 'default#imageWithContent',
              imageHref: require(`~/assets/icons/displays/${item.iconId}.png`),
              imageSize: [22, 32],
              imageOffset: [-11, -30]
            }"
          >
            <div slot="balloon" class="current-location">
              <span
                ><strong>{{ $t("type") }} </strong> | {{ item.type }}</span
              >
              <span
                ><strong>{{ $t("street") }} </strong> | {{ item.street }}</span
              >
              <span
                ><strong>{{ $t("company") }}</strong> |
                {{ item.companyName }}</span
              >
              <a-button id="btn" :value="item.id">
                {{ $t("seeMore") }}
              </a-button>
            </div>
          </ymap-marker>
        </yandex-map>
      </client-only>
    </div>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      settings: {
        apiKey: "",
        lang: "ru_RU",
        coordorder: "latlong",
        enterprise: false,
        version: "2.1",
      },
      coords: [41.319765954337115, 69.25457354018394],
      currentLocation: null,
      marks: {
        0: "0 ",
        10000000: "10 mln ",
      },
      myFilter: {
        search_text: null,
        displayType: null,
        district: null,
        price_from: null,
        price_to: null,
        company: null,
        user_id: null,
      },
      filterProgress: [],
      searchValue: "",
      price_range: "",
      is_visible: false,
      open_price: false,

      placeholderExchange: "",
    };
  },
  components: { yandexMap, ymapMarker },
  computed: {
    ...mapGetters("home", ["list", "baseUrlImg", "companyCounter"]),
    ...mapGetters("constants", ["districts", "billboards", "searchKeys"]),
  },
  methods: {
    ...mapActions("home", ["getDisplays", "getCompanyByFilter"]),
    async getMarkerList() {
      localStorage.setItem("filter_keys", JSON.stringify(this.myFilter));
      await this.getDisplays({ params: this.myFilter });
    },
    bindListener() {
      document
        .getElementById("btn")
        .addEventListener("click", (e) => this.handler(e.target.value));
    },
    unbindListener() {
      document
        .getElementById("btn")
        .removeEventListener("click", (e) => this.handler(e.target.value));
    },
    handler(id) {
      this.$router.push(this.localePath(`/marker-detail/${id}`));
    },
    mapFilter(type, value) {
      if (type != "price" && type != "search_text") {
        if (type == "displayType" && value == 8) {
          this.myFilter.user_id = localStorage.getItem("user_id");
        } else {
          this.myFilter[type] = value;
        }
      } else if (type == "price") {
        this.is_visible = false;
      }

      this.filterProgress = Object.values(this.myFilter).filter(
        (item) => item != null
      );
      this.getCompanyByFilter();
      this.getMarkerList();
    },
    onAfterChange(value) {
      this.myFilter.price_from = value[0];
      this.myFilter.price_to = value[1];
      this.is_visible = true;
    },

    clearMyFilter() {
      this.myFilter = {
        search_text: null,
        displayType: null,
        district: null,
        price_from: null,
        price_to: null,
        company: null,
        user_id: null,
      };
      this.filterProgress = [];
      localStorage.removeItem("filter_keys");
      this.getCompanyByFilter();
      this.getMarkerList();
    },
    myVisibleChange(e) {
      this.is_visible = e;
    },
    exchange() {
      const getKey = () => {
        this.placeholderExchange =
          this.searchKeys[
            Math.round(Math.random() * this.searchKeys.length)
          ].title[this.$i18n.locale];
      };
      setInterval(getKey, 3000);
    },
  },
  mounted() {
    this.getCompanyByFilter();
    let filter_keys = localStorage.getItem("filter_keys");
    if(filter_keys){
      this.myFilter = JSON.parse(filter_keys);
    }
    this.filterProgress = Object.values(this.myFilter).filter(
        (item) => item != null
      );

      
    this.exchange();
    const success = (pos) => {
      const crd = pos.coords;
      this.currentLocation = {
        longitude: crd.latitude,
        latitude: crd.longitude,
        visible: false,
      };
    };

    const error = (err) => {
      console.warn(err);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  },
};
</script>

<style lang="scss" scoped>
.ymap-container {
  height: 100%;
}
</style>
