<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-wrapper-left">
        <div class="login-wrapper-left-header">
          <nuxt-link :to="localePath('/')">
            <svgicon class="logoD" name="logo" />
          </nuxt-link>
          <LayoutsHeader/>
        </div>
        <div class="login-wrapper-left-body auth-body">
          <a-form-model class="forms" ref="form" :model="form" :rules="rules">
            <a-form-model-item class="forms-group" prop="emailORPhone">
              <a-input
                class="forms-group__input"
                v-model="form.emailORPhone"
                @keypress.enter="signIn"
                :placeholder="$t('phoneNumber')"
              ></a-input>
            </a-form-model-item>
            <a-form-model-item class="forms-group" prop="password">
              <a-input-password
                v-model="form.password"
                @keypress.enter="signIn"
                class="forms-group__input"
                :placeholder="$t('password')"
              />
            </a-form-model-item>
          </a-form-model>
          <span class="forgot-password"
            ><nuxt-link :to="localePath('/auth/forgot-password')"
              >{{$t("forgotPassword")}}</nuxt-link
            ></span
          >
          <a-button @click="signIn" :loading="pending">{{ $t("loginBtn") }}</a-button>
          <p class="register">
            {{ $t("haveAccount") }}
            <nuxt-link :to="localePath('/auth/register')">{{ $t("register") }}</nuxt-link>
          </p>
        </div>
        <div class="login-wrapper-left-footer">
          <small>{{ $t("copyright") }}</small>
        </div>
      </div>
      <div class="login-wrapper-right">
        <img class="login__img" src="~assets/images/login.png" alt="login" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  layout: "auth",
  data() {
    return {
      form: {
        emailORPhone: "",
        password: "",
      },
      rules: {
        emailORPhone: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        password: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
      },
      roles: {
        1: {
          path: "/cabinet/admin/statistics",
        },
        2: {
          path: "/cabinet/user/profile",
        },
      },
      pending: false,
      userError: "",
    };
  },
  computed: {
    ...mapGetters("auth/login", ["role"]),
  },
  methods: {
    ...mapActions("auth/login", ["login"]),
    async signIn() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.pending = true;
          try {
            this.userError = "";
            let { status, error } = await this.login(this.form);
            if (status == 200) {
              this.userError = "";
              this.pending = false;
              const path = this.roles[this.role] && this.roles[this.role].path;
              this.$router.push(this.localePath(path));
            }
          } catch (e) {
            this.pending = false;
            if (e.error) {
              this.userError = e.status || this.$t("networkError");
              this.$message.error(this.userError);
            }
          }
        }
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
