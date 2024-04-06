export default defineNuxtRouteMiddleware(async (to) => {
    const {fetchCourseData} = useSupabaseFetching()
    const user = useSupabaseUser()
    if (!user) {
        return abortNavigation('Not authorized')
    }

    const courseId = Array.isArray(to.params.id) ? to.params.id[0] : to.params.id
    const course = await fetchCourseData(courseId)
    if (user.value?.id && course?.user_id !== user.value?.id) {
        return abortNavigation('Forbidden')
    }

    if (!course?.id) {
        return abortNavigation('Not found')
    }
})
