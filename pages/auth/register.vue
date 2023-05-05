<template>
  <div class="register">
    <div class="register-wrapper">
      <div class="register-wrapper-right">
        <div class="my-image">
          <img
            class="register__img"
            src="~assets/images/register.png"
            alt="register"
          />
        </div>
      </div>
      <div class="register-wrapper-left">
        <div class="register-wrapper-left-header">
          <nuxt-link :to="localePath('/')">
            <svgicon class="logoD" name="logo" />
          </nuxt-link>
          <LayoutsHeader />
        </div>
        <div class="register-wrapper-left-body auth-body">
          <a-form-model class="forms" ref="form" :model="form" :rules="rules">
            <a-form-model-item class="forms-group" prop="fullName">
              <a-input
                class="forms-group__input"
                v-model="form.fullName"
                :placeholder="$t('fullname')"
              ></a-input>
            </a-form-model-item>
            <a-form-model-item class="forms-group" prop="email">
              <a-input
                type="email"
                class="forms-group__input"
                v-model="form.email"
                :placeholder="$t('email')"
              ></a-input>
            </a-form-model-item>
            <a-form-model-item class="forms-group" prop="phone">
              <a-input
                class="forms-group__input"
                v-model="form.phone"
                v-mask="'+998 (##) ### ## ##'"
                :placeholder="$t('phoneNumber')"
              ></a-input>
            </a-form-model-item>
            <a-form-model-item class="forms-group" prop="password">
              <a-input-password
                v-model="form.password"
                class="forms-group__input"
                :placeholder="$t('password')"
              />
            </a-form-model-item>
            <a-form-model-item class="forms-group" prop="repeatPassword">
              <a-input-password
                v-model="form.repeatPassword"
                class="forms-group__input"
                :placeholder="$t('resetPassword')"
              />
            </a-form-model-item>
          </a-form-model>
          <a-button @click="postData" :loading="loading">{{
            $t("registerBtn")
          }}</a-button>
          <p class="register">
            {{ $t("haveNotAccount") }}
            <nuxt-link :to="localePath('/auth/login')">{{ $t("loginBtn") }}</nuxt-link>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      form: {
        fullName: "",
        email: "",
        phone: "",
        password: "",
        repeatPassword: "",
        companyName: "",
        profileImage: "",
      },
      rules: {
        fullName: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        email: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        phone: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        password: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        repeatPassword: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        companyName: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
      },
      loading: false,
    };
  },
  methods: {
    async postData() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const { status, error } = await this.$axios.post(
              `auth/register`,
              this.form
            );
            if (status) {
              localStorage.setItem("path", "/auth/login");
              this.$router.push(this.localePath("/auth/otp"));
            }
            this.loading = false;
          } catch ({ response }) {
            this.loading = false;
            this.$message.error(response.data.friendlyMessage);
          }
        } 
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
