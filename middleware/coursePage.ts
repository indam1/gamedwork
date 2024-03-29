export default defineNuxtRouteMiddleware(() => {
    const { $reset } = useCourseStore();
    $reset();
})
