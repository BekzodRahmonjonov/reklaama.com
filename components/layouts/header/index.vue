<template>
  <div class="header-init">
    <div class="header">
      <div class="container">
        <div class="header-wrapper">
          <nuxt-link :to="localePath('/')">
            <svgicon class="logo" name="logo" />
          </nuxt-link>
          <LayoutsHeaderMenu v-if="windowWidth >= 768" />
          <svgicon v-if="windowWidth < 768" :name="icon" @click="changeIcon" />
          <LayoutsHeaderMenuMobile
            @change="onChange"
            :class="icon"
            v-if="windowWidth < 768"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: 1920,
      icon: "banner",
      mode: "light"
    };
  },
  
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.onResize();
    this.mode = localStorage.getItem("mode")
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    changeIcon() {
      this.icon = this.icon === "banner" ? "exit" : "banner";
    },
    onChange(path) {
      this.icon = "banner";
      this.$router.push(this.localePath(path));
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>

<style lang="scss" scoped></style>
