export function tempCachedData(key: string, cacheSeconds: number) {
    const nuxtApp = tryUseNuxtApp()
    if (!nuxtApp) {
        return
    }

    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (!data) {
        return
    }

    const expirationDate = new Date(data.fetchedAt)
    if (expirationDate.getTime() + cacheSeconds * 1000 < Date.now()) {
        return
    }

    return data
}
