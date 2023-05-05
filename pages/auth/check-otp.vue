<template>
  <div class="forgot__password">
    <div class="forgot__password-wrapper">
      <div class="forgot__password-wrapper-header">
        <nuxt-link :to="localePath('/')">
            <svgicon class="logoD" name="logo" />
          </nuxt-link>
        <LayoutsHeader/>
      </div>
      <div class="forgot__password-wrapper-body auth-body">
        <h2>{{$t("checkCode")}}</h2>
        <p>{{$t("sendCode")}}</p>
        <timer :run="runTimer" />
        <a-form-model class="forms" ref="form" :model="form" :rules="rules">
          <a-form-model-item class="forms-group" prop="otp">
            <a-input
              type="code"
              class="forms-group__input"
              v-model="form.otp"
              placeholder="_ _ _ _ _"
              v-mask="'#####'"
              @keypress.enter="onSubmit"
            ></a-input>
          </a-form-model-item>
        </a-form-model>
        <a-button v-if="!reset" :loading="loading" @click="onSubmit">
          {{$t("send")}}
        </a-button>
        <a-button v-else :loading="loadingResent" @click="resend">
          {{$t("resend")}}
        </a-button>
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
        otp: "",
        emailOrPassword: "",
      },
      resendForm: {
        why: "FORGET_PASSWORD",
        emailOrPhoneNumber: "",
      },
      rules: {
        otp: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
      },
      reset: false,
      loading: false,
      loadingResent: false,
      runTimer: false,

    };
  },
  computed: {},
  methods: {
    ...mapActions("auth", ["checkOtp", "resendOtp"]),
    async onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.form.emailOrPassword = localStorage.getItem("email");
          this.loading = true;
          this.runTimer = true;
          try {
            const { status } = await this.checkOtp(this.form);
            if (status) {
              const path = localStorage.getItem("path");
              localStorage.setItem("otp", this.form.otp);
              this.$router.push(this.localePath(path));
            } else {
              this.$message.error(this.$t("seeError"));
              this.loading = false;
              this.reset = true;
            }
          } catch (e) {
            if(e.error){
              this.$message.error(e.status);
            }
            this.loading = false;
            this.reset = true;
          }
          this.runTimer = false;

        }
      });
    },
    async resend() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.resendForm.emailOrPhoneNumber = localStorage.getItem("email");
          this.loadingResent = true;
          try {
            const { status } = await this.resendOtp(this.resendForm);

            this.loadingResent = false;
            this.reset = false;
            this.form.otp = "";
          } catch (e) {
            this.loadingResent = false;
            this.reset = false;
            this.form.otp = "";
          }
        }
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
