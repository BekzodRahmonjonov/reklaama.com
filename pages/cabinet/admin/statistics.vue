<template>
  <div class="cabinet-user statistics">
    <div class="container">
      <div class="cabinet-user-wrapper">
        <a-row type="flex" :gutter="[24, 24]">
          <a-col span="0" :md="{ span: 6 }">
            <div class="cabinet-user-wrapper-layout">
              <Sidebar />
            </div>
          </a-col>
          <a-col span="24" :md="{ span: 18 }">
            <div class="statistics-main" v-if="list">
              <a-button type="primary" class="get-file">
                <svgicon name="file-download" />
                <a :href="`https://backend.reklaama.com/api/display/export/excel/${access}`" download>Скачать документ</a>
              </a-button>
              <a-row type="flex" :gutter="[18, 24]">
                <a-col span="24" :md="{ span: 12 }">
                  <div class="statistics-main-card">
                    <div class="statistics-main-card-header">
                      <svgicon name="see" />
                      <small>Most Viewed</small>
                    </div>
                    <div
                      class="statistics-main-card-item"
                      v-for="item in list && list.mostView"
                      :key="item.id"
                    >
                      <a-button>
                        <nuxt-link
                          :to="localePath(`/marker-detail/${item.id}`)"
                          >{{ item.registrationCode }}</nuxt-link
                        >
                      </a-button>
                      <span>{{ item.seeCount }}</span>
                    </div>
                  </div>
                </a-col>
                <a-col span="24" :md="{ span: 12 }">
                  <div class="statistics-main-card">
                    <div class="statistics-main-card-header">
                      <svgicon name="see" />
                      <small>Most Booked</small>
                    </div>
                    <div
                      class="statistics-main-card-item"
                      v-for="item in list && list.mostBooked"
                      :key="item.id"
                    >
                      <a-button>
                        <nuxt-link
                          :to="localePath(`/marker-detail/${item.id}`)"
                          >{{ item.registrationCode }}</nuxt-link
                        >
                      </a-button>
                      <span>{{ item.booked }}</span>
                    </div>
                  </div>
                </a-col>
                <a-col span="24">
                  <div class="statistics-main-card">
                    <div class="statistics-main-card-header">
                      <svgicon name="see" />
                      <small>Area</small>
                    </div>
                    <div
                      class="statistics-main-card-item"
                      v-for="item in list && list.mostArea"
                      :key="item.id"
                    >
                      <a-button>
                        <nuxt-link
                          :to="localePath(`/marker-detail/${item.id}`)"
                          >{{ item.city }}</nuxt-link
                        >
                      </a-button>
                      <span>{{ item.seeCount }}</span>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </div>
            <loader v-else />
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  layout: "cabinet",
  middleware: "admin",
  data() {
    return {
      access: null,
    };
  },
  computed: {
    ...mapGetters("cabinet/admin", ["list"]),
  },
  methods: {
    ...mapActions("cabinet/admin", ["getStatistics"]),

    async getData() {
      await this.getStatistics();
    },
  },
  mounted() {
    this.getData();
    this.access = localStorage.getItem('access');
  },
};
</script>

<style lang="scss" scoped></style>
