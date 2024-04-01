// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true,

        timeline: {
          enabled: true,
        },
    },
    nitro: {
        experimental: {
            websocket: true,
        },
    },
    runtimeConfig: {
        public: {
            baseUrl: process.env.BASE_URL,
        }
    },
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/supabase',
        ['@nuxtjs/eslint-module', { fix: true }],
        '@vueuse/nuxt',
        // '@nuxtjs/storybook'
    ],
    tailwindcss: {
        editorSupport: true
    },
    supabase: {
        redirectOptions: {
            login: '/',
            callback: '/',
            include: ['/courses/**/**', '/create'],
        },
    },
})
