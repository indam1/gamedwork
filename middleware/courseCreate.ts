export default defineNuxtRouteMiddleware(async (to) => {
    const {fetchCourseData} = useSupabaseFetching()
    const user = useSupabaseUser()
    if (!user) {
        return abortNavigation('Not authorized')
    }

    const course = await fetchCourseData(to.params.id)
    if (user.value?.id && course?.user_id !== user.value?.id) {
        return abortNavigation('Forbidden')
    }

    if (!course?.id) {
        return abortNavigation('Not found')
    }
})
