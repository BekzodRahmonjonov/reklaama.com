<template>
  <div id="countdown">
    <div id="countdown-number">{{ limit }}</div>
    <svg :class="{ go: run }">
      <circle
        :stroke-dashoffset="Math.floor(113*(1 - limit/60)) + 'px'"
        r="18"
        cx="20"
        cy="20"
      ></circle>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    run: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      limit: 60,
    };
  },
  watch: {
    run() {
      if (this.run) {
        this.startTimer();
      } else {
        this.limit = 60;
      }
    },
  },
  methods: {
    startTimer() {
      let self = this;
      const myTime = setInterval(function () {
        self.limit--;
        if (self.limit == 0 || !self.run) {
          clearInterval(myTime);
          self.limit = 60;
        } else {
          self.limit--;
        }
      }, 1000);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
