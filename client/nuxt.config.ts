export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',

  modules: ['@nuxt/fonts', '@nuxt/eslint', '@nuxt/test-utils/module'],

  css: ['~/assets/scss/main.scss'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'description', content: 'Explore games, ratings and reviews from the Merkle Games API.' }],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000',
    },
  },

  fonts: {
    families: [{ name: 'Nunito', provider: 'google', weights: [400, 700], styles: ['normal'], subsets: ['latin'] }],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables" as *;\n@use "~/assets/scss/mixins" as *;\n',
        },
      },
    },
  },
})
