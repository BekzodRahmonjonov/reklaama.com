<template>
  <ul class="sidebar">
    <li
      v-for="(item, index) in menuList"
      :key="index"
      @click="$emit('sendPath', item.path)"
    >
      <nuxt-link class="nuxt-link" :to="localePath(item.path)">
        <svgicon class="ligh-icon" :name="item.lightIcon"></svgicon>
        <svgicon class="dark-icon" :name="item.darkIcon"></svgicon>
        <span>{{ item.title[$i18n.locale] }}</span>
        <div v-if="un_seen && un_seen.length > 0">
          <small v-if="item.type">{{ un_seen.length }}</small>
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      un_seen: null,
    };
  },
  computed: {
    ...mapGetters("cabinet/menu", ["menu"]),
    menuList() {
      if (typeof window !== "undefined") {
        const role = localStorage.getItem("role");
        return this.menu[role];
      }
    },
  },
  methods: {
    ...mapActions("cabinet/user/notification", ["unSeen"]),
    ...mapActions("cabinet/admin", ["getUnSeenAdmin"]),
    async getUnSeen() {
      const { data } = this.$route.path.includes("user")
        ? await this.unSeen()
        : await this.getUnSeenAdmin();
      this.un_seen = data;

    },
  },
  mounted() {
    this.getUnSeen();
  },
};
</script>

<style lang="scss" scoped></style>
