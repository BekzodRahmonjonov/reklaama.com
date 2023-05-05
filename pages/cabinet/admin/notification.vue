<template>
  <div class="cabinet-user admin-notification">
    <div class="container">
      <div class="cabinet-user-wrapper">
        <a-row type="flex" :gutter="[24, 24]">
          <a-col span="0" :md="{ span: 6 }">
            <div class="cabinet-user-wrapper-layout">
              <Sidebar />
            </div>
          </a-col>
          <a-col span="24" :md="{ span: 18 }">
            <div
              class="cabinet-user-wrapper notification"
              v-if="notificationList"
            >
              <a-button type="primary" class="get-file">
                <svgicon name="file-download" />
                <a
                  :href="`https://backend.reklaama.com/api/notification/export/excel/${access}`"
                  download
                  >Скачать документ</a
                >
              </a-button>
              <a-row type="flex" :gutter="[24, 24]">
                <a-col
                  span="24"
                  :xl="{ span: 18 }"
                  v-if="notificationList.length > 0"
                >
                  <div
                    class="notification-item"
                    v-for="item in notificationList"
                    :key="item.id"
                  >
                    <a-button class="icon">
                      <svgicon :name="activeCategory.icon" />
                    </a-button>
                    <div class="content">
                      <div class="notification-item-date">
                         <small>{{ $t("regCode") }}</small>
                        <nuxt-link
                          :to="localePath(`/marker-detail/${item.displayId}`)"
                          >{{ item.registrationCode }}</nuxt-link
                        >
                        <small class="mt-12">{{ $t("date") }}</small>
                        <strong>{{ item.date }}</strong>
                      </div>
                      <div class="notification-item-title">
                        <small>Construction type</small>
                        <strong>{{ item.construction_type }}</strong>
                        <small class="mt-12">Email or number</small>
                        <strong>{{ item.emailOrPhone }}</strong>
                      </div>
                      <div class="notification-item-title">
                        <small>Passport</small>
                        <div v-if="item.files && item.files.length > 0">
                          <a v-for="(item, index) in item.files" :key="index" :href="baseUrlImg + item">Download file {{index+1}}</a>
                        </div>
                        <strong v-else> Not available</strong>
                      </div>
                      <div
                        class="notification-item-status"
                        v-if="
                          item.notificationType == 'PERMISSIONS' &&
                          item.isConform == null
                        "
                      >
                        <a-button @click="handleConfirm(false, item.id)">
                          <svgicon name="exit" />
                        </a-button>
                        <a-button @click="handleConfirm(true, item.id)">
                          <svgicon name="check" />
                        </a-button>
                      </div>
                      <div v-else class="notification-item-expire">
                        <small>Data expiry</small>
                        <strong>{{ item.dateExpire }}</strong>
                      </div>
                    </div>
                  </div>
                </a-col>
                <a-col span="24" :xl="{ span: 18 }" v-else>
                  <a-empty class="empty" :description="false" />
                </a-col>
                <a-col span="24" :xl="{ span: 6 }">
                  <ul class="notification-list">
                    <li
                      v-for="item in categoryList"
                      :key="item.key"
                      @click="filterNotification(item.key)"
                    >
                      <svgicon :class="item.icon" :name="item.icon" />
                      <span>{{ item.title }}</span>
                      <small>{{ category[item.key].length }}</small>
                    </li>
                  </ul>
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
      notificationList: null,
      confirmId: null,
      access: null,

      category: {
        BOOKING_REQUESTS: [],
        EDITED: [],
        STATUS_CHANGER: [],
        PERMISSIONS: [],
        STATUS_EXPIRY: [],
        USERS: [],
      },
      activeCategory: { key: "PERMISSIONS", icon: "menuLightLocation" },

      categoryList: [
        {
          key: "PERMISSIONS",
          title: "Permissions",
          icon: "menuLightLocation",
        },
        {
          key: "STATUS_EXPIRY",
          title: "Status expiry",
          icon: "menuLightNotification",
        },
        {
          key: "STATUS_CHANGER",
          title: "Status changes",
          icon: "filter",
        },
        {
          key: "BOOKING_REQUESTS",
          title: "Booking requests",
          icon: "ticket",
        },
        {
          key: "EDITED",
          title: "Edited",
          icon: "edit",
        },
        {
          key: "USERS",
          title: "Users",
          icon: "menuLightProfile",
        },
      ],
    };
  },
  async mounted() {
    await this.fetchData();
    this.access = localStorage.getItem("access");
  },
  computed: {
    ...mapGetters("cabinet/admin", ["nList"]),
    ...mapGetters("home", ["baseUrlImg"]),
  },
  methods: {
    ...mapActions("cabinet/admin", ["getNotification", "updateConfirm"]),
    async fetchData() {
      await this.getNotification();
      this.notificationList = this.nList;
      this.filterCategory();
    },
    async handleConfirm(type, id) {
      const obj = {
        id: id,
        isConform: type,
      };
      const { status } = await this.updateConfirm(obj);
      if (status) {
        this.fetchData();
      }
    },
    filterCategory() {
      this.category = {
        BOOKING_REQUESTS: [],
        EDITED: [],
        STATUS_CHANGER: [],
        PERMISSIONS: [],
        STATUS_EXPIRY: [],
        USERS: [],
      };
      this.nList.map((item) => {
        this.category[item.notificationType] = [
          ...this.category[item.notificationType],
          item,
        ];
      });

      this.notificationList = this.category[this.activeCategory.key];
    },
    async filterNotification(type) {
      this.notificationList = await this.category[type];
      this.categoryList.map((item) => {
        if (item.key == type) {
          this.activeCategory.key = type;
          this.activeCategory.icon = item.icon;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
