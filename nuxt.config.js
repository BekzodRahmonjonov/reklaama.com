import messages from "./locale";
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Reklaama",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "keywords", content: "reklaama, billboards" },
      {
        hid: "description",
        name: "description",
        content:
          "Данная платформа является картой конструкций наружной рекламы Ташкента, с помощью которой Вы имеете возможность подобрать самые оптимальные, на Ваш взгляд, локации для размещения Вашей рекламы.",
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Данная платформа является картой конструкций наружной рекламы Ташкента, с помощью которой Вы имеете возможность подобрать самые оптимальные, на Ваш взгляд, локации для размещения Вашей рекламы.",
      },
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: "Reklaama",
      },
      {
        hid: "og:type",
        name: "og:type",
        content: "website",
      },
      { name: "image", content: "/banner.png" },
      { name: "og:image", content: "/banner.png" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/category.svg" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "ant-design-vue/dist/antd.css",
    "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css",
    "swiper/css/swiper.min.css",
    "aos/dist/aos.css",
    "~/assets/scss/main.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/antd-ui",
    "@/plugins/axios",
    { src: '~/plugins/y-maps.js',  mode: 'client' },
    {
      src: "@/plugins/v-mask",
      ssr: false,
    },
    {
      src: "~/plugins/aos.js",
      ssr: false,
    },
    "@/plugins/perfect-scrollbar.js",
    {
      src: "@/plugins/VueAwesomeSwiper.js",
      ssr: false,
    },
  ],

  // i18n
  i18n: {
    locales: [
      {
        code: "uz",
        name: "O'zbek",
      },
      {
        code: "oz",
        name: "Ўзбек",
      },
      {
        code: "ru",
        name: "Русский",
      },
      {
        code: "en",
        name: "English",
      },
    ],
    // strategy: "prefix_except_default",
    defaultLocale: "ru",
    vueI18n: {
      fallBackLocale: "ru",
      messages,
    },
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/google-analytics"],
  googleAnalytics: {
    id: "UA-257209230-1",
  },
  router: {
    middleware: ["auth"],
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: "UA-257209230-1",
    },
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/svg",
    "nuxt-i18n",
    "@nuxtjs/axios",
  ],
  serverMiddleware: [],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
