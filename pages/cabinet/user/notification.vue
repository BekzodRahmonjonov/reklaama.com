<template>
  <div class="cabinet-user user-notification">
    <div class="container">
      <div class="cabinet-user-wrapper">
        <div class="cabinet-user-wrapper-header">
          <h2>{{ $t("personalCabinet") }}</h2>
        </div>
        <a-row type="flex" :gutter="[24, 24]">
          <a-col span="0" :md="{ span: 6 }">
            <div class="cabinet-user-wrapper-layout">
              <Sidebar />
            </div>
          </a-col>
          <a-col span="24" :md="{ span: 18 }">
            <div class="notification" v-if="notificationList">
              <a-row type="flex" :gutter="[24, 24]">
                <a-col span="24" v-if="notificationList.length > 0">
                  <div
                    class="notification-item"
                    v-for="item in notificationList"
                    :key="item.id"
                  >
                    <a-button
                      class="icon"
                      :class="types.find(e => e.type == item.type).iconType"
                    >
                      <svgicon :name="types.find(e => e.type == item.type).icon" />
                    </a-button>
                    <div class="content">
                      <div class="notification-item-date">
                        <small>{{ $t("regCode") }}</small>
                        <nuxt-link
                        v-if="item.type !== 'CANCEL'"
                          :to="localePath(`/marker-detail/${item.displayId}`)"
                          >{{ item.code }}</nuxt-link
                        >
                        <strong v-else>{{item.code}}</strong>
                      </div>
                      <div class="notification-item-title">
                        <small>{{ $t("date") }}</small>
                        <strong>{{ item.date || "00.00.0000" }}</strong>
                      </div>
                      <div class="notification-item-description">
                        <small>{{ $t("description") }}</small>
                        <strong>{{ item.message }}</strong>
                      </div>
                    </div>
                  </div>
                </a-col>
                <a-empty v-else class="empty" :description="false" />
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
  middleware: "user",
  data() {
    return {
      notificationList: null,
      types: [
        {
          type: "NEW",
          icon: "menuDarkNotification",
          iconType: "fill",
        },
        {
          type: "CANCEL",
          icon: "exit",
          iconType: "fill",
        },
        {
        type: 'CONFIRM',
        icon: "check",
        iconType: "fill",
      },
      {
        type: 'UNSAVED',
        icon: "ticket",
        iconType: "stroke",
      },
      {
        type: 'BOOKED',
        icon: "ticket",
        iconType: "stroke",
      },
      {
        type: 'SAVED',
        icon: "bookmark",
        iconType: "stroke",
      },
      ],
    };
  },
  computed: {
    ...mapGetters("cabinet/user/notification", ["list"]),
  },
  methods: {
    ...mapActions("cabinet/user/notification", ["getNotification"]),

    async getData() {
      await this.getNotification();
      this.notificationList = this.list
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped></style>
