<template>
  <div class="cabinet-user my-locations">
    <div class="container">
      <div class="cabinet-user-wrapper">
        <div class="cabinet-user-wrapper-header">
          <h2>{{ $t("personalCabinet") }}</h2>
          <a-button>
            <nuxt-link :to="localePath('/cabinet/user/display')">{{
              $t("newLocation")
            }}</nuxt-link>
          </a-button>
        </div>
        <a-row type="flex" :gutter="[24, 24]">
          <a-col span="0" :md="{ span: 6 }">
            <div class="cabinet-user-wrapper-layout">
              <Sidebar />
            </div>
          </a-col>
          <a-col span="24" :md="{ span: 18 }">
            <div class="cabinet-user-wrapper-main">
              <div class="map">
                <client-only>
                  <yandex-map
                    :zoom="zoom"
                    :settings="settings"
                    :coords="coords"
                  >
                    <ymap-marker
                      v-if="currentLocation"
                      key="my-location"
                      marker-type="placemark"
                      :coords="[
                        currentLocation.longitude,
                        currentLocation.latitude,
                      ]"
                      markerId="my-location"
                      cluster-name="my-location"
                      geoObjectOpenBalloonOnClick="false"
                      :icon="{
                        layout: 'default#imageWithContent',
                        imageHref: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Yandex_Maps_icon.svg/1200px-Yandex_Maps_icon.svg.png`,
                        imageSize: [40, 40],
                         imageOffset: [-20, -35],
                      }"
                    >
                      <div slot="balloon">{{ $t("myLocation") }}</div>
                    </ymap-marker>
                    <ymap-marker
                      v-for="(item, index) in list"
                      :key="index"
                      marker-type="placemark"
                      :coords="[
                        item.location.latitude,
                        item.location.longitude,
                      ]"
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
                        <div>
                          <strong>{{ $t("type") }}:</strong> {{ item.type }}
                        </div>
                        <div>
                          <strong>{{ $t("street") }}:</strong> {{ item.street }}
                        </div>
                        <span
                          ><strong>{{ $t("company") }}:</strong>
                          {{ item.companyName }}</span
                        >
                        <a-button
                          class="see-detail-btn"
                          id="btn"
                          :value="item.id"
                        >
                          {{ $t("seeMore") }}
                        </a-button>
                      </div>
                    </ymap-marker>
                  </yandex-map>
                </client-only>
              </div>
              <CustomTable>
                <template #header>
                  <th>{{ $t("type") }}</th>
                  <th>{{ $t("regCode") }}</th>
                  <th>{{ $t("address") }}</th>
                  <th>{{ $t("phoneNumber") }}</th>
                  <th>{{ $t("status") }}</th>
                  <th></th>
                </template>
                <template #body>
                  <tr v-for="(item, index) in locationList" :key="index">
                    <td>{{ item.type }}</td>
                    <td>{{ item.registrationCode }}</td>
                    <td>{{ item.city }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.status }}</td>
                    <td>
                      <div class="table-action">
                        <a-button
                          class="table-action-btn edit"
                          @click="confirm('edit', item.id)"
                        >
                          <svgicon name="edit" />
                        </a-button>
                        <a-popconfirm
                          placement="topLeft"
                          :title="$t('confirmDelete')"
                          :ok-text="$t('delete')"
                          :cancel-text="$t('cancel')"
                          @confirm="confirm('delete', item.id)"
                        >
                          <a-button class="table-action-btn delete">
                            <svgicon name="delete" />
                          </a-button>
                        </a-popconfirm>
                      </div>
                    </td>
                  </tr>
                </template>
              </CustomTable>

              <div>
                <CustomPagination
                  @onChangeLimit="onChangeLimit"
                  @paginate="paginate"
                  :limit="pagination.limit"
                  :count="count"
                  :page="pagination.page"
                />
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { yandexMap, ymapMarker } from "vue-yandex-maps";
export default {
  layout: "cabinet",
  middleware: "user",
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
      zoom: 12,

      pagination: {
        limit: 10,
        page: 1,
      },
    };
  },
  components: { yandexMap, ymapMarker },
  computed: {
    ...mapGetters("cabinet/user/display", [
      "myLocations",
      "locationList",
      "count",
    ]),
    list() {
      return this.myLocations;
    },
    params() {
      let params = {
        limit: this.pagination.limit || 10,
        offset:
          ((this.pagination.page || 1) - 1) * (this.pagination.limit || 10),
      };
      return params;
    },
  },
  methods: {
    ...mapActions("cabinet/user/display", [
      "getMylocations",
      "displayDelete",
      "getDisplayPagination",
    ]),
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

    paginate(arg) {
      this.pagination.page = arg;
      this.getData();
    },
    onChangeLimit(arg) {
      this.pagination.limit = arg;
      this.pagination.page = 1;
      this.getData();
    },

    // control

    async confirm(e, id) {
      if (e === "delete") {
        await this.displayDelete({ params: { id: id } });
        this.getData();
      } else if (e === "edit") {
        this.$router.push(
          this.localePath(`/cabinet/user/display/update/${id}`)
        );
      }
    },
    async getData() {
      await this.getDisplayPagination({ params: this.params });
      await this.getMylocations();
    },
  },
  mounted() {
    this.getData();
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
