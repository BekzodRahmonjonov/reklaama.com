<template>
  <div class="setting">
    <div class="setting-lang">
      <svgicon class="mode" @click="onChangeTheme" name="sun" />
      <a-dropdown
        placement="bottomLeft"
        overlayClassName="setting-lang-list"
        :trigger="['click']"
      >
        <a-button class="setting-lang-list-btn">
          <img :src="selected.flag" :alt="selected.title" />
          <span>{{ selected.title }}</span>
        </a-button>
        <ul slot="overlay" class="lang-dropdown">
          <li v-for="lang in langs" :key="lang.title" @click="chooseLang(lang.value)">
            <nuxt-link
              :to="switchLocalePath(lang.value)"
            >
              <img :src="lang.flag" :alt="lang.title" />
              <span>{{ lang.title }}</span>
            </nuxt-link>
          </li>
        </ul>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allLangs: {
        uz: {
          title: "O'zb",
          value: "uz",
          flag: require("~/assets/images/uz.png"),
        },
        oz: {
          title: "Ўзб",
          value: "oz",
          flag: require("~/assets/images/uz.png"),
        },
        ru: {
          title: "Ру",
          value: "ru",
          flag: require("~/assets/images/ru.png"),
        },
        en: {
          title: "En",
          value: "en",
          flag: require("~/assets/images/en.png"),
        },
      },
      langs: {},
      selected: {},
    };
  },
  methods: {
    chooseLang(lang) {
      this.$i18n.setLocale(lang);
      this.selected = this.allLangs[lang + ""];
      this.langs = { ...this.allLangs };
      delete this.langs[lang + ""];
    },
    onChangeTheme() {
      var theme = localStorage.getItem('mode');
      theme = theme == "light" ? "dark" : "light"; 

      localStorage.setItem("mode", theme);
      if (theme == "light") {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
      } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
      }
    },
  },
  mounted() {
    this.selected = this.allLangs[this.$i18n.locale];
    this.langs = { ...this.allLangs };
    delete this.langs[this.$i18n.locale];

    this.theme = localStorage.getItem("mode") || "light";
    document.body.classList.add(this.theme);
    
    if(window.innerWidth <= 768){
      this.allLangs = {
        uz: {
          title: "O'zbek",
          value: "uz",
          flag: require("~/assets/images/uz.png"),
        },
        oz: {
          title: "Ўзбeк",
          value: "oz",
          flag: require("~/assets/images/uz.png"),
        },
        ru: {
          title: "Руский",
          value: "ru",
          flag: require("~/assets/images/ru.png"),
        },
        en: {
          title: "English",
          value: "en",
          flag: require("~/assets/images/en.png"),
        },
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
