<template>
  <div class="cabinet-user profile">
    <div class="container">
      <div class="cabinet-user-wrapper">
        <div class="cabinet-user-wrapper-header">
          <h2>{{$t("personalCabinet")}}</h2>
        </div>
        <a-row type="flex" :gutter="[24, 24]">
          <a-col span="0" :md="{ span: 6 }">
            <div class="cabinet-user-wrapper-layout">
              <Sidebar />
            </div>
          </a-col>
          <a-col span="24" :md="{ span: 18 }">
            <div class="cabinet-user-wrapper-main">
              <a-form-model
                class="forms profile-forms"
                ref="form"
                :model="form"
                :rules="rules"
              >
                <div class="upload">
                  <FormUploadAvatar
                    msg=""
                    icon="menuLightProfile"
                    :url="form.profileImage"
                    @change="avatarchange"
                  />
                  <span>{{$t("uploadPhoto")}}</span>
                </div>
                <a-form-model-item class="forms-group" prop="fullName">
                  <a-input
                    class="forms-group__input"
                    v-model="form.fullName"
                    :disabled="activeInput != 1"
                    :auto-focus="activeInput == 1"
                    :placeholder="$t('fullname')"
                  ></a-input>
                  <a-button class="edit-btn">
                    <svgicon name="edit" @click="editDetail(1)"></svgicon>
                  </a-button>
                </a-form-model-item>
                <a-form-model-item class="forms-group" prop="email">
                  <a-input
                    class="forms-group__input"
                    v-model="form.email"
                    :disabled="activeInput != 2"
                    :auto-focus="activeInput == 2"
                    :placeholder="$t('email') "
                  ></a-input>
                  <a-button class="edit-btn">
                    <svgicon name="edit" @click="editDetail(2)"></svgicon>
                  </a-button>
                </a-form-model-item>
                <a-form-model-item class="forms-group" prop="phoneNumber">
                  <a-input
                    class="forms-group__input"
                    v-model="form.phoneNumber"
                    :disabled="activeInput != 3"
                    :auto-focus="activeInput == 3"
                    :placeholder="$t('phoneNumber')"
                    v-mask="'+998 (##) ### ## ##'"
                  />
                  <a-button class="edit-btn">
                    <svgicon name="edit" @click="editDetail(3)"></svgicon>
                  </a-button>
                </a-form-model-item>
                <a-button class="update" :loading="pending" @click="update"
                  >{{$t("update")}}</a-button
                >
              </a-form-model>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "cabinet",
  middleware: "user",
  data() {
    return {
      form: {
        fullName: "",
        email: "",
        phoneNumber: "",
        profileImage: "",
      },
      rules: {
        fullName: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        email: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        phoneNumber: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
      },
      pending: false,
      activeInput: null,
    };
  },
  computed: {
    ...mapGetters("cabinet/user/profile", ["userInfo"]),
    ...mapGetters("cabinet/user/display", ["file"]),
  },
  methods: {
    ...mapActions("cabinet/user/profile", ["getUser", "updateUserDetail"]),
    ...mapActions("cabinet/user/display", ["getFile"]),
    editDetail(item) {
      this.activeInput = item;
    },
    update() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.form.profileImage = this.file;
          this.pending = true;
          this.activeInput = null;
          try {
            let { status, error } = await this.updateUserDetail(this.form);
            if (status) {
              this.$message.success(this.$t("updateSuccess"));
              this.pending = false;
              this.getData();
            } else {
              this.$message.error(this.$t("seeError"));
              this.pending = false;
            }
          } catch (e) {
            this.pending = false;
            this.$message.error(this.$t("seeError"));
          }
        } 
      });
    },
    async avatarchange(file) {
      const f = new FormData();
      f.append("file", file.originFileObj);
      await this.getFile(f);
    },
    async getData() {
      await this.getUser();
      Object.keys(this.form).forEach((k) => {
        this.form[k] = this.userInfo[k];
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped></style>
