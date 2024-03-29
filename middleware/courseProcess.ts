export default defineNuxtRouteMiddleware((to) => {
    const { changePath } = useCourseStore();
    changePath(to.params.lesson, to.params.step);
})
