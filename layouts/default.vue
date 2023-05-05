<template>
  <div class="wrapper">
    <div v-if="!loading">
      <LayoutsHeader />
      <perfect-scrollbar>
        <Nuxt />
        <LayoutsFooter />
      </perfect-scrollbar>
    </div>
    <loaderHome v-else-if="loading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters("home", ["list"]),
    myList() {
      let path = this.$route.path;
      if (path == "/" || path.length == 3) {
        return this.list;
      } else {
        return [];
      }
    },
  },
  methods: {
    ...mapActions("home", ["getDisplays"]),
    async getData() {
      this.loading = true;
      let filter_keys = localStorage.getItem("filter_keys");
      await this.getDisplays({ params: JSON.parse(filter_keys) });
      this.loading = false;
    },  
  },
  mounted() {
    this.getData();
  },
};
</script>

<style></style>
