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
        <h2>{{$t("resetPassword")}}</h2>
        <p>{{$t("resetPasswordTitle")}}</p>
        <a-form-model class="forms" ref="form" :model="form" :rules="rules">
          <a-form-model-item class="forms-group" prop="password">
            <a-input-password
              v-model="form.password"
              class="forms-group__input"
              @keypress.enter="resetPassword"
              :placeholder="$t('newPassword')"
            />
          </a-form-model-item>
          <a-form-model-item class="forms-group" prop="conformPassword">
            <a-input-password
              v-model="form.conformPassword"
              class="forms-group__input"
              @keypress.enter="resetPassword"
              :placeholder="$t('resetPassword')"
            />
          </a-form-model-item>
        </a-form-model>
        <a-button :loading="loading" @click="resetPassword"> {{$t("send")}} </a-button>
      </div>
      <div class="forgot__password-wrapper-footer">
        <small>{{$t("copyright")}}</small>
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
        email: "",
        password: "",
        conformPassword: "",
      },
      rules: {
        password: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        conformPassword: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions("auth", ["updatePassword"]),
    resetPassword() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          this.form.email = localStorage.getItem("email");
          this.form.otp = localStorage.getItem("otp");

          localStorage.removeItem("otp");
          try {
            let { status, error } = await this.updatePassword(this.form);
            if (status) {
              this.$router.push(this.localePath("/auth/login"));
            } else {
              this.loading = false;
            }
          } catch (e) {
            this.loading = false;
            if (e.error) {
              this.$message.error(e.status);
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
