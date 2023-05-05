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
        <h2>{{ $t("forgotPassword") }}</h2>
        <p>{{$t("numberToReceive")}}</p>
        <a-form-model class="forms" ref="form" :model="form" :rules="rules">
          <a-form-model-item class="forms-group" prop="emailOrPhoneNumber">
            <a-input
              class="forms-group__input"
              v-model="form.emailOrPhoneNumber"
              :placeholder="$t('phoneNumber')"
              @keypress.enter="forgotPassword"
            ></a-input>
          </a-form-model-item>
        </a-form-model>
        <a-button :loading="loading" @click="forgotPassword"> {{$t("send")}}</a-button>
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
        emailOrPhoneNumber: "",
      },
      rules: {
        emailOrPhoneNumber: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions("auth", ["forgetPassword"]),
    async forgotPassword() {
      localStorage.setItem("access", "");
      localStorage.setItem("refresh", "");
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            let { status, error } = await this.forgetPassword(this.form);
            if (status) {
              localStorage.setItem("email", this.form.emailOrPhoneNumber);
              localStorage.setItem("path", "/auth/reset-password");
              this.$router.push(this.localePath("/auth/check-otp"));
            } else {
              this.$message.error(this.$t("seeError"));
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
