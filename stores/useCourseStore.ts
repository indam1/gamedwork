export const useCourseStore = defineStore('course-store', () => {
    const currentLessonId = ref()
    const currentStepId = ref()

    const currentPath = computed(() => {
        if (!currentLessonId.value || !currentStepId.value) {
            return ''
        }

        return `lesson-${currentLessonId.value}-${currentStepId.value}`
    })

    function changePath(lesson: number, step: number) {
        currentLessonId.value = lesson
        currentStepId.value = step
    }

    return { currentPath, currentLessonId, currentStepId, changePath }
})
