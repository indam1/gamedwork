import { plugin as SlickSort } from 'vue-slicksort'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(SlickSort)
})
