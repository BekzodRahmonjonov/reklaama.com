<template>
  <div class="mobile-menu">
    <div class="container mobile-menu-container">
      <Sidebar v-if="hasUser" @sendPath="fetchPath" />
      <ul>
        <lang />
        <div class="user-cabinet">
          <a-button class="my-cabinet" @click="cabinet" v-if="!access && !role">
            {{ $t("personalCabinet") }}
          </a-button>
          <a-dropdown :trigger="['click']" v-else>
            <a
              class="ant-dropdown-link link"
              @click="(e) => e.preventDefault()"
            >
              <div class="my-cabinet">
                <img
                  class="user-image"
                  :src="`${baseUrlImg}${userInfo.profileImage}`"
                  alt="user image"
                />
                <span class="user-name">{{ userInfo.fullName }}</span>
              </div>
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="0" @click="cabinet">
                <div class="profile">
                  <svgicon name="menuLightProfile" />
                  {{ $t("personalCabinet") }}
                </div>
              </a-menu-item>
              <a-menu-item key="1" @click="logOut">
                <div class="profile">
                  <svgicon name="menuLightLogout" />
                  {{$t("logout")}}
                </div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <li @click="$emit('change', '/')">{{$t("main")}}</li>
        <li @click="$emit('change', '/#overview-map')">{{$t("constructorMap")}}</li>
        <li @click="$emit('change', '/about')">{{$t("about")}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      hasUser: null,
      access: "",
      role: "",
    };
  },
  computed: {
    ...mapGetters("cabinet/user/profile", ["userInfo"]),
    ...mapGetters("home", ["baseUrlImg"]),
  },
  methods: {
    ...mapActions("auth/login", ["logout"]),
    ...mapActions("cabinet/user/profile", ["getUser"]),

    cabinet() {
      const role = localStorage.getItem("role");
      this.hasUser = role;
      if (role == 1) {
        this.$router.push(this.localePath("/cabinet/admin/statistics"));
      } else if (role == 2) {
        this.$router.push(this.localePath("/cabinet/user/profile"));
      } else {
        this.$router.push(this.localePath("/auth/login"));
      }
    },
    fetchPath(path) {
      this.$emit("change", path);
    },
    async logOut() {
      await this.logout();
      this.$router.push(this.localePath("/"));

      this.access = localStorage.getItem("access");
      this.role = localStorage.getItem("role");
    },
    async getData() {
       await this.getUser();
    },
  },
  mounted() {
    this.$nextTick(() => {
        this.hasUser = localStorage.getItem("role");
        this.access = localStorage.getItem("access");
        this.role = localStorage.getItem("role");
        if (this.access && this.role) {
          this.getData();
        }
    });
  },
};
</script>

<style lang="scss" scoped></style>
