<template>
  <a-upload-dragger
    class="ant-my-upload"
    name="file"
    @change="handleChange"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    :accept="accept"
  >
    <svgicon :name="icon" />
    <span v-if="fileName">{{ fileName }}</span>
    <span v-else>{{ title }}</span>
  </a-upload-dragger>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    accept: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      fileName: "",
    };
  },
  methods: {
    handleChange(info) {
      if (info.event) {
        if (info.file.name != this.fileName) {
          this.fileName = info.file.name;
          this.$emit("change", info.file);
        } else {
          this.$emit("change", null);
        }
      }
    },
    beforeUpload(file) {
      let isJpgOrPng;
      if (this.icon == "photo") {
        isJpgOrPng =
          file.type == "image/png" ||
          file.type == "image/jpg" ||
          file.type == "image/jpeg";
        if (!isJpgOrPng) {
          this.$message.error(this.$t("imageInfo"));
        }
      }

      return isJpgOrPng;
    },
  },
};
</script>

<style></style>
