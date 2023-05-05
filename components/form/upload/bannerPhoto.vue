<template>
    <a-upload
      name="avatar"
      list-type="picture-card"
      class="banner-uploader"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else class="banner-uploader-click">
        <svgicon :name="icon" />
        <span class="msg">{{ msg }}</span>
      </div>
    </a-upload>
  </template>
  <script>
  import { mapGetters } from 'vuex';
  
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  export default {
    props: {
      url: {
        type: String,
        default: "",
      },
      icon: {
        type: String,
        default: "document",
      },
      msg: {
        type: String,
        default: "Photo",
      },
    },
    data() {
      return {
        loading: false,
        imageUrl: "",
      };
    },
    watch: {
      url(value) {
        this.imageUrl = `${this.baseUrlImg}${value}`;
      },
    },
    computed: {
      ...mapGetters("home", ["baseUrlImg"]),
    },
    methods: {
      handleChange(info) {
        if (info.file.status === "uploading") {
          this.loading = true;
          return;
        }
        if (info.file.status === "done") {
          getBase64(info.file.originFileObj, (imageUrl) => {
            this.imageUrl = imageUrl;
            this.loading = false;
            this.$emit("getPhoto", this.imageUrl);
          });
          this.$emit("change", true);
        }
      },
      beforeUpload(file) {
        const isJpgOrPng =
          file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
          this.$message.error(this.$t('imageInfo'));
        }
        return isJpgOrPng;
      },
    },
  };
  </script>
  <style></style>
  