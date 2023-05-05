<template>
  <div class="forgot__password">
    <div class="forgot__password-wrapper">
      <div class="forgot__password-wrapper-header">
        <nuxt-link :to="localePath('/')">
          <svgicon class="logoD" name="logo" />
        </nuxt-link>
        <LayoutsHeader />
      </div>
      <div class="forgot__password-wrapper-body auth-body">
        <h2>{{ $t("checkCode") }}</h2>
        <p>{{ $t("sendCode") }}</p>
        <timer :run="runTimer" />
        <a-form-model class="forms" ref="form">
          <a-form-model-item class="forms-group" prop="code">
            <a-input
              type="code"
              class="forms-group__input"
              v-model="form.code"
              placeholder="_ _ _ _ _"
              v-mask="'#####'"
              @keypress.enter="onSubmit"
            ></a-input>
          </a-form-model-item>
        </a-form-model>
        <a-button @click="onSubmit" :loading="loading">
          {{ $t("send") }}</a-button
        >
      </div>
      <div class="forgot__password-wrapper-footer">
        <small>{{ $t("copyright") }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  layout: "auth",
  data() {
    return {
      form: {
        code: "",
      },
      loading: false,
      runTimer: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions("auth", ["checkStatus"]),
    async onSubmit() {
      this.loading = true;
      this.runTimer = true;
      try {
        const { status } = await this.checkStatus({ params: this.form });

        if (status && status.data) {
          this.runTimer = false;

          const path = localStorage.getItem("path");
          this.$router.push(this.localePath(path));
        } else {
          this.$message.error(status);
          this.loading = false;
        }
      } catch (e) {
        this.runTimer = false;
        console.error(e);
        if (e.error) {
          this.$message.error(e.status);
        }
        this.loading = false;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
