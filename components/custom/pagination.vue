<template>
    <div class="pagination" v-if="count">
      <ul>
        <button :disabled="!currentPage || currentPage == 1" @click="prev" class="left">
          <svgicon name="angle-right" />
        </button>
        <template v-for="item in allPages" class="pagination-btn">
          <li
            :key="item"
            @click="clickBtn(item)"
            :disabled="currentPage == item"
            :class="{ active: currentPage == item }"
            v-if="
              item == 1 ||
              item == allPages ||
              (+currentPage - 1 <= item && +currentPage + 1 >= item)
            "
          >
            {{ item }}
          </li>
          <li
            :key="item + '1'"
            v-else-if="
              (currentPage + 1 < item && currentPage + 2 >= item) ||
              (currentPage - 1 > item && currentPage - 2 <= item)
            "
          >
            ...
          </li>
        </template>
        <button :disabled="!currentPage || currentPage >= allPages" @click="next" class="right">
          <svgicon name="angle-right" />
        </button>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      count: {
        type: [String, Number],
        default() {
          return 1;
        },
      },
      limit: {
        type: [String, Number],
        default() {
          return 1;
        },
      },
      page: {
        type: [String, Number],
        default() {
          return 1;
        },
      },
      countLimit: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        currentPage: 1,
        limits: ["10", "15", "20"],
        currentLimit: "6",
      };
    },
    computed: {
      allPages() {
        return Math.ceil(this.count / this.limit);
      },
    },
    mounted() {
      this.currentPage = this.page;
      this.currentLimit = this.limit + "";
    },
    methods: {
      changeLimit(val) {
        this.currentLimit = val;
        this.$emit("onChangeLimit", this.currentLimit);
        this.currentPage = 1;
      },
      next() {
        this.currentPage++;
        this.currentPage <= this.allPages &&
          this.$emit("paginate", this.currentPage);
      },
      prev() {
        this.currentPage--;
        this.currentPage <= this.allPages &&
          this.$emit("paginate", this.currentPage);
      },
      clickBtn(arg) {
        if (arg <= this.allPages) {
          this.currentPage = arg;
          this.$emit("paginate", arg);
        }
      },
    },
  };
  </script>
  
  <style>
  
  </style>
  