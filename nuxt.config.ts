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
        '@nuxtjs/supabase',
        ['@nuxtjs/eslint-module', { fix: true }],
        '@vueuse/nuxt',
        '@nuxt/ui',
        // '@nuxt/image',
        // '@nuxtjs/storybook'
    ],
    supabase: {
        redirectOptions: {
            login: '/',
            callback: '/',
            include: ['/courses/**/**', '/create'],
        },
    },
    app: {
        head: {
            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap' },
            ],
        }
    }
})
