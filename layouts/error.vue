<template>
  <div class="error">
    <div class="container">
      <div class="error-wrapper">
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>
          <nuxt-link :to="localePath('/')">
            <img
              class="error-image"
              src="https://img.freepik.com/premium-vector/404-error-page-found-banner-with-cable-socket-cord-plug-website-blue_249405-130.jpg?w=2000"
              alt="error"
            />
          </nuxt-link>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  layout: "default",
  props: {
    error: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.error-image {
  width: 100%;
  height: 600px;
  object-fit: cover;
}
</style>
