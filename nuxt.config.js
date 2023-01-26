export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',
  loading: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Parking-system-management',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Mulish:300,400,500,600,700|Roboto:300,400,500,600,700|Material+Icons',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/plugins.scss', '~/assets/css/style.vue.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-inline-svg',
    '~/plugins/vue2-perfect-scrollbar',
    '~/plugins/vee-validate',
    '~/plugins/bootstrap-notify',
    '~/plugins/axios',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    '~/components/layout',
    '~/components/layout/header',
    '~/components/layout/extras',
    '~/components/layout/extras/dropdown',
    '~/components/layout/extras/offcanvas',
    '~/components/layout/aside',
    '~/components/layout/brand',
    '~/components/features',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  env: {
    baseUrl: process.env.BASE_URL,
    imageHost: process.env.IMAGE_HOST,
    webUrl: process.env.WEB_URL,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL,
  },

  auth: {
    plugins: ['~/plugins/auth.js'],
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: '',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/users/me', method: 'get' },
        },
      },
    },
  },

  router: {
    middleware: ['auth', 'check-permission', 'breadcrumbs'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map'
      }
    },
  },
}
